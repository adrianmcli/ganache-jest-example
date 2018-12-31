/**
 * @jest-environment node
 */
const Ganache = require("ganache-core");
const Web3 = require("web3");
const compile = require("./compile");

jest.setTimeout(20000); // provide enough time to download compiler if not cached

describe("test stuff", () => {
  let contractInstance;
  let accounts;
  let provider;
  let web3;
  beforeAll(async () => {
    // 1. Compile contract artifact
    const { SimpleStorage } = await compile("SimpleStorage.sol");

    // 2. Spawn Ganache test blockchain
    provider = Ganache.provider();
    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();

    // 3. Create initial contract instance
    const instance = new web3.eth.Contract(SimpleStorage.abi);

    // 4. Deploy contract and get new deployed Instance
    const deployedInstance = await instance
      .deploy({ data: SimpleStorage.bytecode })
      .send({ from: accounts[0], gas: 150000 });

    // 5. Assign deployed contract instance to variable
    contractInstance = deployedInstance;
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
