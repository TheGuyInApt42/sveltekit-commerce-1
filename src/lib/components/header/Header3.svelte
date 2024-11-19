<header class="header">
  <div class="header-container">
    <!-- Logo -->
    <div class="logo">
      <a href="/">
        <img
          src="http://camphillplayntrade.com/wp-content/uploads/2015/01/ptnlogo.png"
          alt="Play N Trade Logo"
        />
      </a>
    </div>

    <!-- Navigation -->
    <nav class="navigation">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>

        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>

    <!-- Search Icon -->
    <div class="search-icon">
      <a href="/search">
        <span class="icon">🔍</span>
      </a>
    </div>
  </div>
</header>

<style>
  /* General Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }

  .header {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
    padding: 10px 20px;
    position: fixed;
    width: 100%;
    height: 92px;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }

  .logo img {
    height: 50px;
    width: auto;
  }

  .navigation ul {
    display: flex;
    list-style: none;
    gap: 20px;
  }

  .navigation ul li a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .navigation ul li a:hover {
    color: #007bff; /* Add a hover effect with an accent color */
  }

  .search-icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }

  .search-icon .icon {
    color: #333;
    transition: color 0.3s ease;
  }

  .search-icon .icon:hover {
    color: #007bff;
  }

  /* Responsive Design */
  @media screen and (max-width: 768px) {
    .navigation ul {
      display: none; /* Hide navigation menu on small screens */
    }

    .search-icon {
      font-size: 1.2rem;
    }
  }
</style>
