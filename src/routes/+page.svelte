<script>
  import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
  import HeroCarousel from '$lib/components/hero/HeroCarousel.svelte';

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

<section class="hero">
  <div class="hero-content">
    <img src="/images/logos/ptnlogo.png" alt="Play N Trade" class="hero-logo" />
    <h1>Camp Hill's Home for Retro & Modern Video Games</h1>
    <p>Real, in-stock inventory — browse it all right here.</p>
    <a href="/shop" class="hero-cta">Shop by System</a>
  </div>
</section>

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
    {#each products.slice(0, 8) as product (product.id)}
      <a href={`/products/${product.handle}`} class="product-card">
        {#if product.featuredImage?.url}
          <img src={product.featuredImage.url} alt={product.title} />
        {:else}
          <div class="card-placeholder">
            <img src="/images/logos/ptnlogo.png" alt="" />
          </div>
        {/if}
        <h3>{product.title}</h3>
        <p>${product.variants.edges[0]?.node.price.amount}</p>
      </a>
    {/each}
  </div>
  <div class="view-all">
    <a href="/shop" class="view-all-btn">View All New Arrivals</a>
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
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
  .card-placeholder {
    width: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: repeating-linear-gradient(45deg, #f5f5f5, #f5f5f5 10px, #efefef 10px, #efefef 20px);
  }
  .card-placeholder img {
    width: 40%;
    opacity: 0.4;
  }
  .view-all {
    text-align: center;
    margin-top: 2.5rem;
  }
  .view-all-btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    border: 2px solid var(--playntrade-blue, #1e3a8a);
    color: var(--playntrade-blue, #1e3a8a);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    transition: all 0.15s ease;
  }
  .view-all-btn:hover {
    background: var(--playntrade-blue, #1e3a8a);
    color: white;
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

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    padding-bottom: 2rem;
  }
  .divider::before,
  .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: black;
  }
  .divider span {
    padding: 0 1rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: black;
  }

  .hero {
    background: linear-gradient(135deg, var(--playntrade-blue, #1e3a8a), #0f1f47);
    padding: 5rem 1.5rem;
    text-align: center;
    color: white;
  }
  .hero-content {
    max-width: 640px;
    margin: 0 auto;
  }
  .hero-logo {
    height: 60px;
    width: auto;
    margin-bottom: 1.5rem;
    filter: brightness(0) invert(1); /* renders logo white on the dark background */
  }
  .hero h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    line-height: 1.2;
  }
  .hero p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 2rem;
  }
  .hero-cta {
    display: inline-block;
    padding: 0.9rem 2rem;
    background: white;
    color: var(--playntrade-blue, #1e3a8a);
    border-radius: 0.5rem;
    text-decoration: none;
    font-weight: 700;
    transition: transform 0.15s ease;
  }
  .hero-cta:hover {
    transform: scale(1.03);
  }

  @media (min-width: 768px) {
    .hero h1 {
      font-size: 2.75rem;
    }
  }
</style>
