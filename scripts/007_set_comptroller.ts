const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");
require("dotenv").config();

async function main() {
  //const accounts = await ethers.getSigners();

  const unitroller = await ethers.getContractAt(
    "Unitroller",
    process.env.Unitroller
  );

  const comptroller = await ethers.getContractAt(
    "Comptroller",
    process.env.Comptroller
  );

  const setPendingImplementation = await unitroller._setPendingImplementation(
    comptroller.address
  );
  console.log("setPendingImplementation: ", setPendingImplementation.hash);
  let receipt = await setPendingImplementation.wait();
  console.log(receipt.logs);

  const become = await comptroller._become(unitroller.address);
  console.log("become:", become.hash);
  receipt = await become.wait();
  console.log(receipt.logs);

  const closeFactor = parseEther("0.5");
  console.log("closeFactor:", closeFactor);
  const liquidationIncentive = parseEther("1.08");
  console.log("liquidationIncentive:", liquidationIncentive);

  const priceOracleProxyUSD = await ethers.getContractAt(
    "PriceOracleProxyUSD",
    process.env.PriceOracleProxyUSD
  );

  const setCloseFactor = await comptroller._setCloseFactor(closeFactor);
  console.log("setCloseFactor:", setCloseFactor.hash);
  receipt = await setCloseFactor.wait();
  console.log(receipt.logs);

  const setLiquidationIncentive = await comptroller._setLiquidationIncentive(
    liquidationIncentive
  );
  console.log("setLiquidationIncentive:", setLiquidationIncentive.hash);
  receipt = await setLiquidationIncentive.wait();
  console.log(receipt.logs);

  const setPriceOracle = await comptroller._setPriceOracle(
    priceOracleProxyUSD.address
  );
  console.log("setPriceOracle:", setPriceOracle.hash);
  receipt = await setPriceOracle.wait();
  console.log(receipt.logs);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
