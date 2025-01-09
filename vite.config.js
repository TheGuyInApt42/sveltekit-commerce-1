import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => {
  console.log('Building for mode:', mode);
  console.log('VERCEL_GIT_COMMIT_REF:', process.env.VERCEL_GIT_COMMIT_REF);

  return {
    plugins: [sveltekit()],
    define: {
      'process.env.VITE_APP_ENV': `"${mode}"`
    }
  };
});
