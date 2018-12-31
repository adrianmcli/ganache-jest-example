const path = require("path");
const fs = require("fs");
const solc = require("solc");

const compile = filename => {
  const sourcePath = path.join(__dirname, filename);

  const input = {
    sources: {
      [sourcePath]: {
        content: fs.readFileSync(sourcePath, { encoding: "utf8" }),
      },
    },
    language: "Solidity",
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  const output = JSON.parse(solc.compile(JSON.stringify(input)));
  const artifact = output.contracts[sourcePath];
  return artifact;
};

module.exports = compile;
