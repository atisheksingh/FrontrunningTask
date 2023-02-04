const express = require("express");
const http = require('http');
const Web3 = require("web3")
const app = express();
const ethers = require("ethers");
const nodemailer = require("nodemailer");
const { Console } = require("console");
const PORT = process.env.PORT || 3848;
const url = "https://polygon-mumbai.g.alchemy.com/v2/IayB8LT29SKY7sh6GjOeV8Tc9SntXOHu";
const Gurl = "https://eth-goerli.g.alchemy.com/v2/myNpRFw-vUA-IN-JYk_yYcdTVH9PYUhm";
var web3 = new Web3(Gurl);
const contractAddress = "0x4fa6c4f5274E1Ef14310e7018e73de6D16245b1c";
var privKey = "9013ba5707b9f4cae428a8560d95e361e5e736096435bc001e469a5b4fd9e9ec";
var account = "0x4e2a4948A34521a43092f984c9B57de13bC6e73c";
var wss = 'wss://eth-goerli.g.alchemy.com/v2/myNpRFw-vUA-IN-JYk_yYcdTVH9PYUhm'



const Attackerprivkey = "36444ba0028ad4f87e756222843b926d436b71b452afa87b47f44561d4185367";
const AttackerAccount = "0x7861d0d5b514e3c519fb5bb7c6fe5ff7050cf0ef"

var abi = [{ "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "sender", "type": "address" }, { "indexed": false, "internalType": "string", "name": "message", "type": "string" }], "name": "minting", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "changepause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "changeunpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "getUserBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "user", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "vulnerable", "outputs": [], "stateMutability": "nonpayable", "type": "function" }]
const contract = new web3.eth.Contract(abi, contractAddress)
var data = contract.methods.vulnerable("0x4e3aB704d6C5A9DDD50e5fa82eBeAD43Df92dB69", "5000000000000000000").encodeABI();
const data2 = contract.methods.changepause().encodeABI()
const data3 = contract.methods.changeunpause().encodeABI()


const currentstaus = async () => {
    var status = await contract.methods.paused().call();
    console.log("current contract status",status.toString())
    return status.toString();
}



const unspausehandler = async () => {
    console.log()
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: account,
            to: contractAddress,
            data: data3,
            gas: '500000',
          
        },
        privKey 
    );
    const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
    );
    console.log(
        `Transaction successful with hash: ${createReceipt.transactionHash}`
    );
    await currentstaus()
    process.exit()
};



const mintTx = async () => {
    const currentGasPrice = await web3.eth.getGasPrice();
    console.log(currentGasPrice.toString(), 'gas price ');
    const createTransaction = await web3.eth.accounts.signTransaction(
        {
            from: AttackerAccount,
            to: contractAddress,
            data: data,
            gas: 50000,
            gasPrice: currentGasPrice
        },
        Attackerprivkey 
    );
    try{
        const createReceipt = await web3.eth.sendSignedTransaction(
          createTransaction.rawTransaction
      );
      console.log(
          `Transaction successful with hash: ${createReceipt.transactionHash}`
       
      );
      currentstaus() 
      }catch(error){
        console.log('tx reverted')
        currentstaus() ;
      }
 
};


async function getMintEvent() {
    const provider = new ethers.providers.WebSocketProvider(wss);
    const contract = new ethers.Contract(contractAddress, abi, provider);
    contract.on("minting", (sender, message, value, event) => {

        let mintingEvent = {
            sender: sender,
            message: message,
            eventData: event,
        }
        MailToOwner()
        console.log(JSON.stringify(mintingEvent, null, 4))
    })

}

//function to mail to owner of the contract when a particular event is tiggered 
async function MailToOwner() {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rahul.kirte@indicchain.com",
            pass: "nvzasxqnwvdkxdse"
        }
    })

    const options = {
        from: "rahul.kirte@indicchain.com",
        to: "atishek.singh@indicchain.com",
        subject: "contract is under attack  ",
        text: "contract is under reenterancy attack ."
    };
    transporter.sendMail(options, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Notification Sent Successfully on your entered email id.");
            process.exit()
        }
    })


}

//function to check wether a tx is pending & pausing contract for failing the reentrancy .





var init = async function () {
    const cs = await currentstaus();
    if (cs == "false") {
        console.log("contract's Pause status is false , excuting Attack functionality")
        getMintEvent()
        await mintTx()
    }
    else {
        console.log("contract's Pause status is true , excuting unpause functionality")
        await unspausehandler() // please uncomment the function once contract is paused to reset the test.
    }
};



init();
//unspausehandler()
//now we create the express server
const server = http.createServer(app);
// we launch the server
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
