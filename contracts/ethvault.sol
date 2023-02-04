// SPDX-License-Identifier:  MIT
pragma solidity 0.8.13;

//adding pausable contract 
//adding ownable to contract
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract InsecureEtherVault is Ownable, Pausable{
    //event withdraw 
    event withdraw(address sender, string message);
    //mapping for userbalance
    mapping (address => uint256) private userBalances;
    //function to deposit eth into contract 
    function deposit() external payable whenNotPaused {
        userBalances[msg.sender] += msg.value;
    }
    //function to change value of pause to "true"
    function changepause() onlyOwner public{
        _pause();
    }
    //function to change value of pause to "false"
    function changeunpause() onlyOwner public{
        _unpause();
    }
    
    // function  to withdraw eth from pool
    function withdrawAll() external whenNotPaused {
        emit withdraw(msg.sender, "trying to withdraw");

        
        uint256 balance = getUserBalance(msg.sender);
        require(balance > 0, "Insufficient balance");

        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Failed to send Ether");
        userBalances[msg.sender] = 0;
    }
    //function to get balance of this contract 
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
    //function to get user balance 
    function getUserBalance(address _user) public view returns (uint256) {
        return userBalances[_user];
    }
}
