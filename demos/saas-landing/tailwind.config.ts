import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0 24px 60px -28px rgba(15, 23, 42, 0.45)',
      },
    },
  },
  plugins: [],
}

export default config
