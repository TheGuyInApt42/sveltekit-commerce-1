<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import HeroCarousel from '$lib/components/hero/HeroCarousel.svelte';
  import { getFeaturedProducts } from '$lib/functions/products.remote.js';
  import { getProducts } from '$lib/functions/products.remote.js';

  const metaData = {
    title: `PlayNTrade | Home`,
    description:
      'Camp Hill Play N Trade is a local retro video game store in Camp Hill, PA where you can buy and trade physical video games and accessories',
    keywords: [
      'playntrade',
      'video games',
      'physical video games',
      'retro games',
      'trade in video games',
      'camp hill video games'
    ]
  };

  //const featured = await getFeaturedProducts();
  const products = await getProducts();

  const systems = [
    'PS2',
    'X360',
    'PS1',
    'PS3',
    'XONE',
    'XBX',
    'Wii',
    'PS4',
    'NDS',
    'NES',
    'GEN',
    'NSW'
  ];
</script>

<HeadTags {metaData} />

<HeroCarousel {products} />

<section class="systems">
  <h2>Shop by System</h2>
  <div class="systems-grid">
    {#each systems as system}
      <a href={`/shop?type=${system}`} class="system-pill">{system}</a>
    {/each}
  </div>
</section>

<section class="new-arrivals">
  <h2>New Arrivals</h2>
  <div class="arrivals-grid">
    {#each products as product (product.id)}
      <a href={`/products/${product.handle}`} class="product-card">
        <img src={product.featuredImage?.url} alt={product.title} />
        <h3>{product.title}</h3>
        <p>${product.variants.edges[0]?.node.price.amount}</p>
      </a>
    {/each}
  </div>
</section>

<section class="about prose prose-black mx-auto max-w-3xl px-4 py-16 lg:prose-xl">
  <h2 class="text-center text-2xl sm:text-3xl">Welcome to Our Retro Gaming Paradise!</h2>
  <p>
    At <strong>Camp Hill Play N Trade</strong>, we're your local source for retro and modern video
    games, consoles, and accessories — every item in our store is real, in-stock inventory,
    browsable right here.
  </p>
</section>

<div class="divider pb-8 before:bg-black after:bg-black">
  <h4 class="text-bold text-2xl text-black">Come Check Us Out!</h4>
</div>

<style>
  .systems {
    padding: 3rem 1rem;
    text-align: center;
  }
  .systems-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    justify-content: center;
    margin-top: 1.5rem;
  }
  .system-pill {
    padding: 0.5rem 1.25rem;
    border-radius: 999px;
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
    font-weight: 600;
    text-decoration: none;
    transition: transform 0.15s ease;
  }
  .system-pill:hover {
    transform: scale(1.05);
  }

  .new-arrivals {
    padding: 2rem 1rem 4rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  .new-arrivals h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
  .arrivals-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  .product-card {
    display: block;
    text-decoration: none;
    color: inherit;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;
    overflow: hidden;
    transition: box-shadow 0.15s ease;
  }
  .product-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  .product-card img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
  .product-card h3 {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem 0.25rem;
    margin: 0;
  }
  .product-card p {
    padding: 0 0.75rem 0.75rem;
    margin: 0;
    font-weight: 600;
  }
</style>
