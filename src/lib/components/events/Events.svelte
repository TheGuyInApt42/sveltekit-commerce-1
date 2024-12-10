<script>
  // You can store event data in an array to make it easier to loop through
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

  const callToAction = {
    title: 'Play N Trade Gaming Center',
    description: 'Come on out for the ultimate gaming experience',
    image: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/play.jpg'
  };
</script>

<div class="fusion-one-half one_half fusion-layout-column fusion-column spacing-yes">
  <div class="fusion-column-wrapper">
    <!-- Events Section -->
    <div class="fusion-title title">
      <h2 class="title-heading-left">Events/Tournaments</h2>
      <div class="title-sep-container">
        <div class="title-sep sep-single" />
      </div>
    </div>

    <div class="events">
      {#each events as event}
        <div class="event">
          <span class="fusion-imageframe imageframe imageframe-dropshadow">
            <img alt={event.title} src={event.image} class="img-responsive" />
          </span>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </div>
      {/each}
    </div>

    <!-- Call to Action Section -->
    <div
      class="fusion-separator fusion-full-width-sep sep-none"
      style="border-color:#e0dede; margin-top:20px;"
    />
    <div class="fusion-title title">
      <h2 class="title-heading-left">Come Check Us Out!</h2>
      <div class="title-sep-container">
        <div class="title-sep sep-single" />
      </div>
    </div>

    <div class="call-to-action">
      <span class="fusion-imageframe imageframe imageframe-dropshadow">
        <img alt={callToAction.title} src={callToAction.image} class="img-responsive" />
      </span>
      <h2>{callToAction.title}</h2>
      <p>{callToAction.description}</p>
    </div>
  </div>
</div>

<style>
  .fusion-one-half {
    width: 48%;
    margin-right: 4%;
    margin-bottom: 20px;
  }
  .events {
    display: grid;
    gap: 20px;
  }

  .event {
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 5px;
    background-color: #fff;
  }

  .event img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .call-to-action {
    margin-top: 40px;
    text-align: center;
  }

  .call-to-action img {
    width: 100%;
    height: auto;
    margin: 0 auto;
    border-radius: 5px;
  }
</style>
