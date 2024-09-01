/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    screens: {
      '2xs': { 'max': '340px' },
      'xs': { 'max': '480px' },
      'sm': { 'max': '576px' },
      'md': { 'max': '768px' },
      'md-lg': { 'max': '991px' },
      'lg': { 'max': '1080px' },
      'xl': { 'max': '1200px' },
      '2xl': { 'max': '1440px' },
      '3xl': { 'max': '1920px' },
    },
  },
  plugins: [],
};
