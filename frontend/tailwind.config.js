/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: '#141d2f',
          900: '#0f172a',
        },
        electric: '#3b82f6',
        emerald: '#10b981'
      }
    },
  },
  plugins: [],
}
