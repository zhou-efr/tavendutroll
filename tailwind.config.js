module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      'zelda': ['"The Wild Breath of Zelda"', '"Sketch Gothic School"', 'Montserrat']
    },
    extend: {
      colors : {
        'tdt-brown': '#6E4E3A'
      },
      backgroundImage: {
        'wooden-header': "url('./images/header.png')",
      }
    },
  },
  plugins: [],
}
