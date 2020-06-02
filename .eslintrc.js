module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  rules: {
    "no-console": "off",//process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": "off",//process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unused-vars": "off"//process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "babel-eslint"
  }
};
