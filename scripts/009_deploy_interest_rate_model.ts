const { ethers } = require("hardhat");
const { parseEther } = require("ethers/lib/utils");

async function main() {
  const accounts = await ethers.getSigners();
  const admin = accounts[1].address;

  let baseRate = 0;
  let multiplier = parseEther("0.15");
  let jump = parseEther("5");
  let kink1 = parseEther("0.8");
  let kink2 = parseEther("0.9");
  let roof = parseEther("1.5");

  const TripleSlopeRateModel = await ethers.getContractFactory(
    "TripleSlopeRateModel"
  );
  const majorIRM = await TripleSlopeRateModel.deploy(
    baseRate,
    multiplier.mul(kink1).div(parseEther("1")),
    jump,
    kink1,
    kink2,
    roof,
    admin
  );
  console.log("majorIRM:", majorIRM.address);

  multiplier = parseEther("0.23");
  jump = parseEther("8");

  const stableIRM = await TripleSlopeRateModel.deploy(
    baseRate,
    multiplier.mul(kink1).div(parseEther("1")),
    jump,
    kink1,
    kink2,
    roof,
    admin
  );
  console.log("stableIRM:", stableIRM.address);

  multiplier = parseEther("0.2");
  jump = parseEther("5");
  kink1 = parseEther("0.7");
  kink2 = parseEther("0.8");

  const govIRM = await TripleSlopeRateModel.deploy(
    baseRate,
    multiplier.mul(kink1).div(parseEther("1")),
    jump,
    kink1,
    kink2,
    roof,
    admin
  );
  console.log("govIRM:", govIRM.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
