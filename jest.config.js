module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  preset: "@vue/cli-plugin-unit-jest/presets/typescript-and-babel",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "src/composables/**/*.{js,vue,ts}",
    "src/store/todos/**/*.{js,vue,ts}",
    "src/components/**/*.{js,vue,ts}",
  ],
};
