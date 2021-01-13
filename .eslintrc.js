module.exports = {
  root: true,

  rules: {
    "no-console": "off",
    "no-debugger": "off",
  },

  parser: "vue-eslint-parser",

  parserOptions: {
    parser: "babel-eslint",
  },

  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:prettier-vue/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/base",
  ],

  settings: {
    "prettier-vue": {
      SFCBlocks: {
        template: false,
      },
    },
  },

  globals: {
    uni: true,
  },
};
