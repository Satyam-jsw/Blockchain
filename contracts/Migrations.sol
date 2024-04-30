pragma solidity >=0.5.0 <0.7.0;

contract Migrations {
    address public owner;
    uint public last_completed_migration;

    modifier restricted() {
        if (msg.sender == owner) _;
    }

    constructor() public {
        owner = 0x9faBead79988Fd485bac961ef35a7A9259C51f4b;
    }

    function setCompleted(uint completed) public restricted {
        last_completed_migration = completed;
    }
}
