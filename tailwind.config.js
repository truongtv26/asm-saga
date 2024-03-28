/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'hover-hover': {'raw': '(hover: hover) and (pointer: fine)'}
      },
      colors: {
        "primary": "var(--text-primary-color)",
        "link" : '#f0d62e'
      },
      backgroundColor: {
        "primary": "var(--primary-color)",
        "secondary": "var(--secondary-color)"
      },
      fontFamily: {
        "roboto": ['Roboto', 'sans-serif'],
      },
    },
    
  },  
  plugins: [],
}
