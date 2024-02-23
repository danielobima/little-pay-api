const { nodeResolve } = require("@rollup/plugin-node-resolve");
const terser = require("@rollup/plugin-terser");
const commonjs = require("@rollup/plugin-commonjs");
const json = require("@rollup/plugin-json");

module.exports = {
  input: "dist/umd/index.js", // Your entry TypeScript file
  output: {
    file: "little-pay-api.min.js", // Output UMD bundle
    format: "umd",
    name: "littlePayApi", // Global variable name for your library
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: false,
    }),
    terser(),
    json(),
    commonjs(),
  ],
};
