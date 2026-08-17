// scripts/fetch-cover-art.js
// Fetches box art from TheGamesDB for your Shopify product catalog.
//
// Usage:
//   npm install csv-parse csv-stringify
//   THEGAMESDB_API_KEY=your_key_here node scripts/fetch-cover-art.js
//
// Output:
//   PNT_Camp_Hill_images_import.csv  -> re-import into Shopify (Products > Import,
//                                        check "Overwrite products with matching handles")
//   image_lookup_misses.csv          -> titles/platforms that need manual sourcing

import fs from 'fs';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

const THEGAMESDB_API_KEY = process.env.THEGAMESDB_API_KEY;
if (!THEGAMESDB_API_KEY) {
  throw new Error('Set THEGAMESDB_API_KEY env var first');
}

const INPUT_CSV = './PNT_Camp_Hill_shopify_import_FULL.csv';
const OUTPUT_CSV = './PNT_Camp_Hill_images_import.csv';
const MISSES_LOG = './image_lookup_misses.csv';
const CACHE_FILE = './cover-art-cache.json';

// Map your inventory's system codes (from the "Type" column) to TheGamesDB platform IDs.
// Full platform list: https://cdn.thegamesdb.net/json/platforms.json
// Add/adjust codes here to match whatever appears in your actual data.
const PLATFORM_MAP = {
  PS1: 10,
  PS2: 11,
  PS3: 12,
  PS4: 4919,
  PS5: 4980,
  X360: 15,
  XONE: 4920,
  XBX: 14,
  XBOXSERIES: 4980, // no dedicated TGDB platform yet as of writing; adjust if needed
  Wii: 9,
  WiiU: 38,
  NSW: 4971,
  NDS: 8,
  N64: 3,
  NGC: 2,
  NES: 7,
  SNES: 6,
  GBA: 5,
  GBC: 41,
  GEN: 18,
  SAT: 17,
  DCAST: 16,
  PSP: 13,
  PSV: 39
  // Anything not listed here is skipped for platform filtering (still searched by title alone)
};

const REQUEST_DELAY_MS = 1000; // be polite to the free tier — bumped up after hitting 429s
const RATE_LIMIT_BACKOFF_MS = 15000; // wait this long after a 429 before retrying

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function thegamesdbLookup(title, platformId) {
  const searchParams = new URLSearchParams({
    apikey: THEGAMESDB_API_KEY,
    name: title,
    include: 'boxart'
  });
  if (platformId) searchParams.set('filter[platform]', String(platformId));

  let res = await fetch(`https://api.thegamesdb.net/v1/Games/ByGameName?${searchParams}`);

  if (res.status === 429) {
    console.warn(`  Rate limited on "${title}" — backing off ${RATE_LIMIT_BACKOFF_MS / 1000}s...`);
    await sleep(RATE_LIMIT_BACKOFF_MS);
    res = await fetch(`https://api.thegamesdb.net/v1/Games/ByGameName?${searchParams}`);
  }

  if (!res.ok) {
    console.error(`  HTTP ${res.status} for "${title}"`);
    return null;
  }

  const data = await res.json();

  if (data.code && data.code !== 200) {
    console.error(`  API error for "${title}": ${data.status ?? 'unknown'}`);
    return null;
  }

  const game = data.data?.games?.[0];
  if (!game) return null;

  const boxartData = data.include?.boxart;
  if (!boxartData) return null;

  const artForGame = boxartData.data?.[game.id];
  if (!artForGame || artForGame.length === 0) return null;

  // Prefer front cover art; fall back to whatever's first available
  const frontArt = artForGame.find((a) => a.side === 'front') ?? artForGame[0];
  if (!frontArt) return null;

  return `${boxartData.base_url.large}${frontArt.filename}`;
}

function extractBaseTitle(fullTitle) {
  // "007 Agent Under Fire (PS2)" -> "007 Agent Under Fire"
  const match = fullTitle.match(/^(.*)\s\((\w+)\)$/);
  return match ? match[1] : fullTitle;
}

async function main() {
  if (!fs.existsSync(INPUT_CSV)) {
    throw new Error(`Input file not found: ${INPUT_CSV}`);
  }

  const csvText = fs.readFileSync(INPUT_CSV, 'utf-8');
  const rows = parse(csvText, { columns: true });

  console.log(`Loaded ${rows.length} product rows from ${INPUT_CSV}`);

  // Resume from a previous run if a cache file exists
  const cache = new Map();
  if (fs.existsSync(CACHE_FILE)) {
    const savedCache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
    for (const [key, value] of Object.entries(savedCache)) {
      cache.set(key, value);
    }
    console.log(`Resumed from cache: ${cache.size} title/platform combos already looked up`);
  }

  const outputRows = [];
  const misses = [];

  let uniqueLookups = 0;
  let newLookupsThisRun = 0;

  function saveCache() {
    const obj = Object.fromEntries(cache);
    fs.writeFileSync(CACHE_FILE, JSON.stringify(obj, null, 2));
  }

  for (const row of rows) {
    const handle = row['Handle'];
    const fullTitle = row['Title'];
    const platformCode = row['Type'];

    if (!handle || !fullTitle) continue;

    const baseTitle = extractBaseTitle(fullTitle);
    const cacheKey = `${baseTitle}::${platformCode}`;

    if (!cache.has(cacheKey)) {
      const platformId = PLATFORM_MAP[platformCode];

      let imageUrl = null;
      try {
        imageUrl = await thegamesdbLookup(baseTitle, platformId);
      } catch (err) {
        console.error(`Lookup failed for "${baseTitle}" (${platformCode}):`, err.message);
      }

      cache.set(cacheKey, imageUrl);
      uniqueLookups++;
      newLookupsThisRun++;

      if (newLookupsThisRun % 25 === 0) {
        console.log(
          `Looked up ${uniqueLookups} unique title/platform combos (${newLookupsThisRun} new this run)...`
        );
        saveCache(); // checkpoint periodically in case the run is interrupted
      }

      await sleep(REQUEST_DELAY_MS);
    } else {
      uniqueLookups++;
    }

    const imageUrl = cache.get(cacheKey);

    if (imageUrl) {
      outputRows.push({ Handle: handle, Title: fullTitle, 'Image Src': imageUrl });
    } else {
      misses.push({ Handle: handle, Title: fullTitle, Type: platformCode });
    }
  }

  saveCache();
  fs.writeFileSync(OUTPUT_CSV, stringify(outputRows, { header: true }));
  fs.writeFileSync(MISSES_LOG, stringify(misses, { header: true }));

  console.log(`\nDone.`);
  console.log(
    `Total unique title/platform combos: ${uniqueLookups} (${newLookupsThisRun} new this run)`
  );
  console.log(`Matched: ${outputRows.length} product rows -> ${OUTPUT_CSV}`);
  console.log(`Missed:  ${misses.length} product rows -> ${MISSES_LOG}`);
  console.log(`\nNext step: Shopify admin -> Products -> Import -> upload ${OUTPUT_CSV}`);
  console.log(`Check "Overwrite products with matching handles" so only the image gets added.`);
}

// Save progress immediately if interrupted (Ctrl+C), so no work is lost
process.on('SIGINT', () => {
  console.log(
    '\n\nInterrupted — progress has been checkpointed to cache file. Re-run the script to resume.'
  );
  process.exit(0);
});

main().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
