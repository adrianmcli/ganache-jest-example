# Minimal Solidity contract testing with Ganache and Jest

A Truffle project is a great way to start a dapp, but sometimes you want something more lightweight. For example, instead of having to pull-off migrations, maybe you just want to compile a simple smart contract and test right-away.

No worries, the Truffle suite of tools has got you covered! Using Ganache, you can easily spawn a test blockchain for your tests.

**Note:** This example uses `solc` to compile the contract. If you prefer to use `truffle-contract` (makes the JSON artifact a little easier to work with), check out the `truffle-contract` branch [here](https://github.com/adrianmcli/ganache-jest-example/tree/truffle-contract).

## Dependencies

In this example, there are only 4 dependencies!

- `ganache-core` — Allows us to spawn a "test blockchain".
- `jest` — A testing framework.
- `solc` — Compiles our Solidity contract.
- `web3` — Allows us to interact with our contract and do other Ethereum things.

## Files

### `SimpleStorage.sol`

This is a simple Solidity contract that we will use as our example. It allows you to set and get an integer and nothing more.

### `compile.js`

This file houses a utility function that compiles Solidity contracts and spits out JSON we can work with. Do note that we only need two things from the JSON in this example:

1. The contract ABI, and;
2. The contract bytecode.

### `test.js`

This file houses our tests. Notice that most of the heavy lifting is done in the `beforeAll` hook, where we:

- Compile the contract with `solc`;
- Spawn a "test blockchain" with `ganache-core`, and;
- Deploy our contract with `web3`.

In the `afterAll` hook, we simply call `stop()` on the Provider to clean up after ourselves.
