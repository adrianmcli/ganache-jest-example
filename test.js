/**
 * @jest-environment node
 */
const Ganache = require("ganache-core");
const Web3 = require("web3");
const compile = require("./compile");

describe("test stuff", () => {
  let contractInstance;
  let accounts;
  let provider;
  let web3;
  beforeAll(async () => {
    try {
    // 1. Compile contract artifact
    const { SimpleStorage } = await compile("SimpleStorage.sol");

    // 2. Spawn Ganache test blockchain
    provider = Ganache.provider();
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    // 3. Create initial contract instance
    const instance = new web3.eth.Contract(SimpleStorage.abi);

    // 4. Estimate gas
    const gas = await instance
      .deploy({ data: SimpleStorage.evm.bytecode.object })
      .estimateGas();

    // 5. Deploy contract and get new deployed instance
    const deployedInstance = await instance
      .deploy({ data: SimpleStorage.evm.bytecode.object })
      .send({ from: accounts[0], gas: gas + 1 });

    // 6. Assign deployed contract instance to variable
    contractInstance = deployedInstance;

    } catch(err) {
      // handle error
      throw err
    }
  });

  afterAll(async () => {
    // clean up provider
    provider.stop();
  });

  it("should test contract", async () => {
    // get old value
    const oldVal = await contractInstance.methods.get().call();

    // set new value
    await contractInstance.methods.set(5).send({ from: accounts[0] });

    // get new value
    const newVal = await contractInstance.methods.get().call();

    // assert our expectations
    expect(oldVal).toBe("0");
    expect(newVal).toBe("5");
  });
});
