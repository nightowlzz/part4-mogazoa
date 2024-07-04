import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        black: {
          '400': '#2E2E3A',
          '500': '#21212A',
          '600': '#17171C',
        },
        white: '#F1F1F5',
        gray: {
          '500': '#9FA6B2',
          '600': '#6E6E82'
        },
        blue: '#5097FA',
        indigo: '#5363FF',
        yellow: '#FFC83C',
        green: '#05D58B',
        pink: '#FF2F9F',
        red: '#FF0000'
      },
      fontSize: {
        sm: '14px',
        base: '16px',
      },
      screens: {
        m: '375px',
        t: '744px',
        p: '1280px',
      },
    },
  },
  plugins: [],
};
export default config;
