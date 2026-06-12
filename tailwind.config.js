/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandBlue: {
          50: '#f0f5ff',
          100: '#dbeafe',
          600: '#1e40af', // Primary Navy - Trust
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e3a8a',
          950: '#172554',
        },
        brandGreen: {
          50: '#f0fdf4',
          100: '#dcfce7',
          600: '#16a34a', // Accent Green - Finance & Growth
          700: '#15803d',
        },
        brandBeige: {
          50: '#fdfbf7', // Secondary Light - Friendly Cream
          100: '#f5f2eb',
          200: '#e7e2d6',
          900: '#1c1917',
          950: '#0c0a09',
        }
      },
      fontFamily: {
        title: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        body: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      }
    },
  },
  plugins: [],
}
