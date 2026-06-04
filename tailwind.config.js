/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        heading: ['"Cinzel"', 'serif'],
        body: ['"Nunito"', 'sans-serif'],
      },
      colors: {
        cosmic: {
          950: '#04020f',
          900: '#0a0520',
          800: '#130a35',
          700: '#1e1050',
          600: '#2b1870',
        },
        star: {
          gold: '#f5c842',
          blue: '#4fc3f7',
          purple: '#b39ddb',
          pink: '#f48fb1',
        }
      },
      backgroundImage: {
        'starfield': "radial-gradient(ellipse at 20% 50%, #1e1050 0%, #04020f 60%)",
        'card-glow': "linear-gradient(135deg, rgba(79,195,247,0.1) 0%, rgba(179,157,219,0.1) 100%)",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(79,195,247,0.4)',
        'glow-gold': '0 0 20px rgba(245,200,66,0.4)',
        'glow-purple': '0 0 20px rgba(179,157,219,0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
}
