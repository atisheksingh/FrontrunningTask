# Basic Sample Hardhat Project








This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
Token.sol
polygon testnet address : 0xcaA2759ca351Fb29a381c3fC878D1deD1F214E54

lib in smart contract :
1) ERC20
2) ownable
3) pausable 


A smart contract with reentrancy vulnerable function named as "vulnerable" which mint in the account of the given address parameter.
Function also consist with event that will notify owner that particular function is invoked.
A mail is sent as the notification to owner given mail with details from the latest tx while tx is still in pending.

We are scanning mempool to find the tx that is "vulnerable", and details around it.

Then we will see if the next tx is from the same address and we can it flag it as suspicous , 
once flagged second tx will be frontrunned by the 3rd tx which will pause the miniting process as we already have "pausable"functionality in the smartcontract.

![Screenshot](quil-hash-task-frontrunning-a-tx.png)
