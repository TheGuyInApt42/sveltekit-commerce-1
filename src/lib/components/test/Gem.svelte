<script>
  export let events = [
    {
      imageUrl: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/image.img_.jpg',
      title: 'Madden 17 OCT 30- 6:00pm',
      description:
        '5$ for members, and 10$ for nonmembers to sign up now! It will be 5$ more at the door.'
    }
    // ... more events
  ];

  export let newReleases = [
    {
      imageUrl: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/Skyrim-Box-Art.jpg',
      title: '1. Skyrim HD'
    }
    // ... more new releases
  ];

  export let featuredSection = {
    imageUrl: 'http://camphillplayntrade.com/wp-content/uploads/2015/01/play.jpg',
    title: 'Play N Trade Gaming Center',
    description: 'Come on out for the ultimate gaming experience'
  };
</script>

<div id="main" class="clearfix">
  <div class="avada-row">
    <div id="content" style="width:100%">
      <div class="post-content flex flex-col md:flex-row">
        <div class="fusion-one-half one_half fusion-layout-column fusion-column spacing-yes">
          <div class="fusion-column-wrapper">
            <div class="fusion-title title">
              <h2 class="title-heading-left">Events/Tournaments</h2>
              <div class="title-sep-container">
                <div class="title-sep sep-single" />
              </div>
            </div>

            {#each events as event}
              <div class="imageframe-container">
                <img alt="" src={event.imageUrl} class="img-responsive" />
              </div>
              <h2>{event.title}</h2>
              {#if event.description}
                <p>{event.description}</p>
              {/if}
              <div class="fusion-sep-clear" />
              <div
                class="fusion-separator fusion-full-width-sep sep-none"
                style="border-color:#e0dede;margin-top:20px;"
              />
            {/each}

            <div class="fusion-title title">
              <h2 class="title-heading-left">
                {featuredSection.title}
              </h2>
              <div class="title-sep-container">
                <div class="title-sep sep-single" />
              </div>
            </div>
            <div class="imageframe-container">
              <img alt="" src={featuredSection.imageUrl} class="img-responsive" />
            </div>
            {#if featuredSection.description}
              <p>{featuredSection.description}</p>
            {/if}
          </div>
        </div>
        <div class="fusion-one-half one_half fusion-layout-column fusion-column last spacing-yes">
          <div class="fusion-column-wrapper">
            <div class="fusion-title title">
              <h2 class="title-heading-left">New Released Games</h2>
              <div class="title-sep-container">
                <div class="title-sep sep-single" />
              </div>
            </div>
            <ul class="fusion-checklist">
              {#each newReleases as release}
                <li class="fusion-li-item size-small">
                  <span class="icon-wrapper circle-no">
                    <i class="fusion-li-icon fa fa-check" style="color:#ffffff;" />
                  </span>
                  <div class="fusion-li-item-content">
                    <h2>{release.title}</h2>
                    {#if release.imageUrl}
                      <p>
                        <img
                          class="aligncenter wp-image-1767 size-full"
                          src={release.imageUrl}
                          alt=""
                          width="300"
                          height="150"
                        />
                      </p>
                    {/if}
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </div>
        <div class="fusion-clearfix" />
      </div>
    </div>
  </div>
</div>

<style>
  .clearfix::before {
    content: '';
    display: table;
  }

  .clearfix {
    zoom: 1;
  }

  * {
    box-sizing: border-box;
  }

  .fusion-clearfix {
    zoom: 1;
    clear: both;
  }

  .fusion-clearfix::after,
  .fusion-clearfix::before {
    content: ' ';
    display: table;
  }

  #main,
  .fusion-clearfix::after {
    clear: both;
  }

  .inherited-styles-for-exported-element {
    color: #747474;
    font-family: 'PT Sans', Arial, Helvetica, sans-serif;
    font-size: 13px;
    font-size-adjust: none;
    font-weight: 400;
    line-height: 20px;
  }

  img {
    border-style: none;
    height: auto;
    max-width: 100%;
    vertical-align: top;
  }

  a,
  a:hover {
    text-decoration: none;
  }

  #content::after,
  .clearfix::after {
    clear: both;
    content: '';
    display: table;
  }

  .avada-row {
    margin: 0 auto;
  }

  .avada-row::after {
    clear: both;
    content: '';
    display: block;
  }

  #main h2 {
    font-kerning: auto;
    font-optical-sizing: auto;
    font-size-adjust: none;
    font-variant: normal;
    font-variant-emoji: normal;
    font-weight: 400;
  }

  .post-content p,
  h2 {
    margin: 0 0 20px;
  }

  .post-content .title h2,
  .title h2 {
    float: left;
    margin: 0;
    padding-bottom: 0;
    padding-left: 0;
    padding-top: 0;
  }

  #content {
    float: left;
    min-height: 1px;
  }

  .aligncenter {
    clear: both;
    display: block;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .fusion-checklist {
    list-style: none;
    margin: 10px 0 0;
    padding: 0;
  }

  .fusion-checklist .fusion-li-item {
    margin-bottom: 11px;
  }

  .fusion-checklist .icon-wrapper {
    display: table;
  }

  .fusion-checklist .fusion-li-icon {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
  }

  .fusion-checklist .size-small {
    font-size: 13px;
    line-height: 21px;
  }

  .fusion-checklist .size-small .icon-wrapper {
    float: left;
    height: 21px;
    margin-right: 9px;
    width: 21px;
  }

  .fusion-checklist .size-small .fusion-li-item-content {
    display: block;
    margin-left: 30px;
  }

  .fusion-column.last {
    margin-right: 0;
  }

  .fusion-column.fusion-one-half {
    float: left;
    margin-bottom: 20px;
    margin-right: 4%;
    position: relative;
    width: 48%;
  }

  .fusion-imageframe {
    display: inline-block;
    max-width: 100%;
    position: relative;
    z-index: 1;
  }

  .fusion-sep-clear {
    clear: both;
    display: block;
    font-size: 0;
    height: 1px;
    line-height: 0;
    overflow: hidden;
    width: 100%;
  }

  .fusion-separator {
    border: 0 solid #e7e6e6;
    clear: both;
    margin: 0 auto;
    position: relative;
    z-index: 11;
  }

  .fusion-separator.sep-none {
    height: 1px;
  }

  .fusion-title {
    display: table;
    margin: 0 0 31px;
    overflow: hidden;
  }

  .fusion-title h2 {
    display: table-cell;
    white-space-collapse: preserve;
    text-wrap-mode: nowrap;
  }

  .fusion-title h2.title-heading-left {
    padding-right: 8px;
  }

  .fusion-title .title-sep-container {
    display: table-cell;
    height: 6px;
    position: relative;
    vertical-align: middle;
    width: 100%;
  }

  .fusion-title .title-sep {
    border-left-width: 0;
    border-right-width: 0;
    border-style: solid;
    border-top-width: 0;
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
  }

  .fusion-title .title-sep.sep-single {
    border-bottom-width: 1px;
  }

  .fa {
    font-family: FontAwesome;
    font-kerning: auto;
    font-optical-sizing: auto;
    font-size-adjust: none;
    font-variant: normal;
    font-variant-emoji: normal;
    font-weight: 400;
    line-height: 1;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    font-size: inherit;
  }

  .fa-check::before {
    content: '';
  }

  @media only screen and (max-width: 800px) {
    .fusion-column.spacing-yes {
      width: 100%;
    }

    .title {
      margin-bottom: 20px !important;
      margin-top: 0 !important;
    }
  }

  @media screen and (max-width: 767px) {
    #content {
      margin-left: 0 !important;
      width: 100% !important;
    }
  }

  @media only screen and (min-device-width: 320px) and (max-device-width: 640px) {
    .title {
      margin-bottom: 20px !important;
      margin-top: 0 !important;
    }

    #content {
      float: none !important;
      margin-bottom: 50px;
      margin-left: 0 !important;
      width: 100% !important;
    }
  }

  @media only screen and (max-width: 640px) {
    #main {
      background-attachment: scroll !important;
    }

    #content {
      margin-left: 0 !important;
      width: 100% !important;
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1366px) and (orientation: portrait) {
    #main {
      background-attachment: scroll !important;
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
    #main {
      background-attachment: scroll !important;
    }
  }

  @media only screen and (min-device-width: 768px) and (max-device-width: 1366px) and (orientation: portrait) {
    .fusion-column:nth-child(2n),
    .fusion-column:nth-child(3n),
    .fusion-column:nth-child(4n),
    .fusion-column:nth-child(5n) {
      margin-right: 0;
    }

    .title {
      margin-bottom: 20px !important;
      margin-top: 0 !important;
    }

    .fusion-column.fusion-one-half {
      float: left;
      margin-bottom: 20px;
      margin-right: 4%;
      position: relative;
      width: 48%;
    }

    #content {
      margin-left: 0 !important;
    }
  }

  #main {
    background-color: #fff;
    padding-left: 30px;
    padding-right: 30px;
  }

  a:hover {
    color: #1a80b6;
  }

  .fusion-title .title-sep {
    border-color: #e0dede;
  }

  #main h2,
  .post-content h2 {
    font-family: 'Antic Slab', Arial, Helvetica, sans-serif;
  }

  #main .avada-row {
    max-width: 1100px;
  }

  .post-content h2 {
    font-size: 18px;
  }

  #main .post-content .fusion-title h2,
  #main .post-content .title h2,
  .fusion-title h2,
  .title h2 {
    font-size: 18px;
    line-height: 27px;
  }

  .post-content h2 {
    color: #333;
    line-height: 27px;
  }

  .fusion-title h2,
  .title h2,
  body a,
  body a::after,
  body a::before {
    color: #333;
  }

  #content {
    width: 71%;
  }

  #main {
    padding-bottom: 40px;
    padding-top: 55px;
  }

  .imageframe-1.imageframe-dropshadow img,
  .imageframe-2.imageframe-dropshadow img,
  .imageframe-3.imageframe-dropshadow img,
  .imageframe-4.imageframe-dropshadow img,
  .imageframe-5.imageframe-dropshadow img {
    box-shadow: rgba(0, 0, 0, 0.3) 2px 3px 7px;
  }
  .imageframe-container {
    /* New class for image containers */
    margin-bottom: 20px;
  }
  .imageframe-container img {
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.3); /* Apply the shadow here */
  }
</style>
