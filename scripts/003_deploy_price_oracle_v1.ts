const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const PriceOracleV1 = await ethers.getContractFactory("PriceOracleV1");
  const priceOracleV1 = await PriceOracleV1.deploy(accounts[1].address);

  await priceOracleV1.deployed();
  console.log("PriceOracleV1 deployed to:", priceOracleV1.address);

  //priceOracleV1 _setPendingAnchorAdmin

  const setPendingAnchorAdmin = await priceOracleV1._setPendingAnchorAdmin(accounts[2].address);
  console.log('setPendingAnchorAdmin:', setPendingAnchorAdmin.hash);

  const receipt = await setPendingAnchorAdmin.wait();
  console.log(receipt.logs)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
