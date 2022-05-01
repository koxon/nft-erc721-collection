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
        titles: "#046eff",
        links: {
          txt: "#046eff",
          hover_txt: "#046eff",
        },
        loading_spinner: "#046eff",
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
          hover_border: colors.slate[200],
        },
        btn_primary: {
          txt: colors.black,
          bg: "#fbd229",
          border: "#fbd229",
          hover_txt: colors.black,
          hover_bg: "#ffde54",
          hover_border: "#ffde54",
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
        charity_desc_color: "#fbd229",
        charity_color: "#e6e6e6",
        charity_selected_color: "#fbd329",
      },
    },
  },
  variants: {},
  plugins: [],
};
