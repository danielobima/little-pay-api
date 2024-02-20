const fs = require("fs");
const path = require("path");

const json = {
  type: "commonjs",
};

fs.writeFileSync(
  path.join(__dirname, "../dist/cjs/package.json"),
  JSON.stringify(json, null, 2)
);
