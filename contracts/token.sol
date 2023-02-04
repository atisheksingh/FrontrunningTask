// SPDX-License-Identifier:  MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenContract is ERC20 , Ownable, Pausable {

    //event minting 
    event minting(address sender, string message);
    //mapping for userbalance
    mapping (address => uint256) private userBalances;

    constructor() ERC20("Test", "TestToken") {
        _mint(msg.sender, 1000000000000000 * 10**decimals());
    }

     //function to change value of pause to "true"
    function changepause() onlyOwner public{
        _pause();
    }
    //function to change value of pause to "false"
    function changeunpause() onlyOwner public{
        _unpause();
    }

    // function vulnerable to a Reentrancy attack. 
    function vulnerable(address user, uint256 amount) public whenNotPaused {
        emit minting(user, "trying to withdraw");
        userBalances[user] += amount;
        _mint(user, amount);
    }
    //function to get user balance 
    function getUserBalance(address _user) public view returns (uint256) {
        return userBalances[_user];
    }

}
    
