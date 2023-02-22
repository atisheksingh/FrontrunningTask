const express = require("express");
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3000;
var ethers = require("ethers");
var wss = "wss://eth-goerli.g.alchemy.com/v2/myNpRFw-vUA-IN-JYk_yYcdTVH9PYUhm";
const Web3 = require("web3")
const url = "https://eth-goerli.g.alchemy.com/v2/myNpRFw-vUA-IN-JYk_yYcdTVH9PYUhm";
var web3 = new Web3(url);
const contractAddress = "0x17De968f78C16d86b9B9A981Fd375dFfeAE9a41e";
var abi = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "approve", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "changepause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "changeunpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" } ], "name": "decreaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" } ], "name": "increaseAllowance", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" } ], "name": "Paused", "type": "event" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "account", "type": "address" } ], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "attacker", "type": "address" } ], "name": "attack", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "string", "name": "message", "type": "string" } ], "name": "minting", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transfer", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" } ], "name": "vulnerable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" } ], "name": "allowance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [ { "internalType": "uint8", "name": "", "type": "uint8" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_user", "type": "address" } ], "name": "getUserBalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pri", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ]
const contract = new web3.eth.Contract(abi, contractAddress)
const functiondata = contract.methods.changepause().encodeABI()
var privKey = "9013ba5707b9f4cae428a8560d95e361e5e736096435bc001e469a5b4fd9e9ec";
var account = "0x4e2a4948A34521a43092f984c9B57de13bC6e73c";


async function cancelTransaction(transactionHash) {
  console.log(transactionHash)
  const transactionReceipt = await web3.eth.getTransactionReceipt(transactionHash);
  if (!transactionReceipt) {
      console.log(`Transaction ${transactionHash} is still pending...`);
      var currentGasPrice = await web3.eth.getGasPrice();
      currentGasPrice = currentGasPrice * (2.5) * 10 // Use a higher gas price
      console.log(currentGasPrice.toString(), 'gas price ');
      const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: account,
            to: contractAddress,
            data: functiondata,
            gas: '5000000',
            gasPrice:currentGasPrice
        },
        privKey 
    );
    try{
    
      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );
      console.log(
        `Transaction successful with hash: ${createReceipt.transactionHash}`
      );
      console.log('we have successfully front-runned reenterancy')
      process.exit(); // exiting code once it is 
    }
      catch(error){
          console.log('')
      }
  
  } else {
      console.log(`Transaction ${transactionHash} has been mined and cannot be cancelled.`);
  }
}


var init = async function () {
  var customWsProvider = new ethers.providers.WebSocketProvider(wss);
  console.log(
    `Connection to mempool is made , watching for tx`
  );
  customWsProvider.on("pending", (tx) => {
    customWsProvider.getTransaction(tx).then(async function (transaction) {
      if(transaction &&transaction.to ==="0x4fa6c4f5274E1Ef14310e7018e73de6D16245b1c")
      {
        var tx = transaction;
        console.log(tx.to, "transaction to  ")
        console.log(tx.hash)
        if(tx.from="0x7861d0d5b514e3c519fb5bb7c6fe5ff7050cf0ef"&& tx){
          console.log(transaction.hash, "txhash");
          console.log(tx.from)
          console.log('caught fraud tx')
          await cancelTransaction(transaction.hash);
        }
      }
      });
   
  });

  customWsProvider._websocket.on("error", async () => {
    console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
    setTimeout(init, 3000);
  });
  customWsProvider._websocket.on("close", async (code) => {
    console.log(
      `Connection lost with code ${code}! Attempting reconnect in 3s...`
    );
    customWsProvider._websocket.terminate();
    setTimeout(init, 3000);
  });
};

init();
const server = http.createServer(app);
// we launch the server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
