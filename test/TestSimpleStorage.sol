pragma solidity >=0.5.0 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/SimpleStorage.sol";

contract TestSimpleStorage {
    SimpleStorage simpleStorage;

    function beforeEach() public {
        simpleStorage = SimpleStorage(DeployedAddresses.SimpleStorage());
    }

    function testItStoresAValue() public {
        string memory newValue = "89";
        simpleStorage.set(newValue);

        string memory storedValue = simpleStorage.get();

        Assert.equal(storedValue, newValue, "It should store the value 89.");
    }
}
