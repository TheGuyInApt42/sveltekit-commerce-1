<script>
  // Define the list of new released games as an array
  const newReleasedGames = [
    {
      title: '1. Skyrim HD',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/Skyrim-Box-Art.jpg',
      alt: 'Skyrim Box Art'
    },
    {
      title: '2. Dishonored 2',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/dishonored-2-e3-steam-deal-e1465872288499.jpg',
      alt: 'Dishonored 2 Box Art'
    },
    {
      title: '3. COD Infinite Warfare',
      image:
        'http://camphillplayntrade.com/wp-content/uploads/2016/10/Call-of-Duty-Official-Cover-Art-5_feature.jpg',
      alt: 'Call of Duty Infinite Warfare Cover Art'
    },
    {
      title: '4. Battlefield 1',
      image: 'http://camphillplayntrade.com/wp-content/uploads/2016/10/BF-cover-1200x609.jpg',
      alt: 'Battlefield 1 Cover Art'
    }
  ];
</script>

<div class="fusion-one-half one_half fusion-layout-column fusion-column last spacing-yes">
  <div class="fusion-column-wrapper">
    <div class="fusion-title title">
      <h2 class="title-heading-left">New Released Games</h2>
      <div class="title-sep-container">
        <div class="title-sep sep-single" />
      </div>
    </div>

    <ul class="games-list">
      {#each newReleasedGames as game}
        <li class="fusion-li-item game-item">
          <span class="icon-wrapper circle-no">
            <i class="fusion-li-icon fa fa-check" />
          </span>
          <div class="game-item-content">
            <h2>{game.title}</h2>
            <img src={game.image} alt={game.alt} />
          </div>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .fusion-one-half {
    width: 48%;
    margin-right: 4%;
    margin-bottom: 20px;
  }
  .games-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .game-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .game-item .icon-wrapper {
    display: inline-block;
    width: 40px;
    height: 40px;
    background-color: #007acc;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
  }

  .game-item .icon-wrapper i {
    color: #fff;
  }

  .game-item-content {
    flex: 1;
  }

  .game-item img {
    width: 300px;
    height: 150px;
    border-radius: 5px;
    margin: 10px 0;
  }

  .fusion-title {
    margin-bottom: 20px;
  }

  .fusion-title h2 {
    font-size: 1.5rem;
    margin-bottom: 5px;
  }

  .title-sep {
    height: 2px;
    background-color: #007acc;
    width: 50px;
    margin: 5px 0;
  }
</style>
