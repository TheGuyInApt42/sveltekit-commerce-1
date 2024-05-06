<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import Icons from '../icons/Icons.svelte';
	import { cartQuantity } from '../../../store';
	import SearchBar from '../searchbar/SearchBar.svelte';
	import { createEventDispatcher } from 'svelte'

	let menu;
	let mobile = false;
    let logo = "http://camphillplayntrade.com/wp-content/uploads/2015/01/ptnlogo.png";

	let linkStyles = 'text-[#0F7511] font-extrabold opacity-70 hover:opacity-100 duration-300'

	const dispatch = createEventDispatcher();

  	$: currentRoute = $page.url.pathname;

	let showMenu = false;

  let tabs = [
    { name: 'Home', path: '/search' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];
  function openCart() {
    showMenu = false;
    dispatch('openCart', true);
  }


	onMount(async() =>{
		menu = document.querySelector('#menu')
		const mobileDevice = window.matchMedia('(max-width: 768px)');
		mobileDevice.addEventListener('change', handleDeviceChange);
		function handleDeviceChange(e) {
			if (e.matches) mobile = true;
			else mobile = false;
		}
		// Run it initially
		handleDeviceChange(mobileDevice);

	})



	function toggleMenu(){
		if (mobile){
			menu.classList.toggle('hidden')
			menu.classList.toggle('w-full')
			menu.classList.toggle('h-screen')
		}
	}

</script>


	<header class="w-full h-[90px] drop-shadow-lg bg-black">
		<div class="container lg:px-4 md:px-0 h-full mx-auto flex justify-between items-center px-4">
			<!-- Logo Here -->
			<a class="text-xl font-bold italic md:z-0 z-50" href="/">
				<img src={logo} alt=""></a>

			<nav data-sveltekit-prefetch>
				

				<!-- Menu links here -->
				<ul id="menu" class="hidden fixed top-0 right-0 px-10 py-16 bg-gray-800 z-40
					md:relative md:flex md:p-0 md:bg-transparent md:flex-row md:space-x-6">

					<li class="md:hidden z-90 fixed top-4 right-6">
						<a href="#" class="text-right text-4xl togglebutton-close"
							on:click={toggleMenu}>&times;</a>
					</li>

					<li class:active={$page.url.pathname === '/'}>
						<a class="nav-link" data-sveltekit-prefetch href="/" on:click={toggleMenu}>Home</a>
					</li>
					<li class:active={$page.url.pathname === '/about'}>
						<a class="nav-link" data-sveltekit-prefetch href="/about" on:click={toggleMenu}>About</a>
					</li>

					<!-- <li class:active={$page.url.pathname === '/gallery'}>
						<a class={linkStyles} href="/gallery" on:click={toggleMenu}>Gallery</a>
					</li> -->
					<li class:active={$page.url.pathname === '/contact'}>
						<a class="nav-link" data-sveltekit-prefetch href="/contact" on:click={toggleMenu}>Contact</a>
					</li>
				</ul>
			

			</nav>

			<!-- This is used to open the menu on mobile devices -->
			<div class="flex items-center md:hidden">
				<button class="text-4xl font-bold opacity-70 hover:opacity-100 duration-300 fixed right-6 togglebutton-open"
					on:click={toggleMenu}>
					&#9776;
				</button>
			</div>

			

	</header>


<style>
    .nav-link{
        display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--playntrade-dark-blue);
		font-weight: 700;
	
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
    }

	a:hover {
		color: var(--playntrade-turquoise);
		
	}

	
	@media screen and (min-width: 768px){
	li {
		position: relative;
		height: 100%;
	}
	}
	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: -25%;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--playntrade-turquoise);
	}

	@media screen and (max-width: 768px){
        .togglebutton-close, .togglebutton-open{
            color: var(--playntrade-blue);
        }
		#menu{
			padding-top: 8rem;
			
		}

		#menu li{
			font-size: 24px;
			color: white;
		}

        .nav-link{
        display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--playntrade-dark-blue);
		font-weight: 700;
	
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
    }

	
	}
</style>
