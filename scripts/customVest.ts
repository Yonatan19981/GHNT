import { ethers } from "hardhat";

async function main() {
    //divide by 1000 for precentage
let schedule:any = [10, 10, 0, 0, 0, 0, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0]
let ghntToken="0x87993e7a89A824D05dC5DCC8c6885A8412C525AB";
let AmountToVest=10;
let userWallet="0x87993e7a89A824D05dC5DCC8c6885A8412C525AB";
let vestingFactoryAddress="0x87993e7a89A824D05dC5DCC8c6885A8412C525AB"

const VestingFactory = await ethers.getContractFactory("vestingFactory");
  const Ghnt = await ethers.getContractFactory("GHNT");

  let ghntVesting:any=await VestingFactory.attach(vestingFactoryAddress);
  let ghnt:any=await Ghnt.attach(ghntToken);

  ghnt.approve(vestingFactoryAddress,10000)
  let customVest=await ghntVesting.vest(userWallet,ghnt.address,AmountToVest,schedule,schedule.length)

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
