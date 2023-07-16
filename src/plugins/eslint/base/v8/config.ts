const config = {
  plugins: ["security", "unicorn", "import"],
  settings: {
    "import/resolver": {
      node: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:security/recommended",
    "plugin:sonarjs/recommended",
    "plugin:import/recommended",
  ],
};

export default config;
