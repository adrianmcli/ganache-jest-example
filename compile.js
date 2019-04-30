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

  if(output.errors)
    throw new Error(format(output.errors));

  const artifact = output.contracts[sourcePath];
  return artifact;
};

const format = error => {
  const message = Object.keys(error[0]).map( key => {
    return `\n ${key}: ${JSON.stringify(error[0][key])}`;
  });
  return `Solidity compile error \n ${message}`;
}

module.exports = compile;
