const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("test", function () {
  it("Should deploy vault and attack", async function () {

    accounts = await ethers.getSigners();
    [owner, investor1, investor2] = accounts;
    const tokenInstance= await ethers.getContractFactory("TokenContract")
    const token = await tokenInstance.deploy();
    //function to  change value of pause to "false"
    //await token.changepause();
    await token.vulnerable(investor1.address, 100000);
    bal = await token.getUserBalance(investor1.address)
    console.log(bal.toString());

  });


});

