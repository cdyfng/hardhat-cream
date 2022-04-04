const { ethers } = require("hardhat");

async function main() {
  const accounts = await ethers.getSigners();
  const Toucans = await ethers.getContractFactory("Toucans");
  const toucans = await Toucans.deploy();

  await toucans.deployed();
  console.log("Toucans deployed to:", toucans.address);
  // const toucans = await ethers.getContractAt(
  //   "Toucans",
  //   ""
  // );

  //toucans _setPendingAdmin

  const setMintingEnabled = await toucans.setMintingEnabled(true);
  console.log("setMintingEnabled:", setMintingEnabled.hash);

  // const receipt = await setMintingEnabled.wait();
  // console.log(receipt.logs);

  //check
  const isMintingEnabled = await toucans.isMintingEnabled();
  console.log("isMintingEnabled: ", isMintingEnabled);

  //check
  let balance = await toucans.balanceOf(accounts[1].address);
  console.log("befor balance: ", balance);

  const mintIndex = 1;
  const mint = await toucans.connect(accounts[mintIndex]).mint();
  console.log("mint: ", mint);
  const tx = await mint.wait();
  console.log("tx: ", tx);
  const event = tx.events[0];
  const value = event.args[2];

  console.log("event.args:", event.args);
  console.log("value:", value);
  const tokenId = value.toNumber(); // Getting the tokenID

  const tokenURI = await toucans.tokenURI(tokenId); // Using the tokenURI from ERC721 to retrieve de metadata
  console.log("tokenURI:", tokenURI);
  console.log("mint wait finish: ", mint.hash);

  //transfer to
  const safeTransferFrom = await toucans
    .connect(accounts[mintIndex])
    ["safeTransferFrom(address,address,uint256)"](
      accounts[mintIndex].address,
      accounts[1].address,
      tokenId
    );
  console.log("mint: ", mint);
  const tx2 = await safeTransferFrom.wait();
  console.log("tx2: ", tx2);
  // const tokenId = await toucans.

  balance = await toucans.balanceOf(accounts[mintIndex].address);
  console.log("after transfer balance: ", balance);

  //
  // const transferFrom = toucans.connect(accounts[1]).transferFrom
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
