module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        svelteOrange: '#FF3E00',
        svelteDark: '#F03A00',
        hotPink: '#FF1966',
        dark: '#111111',
        light: '#FAFAFA',
        'primary-color': 'var(--playntrade-blue)',
        'secondary-color': 'var(--playntrade-dark-blue)',
        'accent-color': 'var(--playntrade-turquoise)'
      },
      fontFamily: {
        display: ['Oswald']
      },
      typography: ({ theme }) => ({
        black: {
          css: {
            '--tw-prose-body': theme('colors.black'),
            '--tw-prose-headings': theme('colors.black'),
            '--tw-prose-bullets': theme('colors.black'),
            '--tw-prose-bold': theme('colors.black'),
            '--tw-prose-counters': theme('colors.black')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')]
};
