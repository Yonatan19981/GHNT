import { expect } from 'chai'
import { ethers } from 'hardhat';

let gnht
let gnhtICO:any;
let  wallets:any;
describe('Futurize',() => {
	

	before(async function () {
        wallets = await ethers.getSigners();

        let _main="0x87993e7a89A824D05dC5DCC8c6885A8412C525AB";
        let ratio=10;
        let amount=1;
      
        const Ghnt = await ethers.getContractFactory("GHNT");
        gnht = await Ghnt.deploy(_main);
      
        await gnht.deployed();
      
        console.log(`Ghnt deployed to ${gnht.address}`);
        
        const GhntICO = await ethers.getContractFactory("ghntICO");
        gnhtICO = await GhntICO.deploy(_main,gnht.address,ratio,amount);
      
        await gnhtICO.deployed();
      
        console.log(`Ghnt deployed to ${gnhtICO.address}`);

		var FuturizeInterest = await hre.ethers.getContractFactory("FuturizeInterest");
		futurizeInterest = await FuturizeInterest.deploy();
	
		console.log("FuturizeInterest deployed to:", futurizeInterest.address);
		var FuturizeV1Factory = await hre.ethers.getContractFactory("FuturizeV1Factory");
		futurizeV1Factory = await FuturizeV1Factory.deploy();
	
		console.log("FuturizeV1Factory deployed to:", futurizeV1Factory.address);

		var FuturizeV1Router = await hre.ethers.getContractFactory("FuturizeV1Router");
		futurizeV1Router = await FuturizeV1Router.deploy(WETHaddress,futurizeV1Factory.address,futurizeInterest.address);
	
		console.log("FuturizeV1Router deployed to:", futurizeV1Router.address);
		await futurizeV1Factory.setRouter(futurizeV1Router.address);
		const UniswapV3SwapHelper = await hre.ethers.getContractFactory("UniswapV3SwapHelper");
		uniswapV3SwapHelper = await UniswapV3SwapHelper.deploy();
	
		console.log("UniswapV3SwapHelper deployed to:", uniswapV3SwapHelper.address);


		uniswapFactory = new ethers.Contract(
			uniSwapV3Factory,
			IUniswapV3Factory,
			wallets[0]
		);

		WETHTOKENApoolContract = new ethers.Contract(
			await uniswapFactory.getPool(WETHaddress,TOKENAaddress,3000),
			IUniswapV3PoolABI,
			wallets[0]
		);

		const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";

	const quoterContract = new ethers.Contract(quoterAddress, QuoterABI, wallets[0]);

		
		WETH=new hre.ethers.Contract(WETHaddress,WETHabi,wallets[0]);
		TOKENA=new hre.ethers.Contract(TOKENAaddress,ERC20abi,wallets[0]);
		TOKENB=new hre.ethers.Contract(TOKENBaddress,ERC20abi,wallets[0]);
		await WETH.deposit({value:ethers.utils.parseEther("10000000000000000.0")});
		console.log("buys TOKENA to the test wallet");
		await WETH.approve(uniswapV3SwapHelper.address,ethers.utils.parseEther("1000.0"))    
		await WETH.transferFrom(wallets[0].address,uniswapV3SwapHelper.address,ethers.utils.parseEther("1000.0"));
		var amountin=await uniswapV3SwapHelper.swapExactIn(uniSwapV3SwapRouter,3000,WETHaddress,TOKENAaddress,ethers.utils.parseEther("1000.0"),10000,wallets[0].address);
		console.log("buys TOKENB to the test wallet");
		await WETH.approve(uniswapV3SwapHelper.address,ethers.utils.parseEther("1000.0"))    
		await WETH.transferFrom(wallets[0].address,uniswapV3SwapHelper.address,ethers.utils.parseEther("1000.0"));
		var amountin=await uniswapV3SwapHelper.swapExactIn(uniSwapV3SwapRouter,3000,WETHaddress,TOKENBaddress,ethers.utils.parseEther("1000.0"),10000,wallets[0].address);
		console.log("buys TOKENA to the test wallet");
		await WETH.approve(uniswapV3SwapHelper.address,ethers.utils.parseEther("1000.0"))    
		var amountin=await uniswapV3SwapHelper.swapExactIn(uniSwapV3SwapRouter,3000,WETHaddress,TOKENAaddress,ethers.utils.parseEther("1000.0"),10000,wallets[0].address);
	});
	it('Tests', async () => {
		
		console.log("test add liquidity");
		var amount1=await TOKENA.balanceOf(wallets[0].address);
		var amount2=await TOKENB.balanceOf(wallets[0].address);
		var deadline=await (await ethers.provider.getBlock(await ethers.provider.getBlockNumber())).timestamp+10000;
		await TOKENA.approve(futurizeV1Router.address,amount1)    
		await TOKENB.approve(futurizeV1Router.address,amount2)    
		await futurizeV1Router.addLiquidity(TOKENA.address,TOKENB.address,amount1.div(10),amount2.div(10),0,0,wallets[0].address,deadline); 
		const FuturizeV1Pair = await hre.ethers.getContractFactory("FuturizeV1Pair");
		var pairAddress=await futurizeV1Factory.getPair(TOKENB.address,TOKENA.address);
		var PAIR = await FuturizeV1Pair.attach(pairAddress);
		await futurizeV1Router.addLiquidity(TOKENA.address,TOKENB.address,amount1.div(10),amount2.div(10),0,0,wallets[0].address,deadline); 
		var liquidityAmount=await PAIR.balanceOf(wallets[0].address);
		console.log("success");

		console.log("test open position");
		await TOKENA.approve(futurizeV1Router.address,amount1) 
		await futurizeV1Router.openPos(TOKENA.address,TOKENB.address,amount1.div(10000),0,wallets[0].address,0,10);
		var amount1=await TOKENA.balanceOf(wallets[0].address);
		var amount2=await TOKENB.balanceOf(wallets[0].address);
		console.log("success");

		console.log("test remove + add liquidity");
		await PAIR.approve(futurizeV1Router.address,liquidityAmount)  
		await futurizeV1Router.removeLiquidity(TOKENA.address,TOKENB.address,liquidityAmount,0,0,wallets[0].address,deadline); 
		var amount1=await TOKENA.balanceOf(wallets[0].address);
		var amount2=await TOKENB.balanceOf(wallets[0].address);
		await futurizeV1Router.addLiquidity(TOKENA.address,TOKENB.address,amount1.div(10),amount2.div(10),0,0,wallets[0].address,deadline); 
		var liquidityAmount=await PAIR.balanceOf(wallets[0].address);
		console.log("success");

		console.log("test trying to close at a loss");
		await TOKENA.approve(futurizeV1Router.address,amount1) 
		await futurizeV1Router.openPos(TOKENA.address,TOKENB.address,amount1.div(100000000),0,wallets[0].address,0,1000);
		var amount1=await TOKENA.balanceOf(wallets[0].address);
		var amount2=await TOKENB.balanceOf(wallets[0].address);

		try {
			await PAIR.close(wallets[0].address,await PAIR.getPosition(wallets[0].address),0);

		} catch (error) {
			console.log("---position is at a loss which it should be---");
		}
		console.log("success");

		console.log("test add colleteral , try to liquidate, fail because of more colleteral and close");
		await TOKENA.approve(futurizeV1Router.address,amount1) 
		await futurizeV1Router.addPositionColleteral(wallets[0].address,await PAIR.getPosition(wallets[0].address),TOKENA.address,TOKENB.address,amount1.div(10000));
		try {
			await futurizeV1Router.liquidatePosition(wallets[0].address,await PAIR.getPosition(wallets[0].address),TOKENA.address, TOKENB.address,0,3000);

		} catch (error) {
			console.log("---tried to liquidate did not succeed because colleteral was added---");
		}
		await PAIR.close(wallets[0].address,await PAIR.getPosition(wallets[0].address),0);
		console.log("success");


		console.log("test liquidate at a loss and success of liquidate");
		await TOKENA.approve(futurizeV1Router.address,amount1) 
		await futurizeV1Router.openPos(TOKENA.address,TOKENB.address,amount1.div(100000000),0,wallets[0].address,0,1000);
		var amount1=await TOKENA.balanceOf(wallets[0].address);
		var amount2=await TOKENB.balanceOf(wallets[0].address);

		try {
			await PAIR.close(wallets[0].address,await PAIR.getPosition(wallets[0].address),0);

		} catch (error) {
			console.log("---position is at a loss which it should be. now it will liquidate---");
		}
		await futurizeV1Router.liquidatePosition(wallets[0].address,await PAIR.getPosition(wallets[0].address),TOKENA.address, TOKENB.address,0,3000);
		})
		console.log("success");

	
/*
	it('createPair:gas', async () => {
		const { factory } = await loadFixture(fixture)
		const tx = await factory.createPair(...TEST_ADDRESSES)
		const receipt = await tx.wait()
		expect(receipt.gasUsed).to.lte('331989') // previously was 2391560
	})
	*/
})
