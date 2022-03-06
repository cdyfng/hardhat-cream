const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();

  const CTokenAdmin = await ethers.getContractFactory("CTokenAdmin");
  const cTokenAdmin = await CTokenAdmin.deploy(accounts[0].address);
  await cTokenAdmin.deployed();
  console.log("cTokenAdmin deployed to:", cTokenAdmin.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
