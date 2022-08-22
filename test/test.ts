import { expect } from 'chai'
import { ethers } from 'hardhat';

let ghnt:any
let ghntICO:any;
let wallets:any;
let wallet:any;
let ghntVesting:any;
let vestingFactory:any;
let ICOvestingschedule:any = [0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0]
let testschedule:any = [10, 10, 0, 0, 0, 0, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20, 20, 20, 20, 20, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 0, 0, 0, 0, 0, 0, 0, 0]

/*
vesting contract parameters: 
	wallets[0].address,
			ICOvestingschedule,
			ICOvestingschedule.length,
            ghnt.address,
            ghntICO.address,
            _amount
*/
describe('GHNT',() => {
	

	before(async function () {
        wallets = await ethers.getSigners();
        
        let _main=wallets[0].address;
        wallet=_main
        let ratio=10;
        let amount=1;
        console.log ("_main :",_main)

        const Ghnt = await ethers.getContractFactory("GHNT");
        ghnt = await Ghnt.deploy(_main);
      
        await ghnt.deployed();
      
        console.log(`Ghnt deployed to ${ghnt.address}`);
        
        const GhntICO = await ethers.getContractFactory("ghntICO");
        ghntICO = await GhntICO.deploy(_main,ghnt.address,ratio,amount);
      
        await ghntICO.deployed();
        
        console.log(`Ghnt deployed to ${ghntICO.address}`);
        
        

        const VestingFactory = await ethers.getContractFactory("vestingFactory");
        vestingFactory = await VestingFactory.deploy(_main);
      
        await vestingFactory.deployed();
        
        console.log(`Ghnt deployed to ${vestingFactory.address}`);

        const balanceInEth = ethers.utils.formatEther(ethers.BigNumber.from("6000000000000000000000000000"))
        //        expect(balanceInEth.to.equal("6000000000"))

        expect(balanceInEth==("6000000000")
        );
		});
	it('Tests buy', async () => {
       // await expect(token.transfer(address, 0)).to.be.reverted;
       ghnt.transfer(ghntICO.address,3000)
       console.log(" balance of ghntICO :",await ghnt.balanceOf(ghntICO.address))
       console.log(" ghntICO.amount():",await ghntICO.amount())
       console.log(" ghntICO.ratio():",await ghntICO.ratio())

       
    await expect(await ghntICO.Buy({value:100})).to.emit(ghntICO, "Bought").withArgs(1000,await ghntICO.vested(wallets[0].address));
      // let _vested = await ghntICO.Buy({value:100})
      // console.log("_vested")
        //let vestingAddress=await ghntICO.Buy({value:100});
        console.log("ghntICO.vested[wallet] :",String(await ghntICO.vested(wallet)))
 
    })

    it('Tests vesting precentage', async () => {
        
        const GhntVesting = await ethers.getContractFactory("ghntVesting");
        let ghntVesting:any=await GhntVesting.attach(String(await ghntICO.vested(wallet)));
        console.log(" vesting month 6 precentage :" ,await ghntVesting.vesting(5)/1000)
    })

    /*
   // Manual testing of withdraw after changing contract for test:
    it('Tests withdraw', async () => {
        let beforeWithdraw=await ghnt.balanceOf(wallet)
        console.log("beforeWithdraw :",beforeWithdraw)
        await ghntICO.withdraw()
        let afterWithdraw=await ghnt.balanceOf(wallet)
        console.log("afterWithdraw :",afterWithdraw)
   
    })
*/

 // Production testing of withdraw including revert:
 it('Tests withdraw reverted', async () => {
    await expect(ghntICO.withdraw()).to.be.reverted;

})
    it('Tests vesting factory', async () => {
    ghnt.approve(vestingFactory.address,10000)
    let testVesting=await vestingFactory.vest(wallet,ghnt.address,1000,testschedule,testschedule.length)
    const GhntVesting = await ethers.getContractFactory("ghntVesting");
    let testVestingContract:any=await GhntVesting.attach(String(await vestingFactory.vested(wallet)));
    console.log("test vesting month 0 amount, ",await testVestingContract.vesting(0));
    })

})
		
	

