const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();

  const CompoundLens = await ethers.getContractFactory("CompoundLens");
  const compoundLens = await CompoundLens.deploy();
  await compoundLens.deployed();
  console.log("compoundLens deployed to:", compoundLens.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
