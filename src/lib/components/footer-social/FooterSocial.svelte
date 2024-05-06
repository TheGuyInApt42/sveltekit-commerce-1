<script>
	
	import ExternalLink from '../../components/external-link/ExternalLink.svelte'
	export let address = '';
	export let hours = '';
</script>

<div class="flex flex-col">
    <div class="flex flex-col md:flex-row pt-6 md:pt-0 gap-4 md:gap-0">
	<div id="hours" class="flex-1">
		<h3 class="font-bold pb-4">Hours</h3>
		<slot>{@html hours}</slot>
	</div>

	<div id="social">
		<h3 class="font-bold pb-4">Connect With Us</h3>
		<div id="footer-social-icons">
			<ExternalLink
				href={'https://www.facebook.com/CampHillPlayNTrade/'}
				cssClasses={'mr-1'}
				ariaLabel={'Facebook link'}
			>
				<span class="facebook-icon"></span>
			</ExternalLink>

			<ExternalLink
				href={'https://www.instagram.com/explore/locations/81968605/camp-hill-play-n-trade/'}
				ariaLabel={'Instagram link'}
			>
				<span class="instagram-icon"></span>
			</ExternalLink>
		

			<!-- <a href="https://twitter.com/pntcamphill?lang=en" class="mr-1" target="_blank">
            <span class="twitter-icon mb-1"></span>
        </a>  -->

			<!-- <a href="https://www.youtube.com/GameStopVideo" class="mr-1" target="_blank">
				<span class="youtube-icon mb-1"></span>
			</a> -->
		</div>
	</div>

	<div id="address" class="flex-1">
		<h3 class="font-bold pb-4">Visit Us</h3>
		<slot>{@html address}</slot>
	</div>
</div>

<div class="flex flex-col w-full">
  <div class="divider"></div> 
  
</div>

<div class="flex flex-col pb-2 md:pb-0">
    <p>Play N Trade @2024</p>
    <p>Made By Gorham Web Consulting</p>
	<p>Icons by <ExternalLink href={'https://icons8.com/'}>Icon8</ExternalLink></p>
</div>
</div>


<style>
    h3{
            font-family: 'Oswald', sans-serif;
        font-size: 1.5em;
		color: var(--playntrade-dark-blue);
    }

    p{
            font-family: 'Oswald', sans-serif;
			color: var(--playntrade-dark-blue);

    }


	.facebook-icon {
		vertical-align: middle;
		width: 48px;
		height: 48px;
		background: url('/images/facebook48.png');
		display: inline-table;
	}

	/*
	.twitter-icon {
        vertical-align: middle;
        width: 40px;
        height: 40px;
        background: url('twitterwhite.png');
        display: inline-table;
    }

	 .youtube-icon {
		vertical-align: middle;
		width: 40px;
		height: 40px;
		background: url('youtube.png');
		display: inline-block;
	} */

	.instagram-icon {
		vertical-align: middle;
		width: 48px;
		height: 48px;
		background: url('/images/instagram48.png');
		display: inline-block;
	}

	div {
		text-align: center;
	}
</style>
