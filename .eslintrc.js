// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  root: true,
  extends: ["expo", "eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
