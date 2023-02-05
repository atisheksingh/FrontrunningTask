const hre = require("hardhat");

async function main() {

  const tokenInstance = await hre.ethers.getContractFactory("TokenContract");
  const token = await tokenInstance.deploy("Hello, Hardhat!");

  await token.deployed();

  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
