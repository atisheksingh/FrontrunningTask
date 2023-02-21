// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract ethervault {
    address public pri;
    event abc(address a);
    //to simluate reenternacy 
    modifier activated(address a){
    if(pri  == a){
        emit abc(a);
    }
    _;
    pri = a;
}

    mapping(address => uint) public balances;


    function addBalance() public payable {
        balances[msg.sender] += msg.value;
    }

   
    function withdraw() public activated(msg.sender) {
        require(balances[msg.sender] > 0);
        (bool sent, ) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed to send ether");

        balances[msg.sender] = 0;
    }



}