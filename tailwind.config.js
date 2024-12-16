/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {  
        textColor: '#364A63',
        secondTextColor: '#8091A7',  
      }  
    },
  },
  plugins: [],
}