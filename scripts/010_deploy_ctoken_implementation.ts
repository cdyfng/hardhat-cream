const { ethers } = require("hardhat");

async function main() {
  const CWrappedNativeDelegate = await ethers.getContractFactory(
    "CWrappedNativeDelegate"
  );
  const cWrappedNativeDelegate = await CWrappedNativeDelegate.deploy();
  console.log(
    "cWrappedNativeDelegate deployed to:",
    cWrappedNativeDelegate.address
  );

  const CCollateralCapErc20Delegate = await ethers.getContractFactory(
    "CCollateralCapErc20Delegate"
  );
  const cCollateralCapErc20Delegate = await CCollateralCapErc20Delegate.deploy();
  console.log(
    "cCollateralCapErc20Delegate deployed to:",
    cCollateralCapErc20Delegate.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
