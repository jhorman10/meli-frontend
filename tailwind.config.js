/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff9e6',
          100: '#fff0c2',
          200: '#ffe699',
          300: '#ffd970',
          400: '#ffcc47',
          500: '#ffbf1e',
          600: '#d4af37',
          700: '#b8941f',
          800: '#9a7a19',
          900: '#7c6013',
        }
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}