import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  return {
    plugins: [sveltekit()],
    define: {
      'process.env.VITE_APP_ENV': `"${mode}"`
    }
  };
});
