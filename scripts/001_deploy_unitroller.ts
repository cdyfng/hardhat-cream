const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const Unitroller = await ethers.getContractFactory("Unitroller");
  const unitroller = await Unitroller.deploy();

  await unitroller.deployed();
  console.log("Unitroller deployed to:", unitroller.address);

  //unitroller _setPendingAdmin

  const setPendingAdmin = await unitroller._setPendingAdmin(accounts[1].address);
  console.log('setPendingAdmin:', setPendingAdmin.hash);

  const receipt = await setPendingAdmin.wait();
  console.log(receipt.logs)


  // const GRAPProxy = await ethers.getContractFactory("GRAPDelegator");
  // const grapProxy = await GRAPProxy.deploy(
  //   "GRAP",
  //   "GRAP",
  //   18,
  //   "2000000000000000000000000",
  //   grapImplementation.address,
  //   "0x"
  // );
  // await grapProxy.deployed();
  // console.log("GRAPProxy deployed to:", grapProxy.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
