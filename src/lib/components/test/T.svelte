<script>
  export let events = [];
  export let newReleases = [];
</script>

<div id="main" class="clearfix">
  <div class="avada-row">
    <div id="content">
      <div class="post-content flex flex-col md:flex-row">
        <!-- Events Section -->
        <div class="fusion-one-half one_half fusion-layout-column fusion-column spacing-yes">
          <div class="fusion-column-wrapper">
            <div class="fusion-title title">
              <h2 class="title-heading-left">Events/Tournaments</h2>
              <div class="title-sep-container">
                <div class="title-sep sep-single" />
              </div>
            </div>

            {#each events as event}
              <span class="fusion-imageframe imageframe imageframe-dropshadow">
                <img alt={event.alt} src={event.image} class="img-responsive" />
              </span>
              <h2>{event.title}</h2>
              <p>{event.description}</p>
              <div class="fusion-sep-clear" />
              <div
                class="fusion-separator fusion-full-width-sep sep-none"
                style="border-color:#e0dede;margin-top:20px;"
              />
            {/each}
          </div>
        </div>

        <!-- New Releases Section -->
        <div class="fusion-one-half one_half fusion-layout-column fusion-column last spacing-yes">
          <div class="fusion-column-wrapper">
            <div class="fusion-title title">
              <h2 class="title-heading-left">New Released Games</h2>
              <div class="title-sep-container">
                <div class="title-sep sep-single" />
              </div>
            </div>
            <ul class="fusion-checklist">
              {#each newReleases as release, i}
                <li class="fusion-li-item size-small">
                  <span class="icon-wrapper circle-no">
                    <i class="fusion-li-icon fa fa-check" style="color:#ffffff;" />
                  </span>
                  <div class="fusion-li-item-content">
                    <h2>{i + 1}. {release.title}</h2>
                    <img
                      class="aligncenter wp-image size-full"
                      src={release.image}
                      alt={release.alt}
                      width="300"
                      height="150"
                    />
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

  #main {
    background-color: #fff;
    padding: 55px 30px 40px;
  }

  .avada-row {
    margin: 0 auto;
    max-width: 1100px;
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

  .fusion-title .title-sep-container {
    display: table-cell;
    height: 6px;
    position: relative;
    vertical-align: middle;
    width: 100%;
  }

  .fusion-title .title-sep {
    border-bottom: 1px solid #e0dede;
    display: block;
    width: 100%;
  }

  .fusion-column-wrapper {
    margin-bottom: 20px;
  }

  .fusion-imageframe {
    display: inline-block;
    max-width: 100%;
    position: relative;
    z-index: 1;
  }

  .img-responsive {
    width: 100%;
    height: auto;
    box-shadow: rgba(0, 0, 0, 0.3) 2px 3px 7px;
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

  .fusion-column.fusion-one-half {
    float: left;
    margin-bottom: 20px;
    margin-right: 4%;
    position: relative;
    width: 48%;
  }

  .fusion-column.last {
    margin-right: 0;
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
</style>
