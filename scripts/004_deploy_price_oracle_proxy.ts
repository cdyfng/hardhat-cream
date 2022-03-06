const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const accounts = await ethers.getSigners();
  //  const {deployer, nativeUsdAggregator, admin, guardian} = await getNamedAccounts();

  const priceOracleV1 = await ethers.getContractAt(
    "PriceOracleV1",
    process.env.PriceOracleV1
  );
  console.log("priceOracleV1 address:", priceOracleV1.address);

  const PriceOracleProxyUSD = await ethers.getContractFactory(
    "PriceOracleProxyUSD"
  );
  const priceOracleProxyUSD = await PriceOracleProxyUSD.deploy(
    accounts[0].address,
    priceOracleV1.address,
    accounts[1].address
  );
  await priceOracleProxyUSD.deployed();
  console.log("priceOracleProxyUSD deployed to:", priceOracleProxyUSD.address);

  //priceOracleProxyUSD _setGuardian

  const setGuardian = await priceOracleProxyUSD._setGuardian(
    accounts[3].address
  );
  console.log("setGuardian:", setGuardian.hash);

  const receipt = await setGuardian.wait();
  console.log(receipt.logs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
