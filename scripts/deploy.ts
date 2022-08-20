import { ethers } from "hardhat";

async function main() {
  let _main="0x87993e7a89A824D05dC5DCC8c6885A8412C525AB"

  const Ghnt = await ethers.getContractFactory("GHNT");
  const gnht = await Ghnt.deploy(_main);

  await gnht.deployed();

  console.log(`Ghnt deployed to ${gnht.address}`);
  
  const GhntICO = await ethers.getContractFactory("ghntICO");
  const gnhtICO = await GhntICO.deploy(_main,gnht.address,10,1);

  await gnhtICO.deployed();

  console.log(`Ghnt deployed to ${gnhtICO.address}`);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
