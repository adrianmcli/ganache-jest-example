const path = require("path");
const fs = require("fs");
const TruffleCompile = require("truffle-compile");

// Promisify truffle-compile so we can use async/await on it below
const truffleCompile = (...args) =>
  new Promise(resolve => TruffleCompile(...args, (_, data) => resolve(data)));

const compile = async filename => {
  // path to our solidity contract
  const sourcePath = path.join(__dirname, filename);

  // build the objects that truffle-compile needs
  const sources = {
    [sourcePath]: fs.readFileSync(sourcePath, { encoding: "utf8" }),
  };

  const options = {
    contracts_directory: path.join(__dirname),
    compilers: {
      solc: {
        version: "0.5.2",
        settings: {
          optimizer: {
            enabled: false,
            runs: 200,
          },
          evmVersion: "byzantium",
        },
      },
    },
  };

  // truffle-compile should give us back a JSON artifact
  const artifact = await truffleCompile(sources, options);
  return artifact;
};

module.exports = compile;
