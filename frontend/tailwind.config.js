/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FCF9',
          500: '#0ea5a0',
          600: '#0b8b86',
          900: '#042f2d'
        },
        accent: {
          50: '#fff7ed',
          500: '#f59e0b',
          600: '#d97706'
        },
        background: '#F5F1E8',
        text: '#2C2C2C'
      }
    },
  },
  plugins: [],
}
