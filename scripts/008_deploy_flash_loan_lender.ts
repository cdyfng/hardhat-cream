const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");
require("dotenv").config();

async function main() {
  const accounts = await ethers.getSigners();

  const unitroller = await ethers.getContractAt(
    "Unitroller",
    process.env.Unitroller
  );

  const FlashloanLender = await ethers.getContractFactory("FlashloanLender");
  const flashloanLender = await FlashloanLender.deploy(
    unitroller.address,
    accounts[0].address
  );

  console.log("flashloanLender:", flashloanLender.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
