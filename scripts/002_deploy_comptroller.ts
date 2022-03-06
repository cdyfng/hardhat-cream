const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  console.log("eth.getBlock('latest').gasLimit:", await ethers.provider.getBlock("latest"));
  //console.log('')
  const Comptroller = await ethers.getContractFactory("Comptroller");
  const comptroller = await Comptroller.deploy(); //8089893 gas

  await comptroller.deployed();
  console.log("Comptroller deployed to:", comptroller.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
