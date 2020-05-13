const path = require("path");

const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
const OUTPUP_DIR = path.resolve(__dirname, "static");

const config = {
  entry: ENTRY_FILE,
  output: { path: OUTPUP_DIR, filename: "[name].[format]" },
};

module.exports = config;
