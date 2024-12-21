/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables class-based dark mode
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        DefaultColor: '#336AEA',
        tenderDetails: '#DBE8FF',
      },
      fontFamily: {
        // poppins: ['Poppins', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      screens: {
        xs: '360px', // Extra small devices (small mobile)
        sm: '640px', // Small devices (mobile)
        md: '768px', // Medium devices (tablets)
        lg: '1024px', // Large devices (desktops)
        xl: '1280px', // Extra large devices (large desktops)
        '2xl': '1536px', // 2X large devices (extra large desktops)
      },
    },
  },
  plugins: [],
};