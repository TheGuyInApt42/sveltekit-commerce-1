<script>
  // Props for customization
  export let events = [
    {
      title: '',
      date: '',
      description: '',
      image: ''
    }
  ];

  export let newReleases = [
    {
      title: '',
      image: '',
      rank: 1
    }
  ];

  // Default styles that can be customized via props
  export let styles = {
    mainBackground: '#ffffff',
    textColor: '#747474',
    headerColor: '#333333',
    maxWidth: '1100px',
    fontFamily: "'PT Sans', Arial, Helvetica, sans-serif",
    titleFontFamily: "'Antic Slab', Arial, Helvetica, sans-serif"
  };
</script>

<div
  class="main"
  style:background-color={styles.mainBackground}
  style:color={styles.textColor}
  style:font-family={styles.fontFamily}
>
  <div class="avada-row">
    <div class="content">
      <div class="post-content">
        <!-- Events Section -->
        <div class="column">
          <div class="section-title">
            <h2 style:font-family={styles.titleFontFamily}>Events/Tournaments</h2>
            <div class="title-sep" />
          </div>

          {#each events as event}
            <div class="event-card">
              <img src={event.image} alt={event.title} class="shadow-image" />
              <h2 style:font-family={styles.titleFontFamily}>{event.title}</h2>
              <p>{event.description}</p>
              <div class="separator" />
            </div>
          {/each}
        </div>

        <!-- New Releases Section -->
        <div class="column">
          <div class="section-title">
            <h2 style:font-family={styles.titleFontFamily}>New Released Games</h2>
            <div class="title-sep" />
          </div>

          <ul class="game-list">
            {#each newReleases as game}
              <li class="game-item">
                <span class="check-icon">✓</span>
                <div class="game-content">
                  <h2 style:font-family={styles.titleFontFamily}>
                    {game.rank}. {game.title}
                  </h2>
                  <img src={game.image} alt={game.title} class="game-image" />
                </div>
              </li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .main {
    padding: 55px 30px 40px;
  }

  .avada-row {
    margin: 0 auto;
    max-width: var(--max-width, 1100px);
  }

  .content {
    width: 100%;
  }

  .post-content {
    display: flex;
    flex-wrap: wrap;
    gap: 4%;
  }

  .column {
    flex: 0 0 48%;
    margin-bottom: 20px;
  }

  .section-title {
    display: flex;
    align-items: center;
    margin-bottom: 31px;
    gap: 8px;
  }

  .title-sep {
    flex: 1;
    height: 1px;
    background-color: #e0dede;
    margin-top: 3px;
  }

  .shadow-image {
    box-shadow: 2px 3px 7px rgba(0, 0, 0, 0.3);
    max-width: 100%;
    height: auto;
    margin-bottom: 20px;
  }

  .separator {
    height: 1px;
    background-color: #e0dede;
    margin: 20px 0;
    width: 100%;
  }

  .game-list {
    list-style: none;
    padding: 0;
    margin: 10px 0 0;
  }

  .game-item {
    display: flex;
    align-items: flex-start;
    gap: 9px;
    margin-bottom: 11px;
  }

  .check-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 21px;
    height: 21px;
    color: #ffffff;
  }

  .game-image {
    width: 300px;
    height: 150px;
    object-fit: cover;
    margin: 10px 0;
  }

  /* Responsive styles */
  @media (max-width: 800px) {
    .column {
      flex: 0 0 100%;
    }
  }

  @media (max-width: 640px) {
    .main {
      padding: 30px 15px;
    }
  }
</style>
