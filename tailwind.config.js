/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        /** Single app font: local variable font */
        display: ['"SHA Google Sans"', 'system-ui', 'sans-serif'],
        sans: ['"SHA Google Sans"', 'system-ui', 'sans-serif'],
        ui: ['"SHA Google Sans"', 'system-ui', 'sans-serif'],
        hebrew: ['"SHA Google Sans"', 'system-ui', 'sans-serif'],
        serif: ['"SHA Google Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
