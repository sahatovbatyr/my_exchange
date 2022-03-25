require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// for mint run this  :
// npx hardhat mint --tokentype "atoken" --receiver "0x70997970c51812dc3a010c7d01b50e0d17dc79c8" --amount 100 --network localhost
// in B-token we mint 200 BTK to Converter.ADDRESS (in my case address 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0 , took from console)
// npx hardhat mint --tokentype "btoken" --receiver "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0" --amount 200 --network localhost

task("mint", "To mint token to receiver address", async (taskArgs, hre) => {
  
  const BaseToken = await hre.ethers.getContractFactory('BaseToken');
  
  if (taskArgs.tokentype === "atoken" || taskArgs.tokentype === "btoken") {
    const a_token_addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const b_token_addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const tokenAddr = (taskArgs.tokentype == "atoken" ) ? a_token_addr : b_token_addr ;
    const receiver = await taskArgs.receiver;
    
    //amount in wei
    const amount = taskArgs.amount;
    
    //amount in Ether
    const amountEther =  hre.ethers.utils.parseEther(amount.toString());

    const token = await BaseToken.attach(tokenAddr);
    await token.mint(receiver, amountEther);
  } 

} )
.addParam("tokentype", "atoken OR btoken" )
.addParam("receiver", "set receiver address")
.addParam("amount", "amount to mint");





task("balances", "To print account's balances", async (taskArgs, hre) => {

  let accounts = await hre.ethers.getSigners(); 
  let [acc0, acc1, acc2, acc3, acc4] = await hre.ethers.getSigners();   
  const BaseToken = await hre.ethers.getContractFactory('BaseToken');   

  if (taskArgs.tokentype === "atoken" || taskArgs.tokentype === "btoken") {
    const a_token_addr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const b_token_addr = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

    const tokenAddr = ( (taskArgs.tokentype == "atoken" ) ? a_token_addr : b_token_addr );
    console.log("TOKEN tokenAddr= " , tokenAddr );
    
    
    const token = await BaseToken.attach(tokenAddr);   
    const contrOwnBalance = await token.balanceOf( tokenAddr);

    console.log("BALANCE INFO: Token name: ", await token.name() );
    console.log("CONTRACT's ADDRESS BALANCE= " , contrOwnBalance.toString() );

    acc3.address = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    acc4.address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    accounts.push(acc3);
    accounts.push(acc4);

    for (const account of accounts) {
      let balance = await token.balanceOf(account.address);
      if (  balance.toString() === "0" ) { continue; }

      //using ethers.utils.formatEther( balance) to print Balance on Ether
      //otherwise balance is represented on Wei      
      console.log("account= %s , balance=%s", account.address, hre.ethers.utils.formatEther( balance));

     
    }
    
  }

} )
.addParam("tokentype", "atoken OR btoken" );




task( "swap", "To swap A-TOKEN to another B-TOKEN", async(taskArgs, hre) => { 

  const [deployer, acc1, acc2, acc3, acc4, ...lastAcc] = await hre.ethers.getSigners();
  const BaseToken = await hre.ethers.getContractFactory('BaseToken');  
  const TokenConverter = await hre.ethers.getContractFactory('TokenConverter');


  const token1Address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";  
  const token2Address = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const convertTokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"; 

  

  const token1 = await BaseToken.attach(token1Address);
  const converter = await TokenConverter.attach(convertTokenAddress);

  // In token1, acc1 gives the right to transfer tokens to convertTokenAddress
  // now convertTokenAddress can send the tokens to anyone he wants
  const succesed1= await token1.connect(acc1).approve(convertTokenAddress, hre.ethers.utils.parseEther('20'));
  if (!succesed1) { "succesed1=false"; return;}

  let a = await token1.allowance(acc1.address, convertTokenAddress);

  const allow1 = hre.ethers.utils.formatEther( a);
  console.log("alowed[acc1][owner2Address]=", allow1); 

  await converter.setFirstTokenPrice(2);


  const amountEther  = hre.ethers.utils.parseEther('4');

  const succesed3 = await converter.connect(acc1).convertFirstTokenToSecond(  amountEther  );

  if (!succesed3) { "succesed3=false"; return;}


})








// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

  networks:{

    localhost: {
      url:"http://127.0.0.1:8545",
      chainId:31337


    }

  }
};
