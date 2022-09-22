/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '0px',
        md: '720px',
        lg: '1366px',
        xl: '1920px',
        '2xl': '2350px',
      },
    },
  },
}
