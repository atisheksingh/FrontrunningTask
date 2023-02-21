const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { parseEther } = require("ethers/lib/utils");
const { ethers } = require("hardhat");


describe("Attack", function () {
    it("Should empty the balance of the vault contract", async function () {
      // Deploy the good contract
      const ethervaultFactory = await ethers.getContractFactory("ethervault");
      const ethervault = await ethervaultFactory.deploy();
      await ethervault.deployed();
  
      //Deploy the bad contract
      const AttackFactory = await ethers.getContractFactory("Attack");
      const Attack = await AttackFactory.deploy(ethervault.address);
      await Attack.deployed();
  
      // Get two addresses, treat one as innocent user and one as attacker
      const [_, investorAddress, attackerAddress] = await ethers.getSigners();
  
      // Innocent User deposits 10 ETH into ethervault
      let tx = await ethervault.connect(investorAddress).addBalance({
        value: parseEther("10"),
      });
      await tx.wait();
  
      // Check that at this point the ethervault's balance is 10 ETH
      let balanceETH = await ethers.provider.getBalance(ethervault.address);
      expect(balanceETH).to.equal(parseEther("10"));
  
      // Attacker calls the `attack` function on Attack
      // and sends 1 ETH
      tx1 = await Attack.connect(attackerAddress).attack({
        value: parseEther("1"),
      });

      // Balance of the ethervault's address is now zero
      balanceETH = await ethers.provider.getBalance(ethervault.address);
      expect(balanceETH).to.equal(BigNumber.from("0"));
  
      // Balance of Attack is now 11 ETH (10 ETH stolen + 1 ETH from attacker)
      balanceETH = await ethers.provider.getBalance(Attack.address);
      expect(balanceETH).to.equal(parseEther("11"));
    });
  });