<script>
  import Slider from '$lib/components/slider/Slider.svelte';
  import TwoCol from '$lib/components/test/TwoCol.svelte';
  import T from '$lib/components/test/T.svelte';
  import Gem from '$lib/components/test/Gem.svelte';
  import Embla2 from '$lib/components/slider/Embla2.svelte';

  const events = [
    {
      title: 'Madden 17 OCT 30- 6:00pm',
      description:
        '5$ for members, and 10$ for nonmembers to sign up now! It will be 5$ more at the door.',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/image.img_.jpg'
    },
    {
      title: 'Halloween Challenge Oct 31st at 6pm',
      description: 'See Store for additional information.',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2015/01/filmriot-0232-halloween-callenge-large.thumb_-1024x576.jpg'
    },
    {
      title: 'Extra Life – Nov 5th',
      description: 'Please see store for more details',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2015/01/extra-life-banner-1074x483-1024x461.png'
    },
    {
      title: 'Holiday Lock In – Nov 19th',
      description: 'Please see store for more details',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/lockin_subpageheader2.jpg'
    }
  ];

  // New Releases array with extracted image sources
  const newReleases = [
    {
      title: 'Skyrim HD',
      rank: 1,
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/Skyrim-Box-Art.jpg'
    },
    {
      title: 'Dishonored 2',
      rank: 2,
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/dishonored-2-e3-steam-deal-e1465872288499.jpg'
    },
    {
      title: 'COD Infinite Warfare',
      rank: 3,
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/Call-of-Duty-Official-Cover-Art-5_feature.jpg'
    },
    {
      title: 'Battlefield 1',
      rank: 4,
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/BF-cover-1200x609.jpg'
    }
  ];

  // Store Info object with extracted image source
  const storeInfo = {
    title: 'Come Check Us Out!',
    subtitle: 'Play N Trade Gaming Center',
    description: 'Come on out for the ultimate gaming experience',
    image: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/play.jpg'
  };
</script>

<Embla2 />

<TwoCol {events} {newReleases} />

<!-- Store Info Section -->
<div class="section-title">
  <h2>{storeInfo.title}</h2>
  <div class="title-sep" />
</div>

<img src={storeInfo.image} alt={storeInfo.subtitle} class="shadow-image" />
<h2>{storeInfo.subtitle}</h2>
<p>{storeInfo.description}</p>

<style>
  .slide-content {
    padding: 2rem;
    background: #f5f5f5;
    text-align: center;
  }
</style>
