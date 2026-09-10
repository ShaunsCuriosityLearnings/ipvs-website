/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        eventik: {
          blue: '#1E65FF',
          darkblue: '#0D47A1',
          accent: '#00D2FF',
          navy: '#0A192F',
          darknavy: '#030A1A',
          card: '#FFFFFF',
          lightbg: '#F4F7FE',
          slate: '#64748B',
        },
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fc',
          400: '#36abfa',
          500: '#1E65FF',
          600: '#0D47A1',
          700: '#0159a3',
          800: '#064b86',
          900: '#0b3f6f',
          950: '#072849',
        },
        navy: {
          800: '#0A192F',
          900: '#060b19',
          950: '#03060f'
        },
        accent: {
          orange: '#ff6b35',
          cyan: '#00f2fe',
          blue: '#1E65FF',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['"Nunito Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Nunito Sans"', 'sans-serif']
      },
      boxShadow: {
        'eventik': '0 20px 40px -15px rgba(30, 101, 255, 0.15)',
        'eventik-lg': '0 25px 50px -12px rgba(30, 101, 255, 0.25)',
        'card-soft': '0 10px 30px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(30px)' },
        }
      }
    },
  },
  plugins: [],
}

