<script>
	// Components
	import HeadTags from '$lib/components/head-tags/HeadTags.svelte';
	
	import ContactForm from './components/ContactForm.svelte';
	export let form

  

	$: console.log(form);
	// Start: Local component properties
	const metaData = {
		title: `PlayNTrade | Contact`,
		description:
			'Contact page of Play N Trade where you can send Play N Trade a message',
		keywords: ['contact playntrade', 'message playntrade', 'get in touch with playntrade', 'playntrade location'],
	};
</script>

<!-- Start: Header Tag -->
<HeadTags metaData="{metaData}" />
<!-- End: Header Tag -->


<div class="content prose-xl justify-center items-center">
<h1 class="mb-0">Contact Us</h1>

<!-- <h2>We are conveniently located</h2>

<section class="grid items-center justify-center">
	<div id="google-map">
	<iframe title="Google Map Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d640.2879115906536!2d-76.98259479086492!3d40.23708809595678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c8c30009434341%3A0x3283d8063ac63d4a!2sCamp%20Hill%20Play%20N%20Trade!5e0!3m2!1sen!2sus!4v1708380677137!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</div>
</section> -->



{#if form?.success}
<div class="submit-success text-4xl font-bold text-center" data-submit=""><p class="text-black">Message sent!🎉</p></div>
{:else}
	<ContactForm />
{/if}


</div>



<style>

	.content {
		width: 100%;

		
		margin-top: var(--column-margin-top);
		margin-bottom: var(--column-margin-bottom);
	}


  

	 #google-map{
		padding-bottom: 25%;
     	position: relative;
	} 

	#google-map iframe {
     height: 100%;
     width: 100%;
     left: 0;
     top: 0;
     position: absolute;
} 








    @media (max-width: 768px){
        h2{
            padding: 0 5%;
        }
    }
</style>