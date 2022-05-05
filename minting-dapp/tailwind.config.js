const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/**/*.tsx',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        // General
        page: {
          from_bg: colors.slate[100],
          to_bg: colors.slate[200],
        },
        titles: "#fa0601",
        links: {
          txt: "#fa0601",
          hover_txt: "#fa0601",
        },
        loading_spinner: "#fa0601",
        popups: {
          bg: colors.white,
          txt: colors.slate[800],
          internal_border: colors.slate[200],
        },
        warning: {
          txt: colors.slate[800],
          bg: colors.yellow[400],
          border: colors.yellow[500],
        },
        error: {
          txt: colors.red[500],
          bg: colors.red[50],
          border: colors.red[200],
        },

        // Inputs
        btn: {
          txt: colors.slate[800],
          bg: colors.white,
          border: colors.slate[200],
          hover_txt: colors.slate[800],
          hover_bg: colors.slate[100],
          hover_border: colors.slate[200]
        },
        btn_primary: {
          txt: colors.white,
          bg: "#fa0601",
          border: "#fa0601",
          hover_txt: colors.white,
          hover_bg: "#ff6966",
          hover_border: "#ff6966",
          down_bg: colors.black
        },
        btn_error: {
          txt: colors.white,
          bg: colors.red[500],
          border: colors.red[500],
          hover_txt: colors.white,
          hover_bg: colors.red[600],
          hover_border: colors.red[600],
        },
        label: "#fa0601",
        txt_input: {
          txt: "#fa0601",
          bg: colors.white,
          border: colors.slate[200],
          focus_txt: "#fa0601",
          focus_bg: colors.slate[50],
          focus_border: "#fa0601",
        },
        
        // Whitelist proof widget
        wl_message: {
          txt: colors.slate[800],
          bg: colors.indigo[100],
        },

        // Mint widget
        token_preview: "#ffffff",
        white_label: "#ffffff",
        charity_desc_color: "#fed681",
        charity_color: "#e6e6e6",
        charity_selected_color: "#ffad00",
      },
    },
  },
  variants: {},
  plugins: [],
};
