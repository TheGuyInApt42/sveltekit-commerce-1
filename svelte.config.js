import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $components: 'src/components',
      $utils: 'src/utils',
      $lib: 'src/lib',
      $store: 'src/store.js',
      $api: 'src/routes/api.js'
    }
  },
  preprocess: [
    preprocess({
      postcss: true
    })
  ]
};

export default config;
