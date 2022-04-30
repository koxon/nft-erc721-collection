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
          txt: colors.white,
          bg: "#046eff",
          border: "#046eff",
          hover_txt: colors.white,
          hover_bg: "#529bff",
          hover_border: "#529bff",
        },
        btn_error: {
          txt: colors.white,
          bg: colors.red[500],
          border: colors.red[500],
          hover_txt: colors.white,
          hover_bg: colors.red[600],
          hover_border: colors.red[600],
        },
        label: "#046eff",
        txt_input: {
          txt: "#046eff",
          bg: colors.white,
          border: colors.slate[200],
          focus_txt: "#046eff",
          focus_bg: colors.slate[50],
          focus_border: "#046eff",
        },
        
        // Whitelist proof widget
        wl_message: {
          txt: colors.slate[800],
          bg: colors.indigo[100],
        },

        // Mint widget
        token_preview: "#ffffff",
        white_label: "#ffffff",
        charity_color: "#e6e6e6",
        charity_selected_color: "#facc13",
      },
    },
  },
  variants: {},
  plugins: [],
};
