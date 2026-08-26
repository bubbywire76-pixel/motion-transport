import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6f4',
          100: '#e0ecea',n          200: '#c1d9d5',
          300: '#a1c6bf',
          400: '#82b3aa',
          500: '#1B4D3E',
          600: '#163d30',
          700: '#112d24',
          800: '#0c1d18',
          900: '#070d0a',
        },
        accent: {
          50: '#fef9f0',
          100: '#fdf3e0',
          200: '#fbe7c1',
          300: '#f9dba3',
          400: '#f7cf84',
          500: '#D4AF37',
          600: '#a88f2b',
          700: '#7c691f',
          800: '#504513',
          900: '#241f07',
        },
        background: '#F5F1E8',
        text: '#2C2C2C',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
