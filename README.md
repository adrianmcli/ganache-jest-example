# Testing your Solidity contracts with Ganache, Jest, and Truffle-Compile

While I always recommend people to start off their dapps with a Truffle project, some people may prefer something more lightweight. For example, instead of having to pull-off migrations, maybe you just want to compile and test right-away.

No worries, the Truffle suite of tools has got you covered! With Ganache and Truffle-Compile, you have everything you need to compile and test your smart contracts.

## Dependencies

There are only 4 simple dependencies!

- `ganache-core` — Allows us to spawn a "test blockchain".
- `jest` — A testing framework.
- `truffle-compile` — Compiles our Solidity contract to a Truffle artifact.
- `web3` — Allows us to interact with our contract and do other Ethereum things.

## Files

### `SimpleStorage.sol`

This is a simple Solidity contract that we will use as our example. It allows you to set and get an integer and nothing more.

### `compile.js`

This file houses a utility function that compiles Solidity contracts and spits out a Truffle-Artifact. Do note that the artifact is an object keyed by the name of the contract.

### `test.js`

This file houses our tests. Notice that most of the heavy lifting is done in the `beforeAll` hook, where we:

- Compile the contract;
- Spawn a "test blockchain" with Ganache, and;
- Deploy our contract.

In the `afterAll` hook, we simply call `stop()` on the Provider to clean up after ourselves.

The example test is also very simple. All it does is:

1. Gets the value in the contract (should be a `0`);
2. Sets the value in the contract to `5`;
3. Gets the value in the contract again;
4. Checks to see that it went from `0` to `5`.