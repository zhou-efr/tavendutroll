module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['Montserrat', "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      'zelda': ['"The Wild Breath of Zelda"', '"Sketch Gothic School"', 'Montserrat']
    },
    extend: {
      spacing: {
        '125': '125px',
        'home-text': '56vh',
        'home-text-phone': '80vw',
      },
      height: {
        'screen-1/3': '33vh',
        'screen-1/2': '50vh',
        'screen-2/3': '66vh',
        'screen-3/4': '75vh',
        'screen-5/4': '115vh',
      },
      colors : {
        // 'tdt-brown': '#6E4E3A',
        'tdt-brown': '#614632',
        'dark-brown': '#614632',
        'light-brown': '#9C8469',
        'item': 'rgba(0,0,0,0.87)'
      },
      backgroundImage: {
        'wooden-header': "url('./images/header.png')",
      }
    },
  },
  plugins: [],
}
