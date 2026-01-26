/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          green: {
            light: '#28A745',
            dark: '#1E7B34',
          },
          blue: {
            light: '#1E90FF',
            dark: '#1565C0',
          },
        },
        background: {
          light: '#F5F5F5',
          dark: '#121212',
        },
        text: {
          light: '#333333',
          dark: '#E0E0E0',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        almarai: ['Almarai', 'sans-serif'],
      },
    },
  },
  plugins: [],
}