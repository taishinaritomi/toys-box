/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        black: '#353D48',
        white: '#ffffff',
      },
    },
    screens: {
      xs: { max: '384px' },
      min_xs: { min: '385px' },
      s: { max: '512px' },
      min_s: { min: '513px' },
      m: { max: '768px' },
      min_m: { min: '769px' },
      l: { max: '1024px' },
    },
  },
};
