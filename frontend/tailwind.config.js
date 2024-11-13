module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'profile': '0px 10px 15px rgba(0, 0, 0, 0.15)',
      },
      keyframes: {
        'sketchy-border': {
          '0%': { 'stroke-dashoffset': '1000' },
          '100%': { 'stroke-dashoffset': '0' },
        },
      },
      animation: {
        'sketchy-border': 'sketchy-border 1s ease-out infinite',
      },
      borderImage: {
        'sketch': "url('/sketch-border.svg') 30 stretch",
      },
      fontFamily: {
        cursive: ['Patrick Hand', 'Comic Sans MS', 'cursive'], // Define your custom cursive font family here
      },
      colors: {
        pencilGray: '#4a4a4a', // Custom gray color for pencil effect
      },
    },
  },
  plugins: [],
};
