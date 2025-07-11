/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: {
          light: '#3b82f6', // blue-500
          dark: '#60a5fa',  // blue-400
        },
        background: {
          light: '#ffffff',
          dark: '#1a202c',  // gray-900
        },
        text: {
          light: '#1a202c', // gray-900
          dark: '#f7fafc',  // gray-50
        },
      },
    },
  },
  plugins: [],
}
