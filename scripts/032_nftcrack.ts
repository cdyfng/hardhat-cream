const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();


  const ToucansCrack = await ethers.getContractFactory("ToucansCrack");
  const toucansCrack = await ToucansCrack.deploy();
  await toucansCrack.deployed();
  console.log("ToucansCrack deployed to:", toucansCrack.address);

  // const toucansCrack = await ethers.getContractAt(
  //   "ToucansCrack",
  //   ""
  // );

  // console.log("toucansCrack: ", toucansCrack);

  const toucans = await ethers.getContractAt(
    "Toucans",
    // ""
    ""
  );
  let balance = await toucans.balanceOf(accounts[1].address);
  console.log("befor balance: ", balance);


  const increase = await toucansCrack.connect(accounts[1]).createContract(toucans.address);
  console.log("increase: ", increase.hash);

  let tx = await increase.wait();
  console.log("tx: ", tx.transactionHash);

  balance = await toucans.balanceOf(accounts[1].address);
  console.log("after balance: ", balance);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
