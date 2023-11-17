import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        mainColor: '#007FFF',
        goldColor: '#FFAA00',
        skyBlue: '#0099FF',
        blue: '#0055FF',
        deepBlue: '#0060CC'
      },
      fontFamily: {
        'title': ['"IBM Plex Sans"','-apple-system','BlinkMacSystemFont','"Segoe UI"','Roboto','"Helvetica Neue"','Arial','sans-serif','"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"' ],
        'body': ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
