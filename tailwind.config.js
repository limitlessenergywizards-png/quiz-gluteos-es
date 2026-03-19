/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#6B21A8',
          purpleLight: '#EDE9FE',
          purpleDark: '#1E1B2E',
          violet: '#7C3AED',
          lavender: '#A78BFA',
        },
        quiz: {
          phase1: '#FFFFFF',     // Inclusão - fundo branco
          phase2: '#FAF5FF',     // Dor - lavanda muito claro
          phase3: '#F5F3FF',     // Amplificação
          phase4: '#EDE9FE',     // Consequências
          phase5: '#DDD6FE',     // Pico emocional
          phase6: '#C4B5FD',     // Micro-yeses
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
