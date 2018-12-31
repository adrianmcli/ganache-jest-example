pragma solidity ^0.5.2;

contract SimpleStorage {
  uint storedData = 0;

  function set(uint x) public {
    storedData = x;
  }

  function get() public view returns (uint) {
    return storedData;
  }
}
