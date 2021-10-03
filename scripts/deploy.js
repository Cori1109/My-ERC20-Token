// We require the Hardhat Runtime Environment explicitly here. This is optional 
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // console.log(
  //   "Deploying contracts with the account:",
  //   deployer.address
  // );
  
  // const Token = await hre.ethers.getContractFactory("Token");
  // const token = await Token.deploy();
  
  // // await greeter.deployed();
  // await token.deployed();

  // // console.log("Greeter deployed to:", greeter.address);
  // console.log("Token deployed to:", token.address);

  const PPToken = await hre.ethers.getContractFactory("PPToken");
  const ppToken = await PPToken.deploy("PPT", "PPT", 5000);
  
  await ppToken.deployed();

  console.log("PPToken deployed to:", ppToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
