
const hre = require("hardhat");

async function main() {

  const [deployer, acc1, acc2] =  await hre.ethers.getSigners();
  
  // We get the contract to deploy 
  const Token1 = await hre.ethers.getContractFactory("BaseToken");
  const token1 = await Token1.deploy("A-TOKEN", "ATK");
  await token1.deployed();

  console.log("Token1 contract deployed. address: ", token1.address);

  const Token2 = await hre.ethers.getContractFactory("BaseToken");
  const token2 = await Token2.deploy("B-TOKEN", "BTK");
  await token2.deployed();

  console.log("Token2 contract deployed. address: ", token2.address);


  const Converter = await hre.ethers.getContractFactory("TokenConverter");
  const converter = await Converter.deploy(token1.address, token2.address);
  await converter.deployed();

  console.log("Converter contract deployed. address: ", converter.address);



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
