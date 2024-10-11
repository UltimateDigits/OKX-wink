import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";

import tokenAbi from "./tokenabi.json";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const contract_address = "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe";

export const Bridge = async (amount, destinationNetwork, destinationAddress, amountinWei, tokenAddress, forceUpdate, permitData) => {

    console.log("amount",amount,"destinationNetwork", destinationNetwork,"destinationAddress", destinationAddress, "amountinWei",amountinWei, "tokenAddress",tokenAddress, "forceUpdate",forceUpdate, "permitData",permitData);
  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

 try {
    const tx = await contract.bridgeAsset(
        destinationNetwork, destinationAddress, amountinWei, tokenAddress, forceUpdate, permitData,{
            value:amountinWei,
            gasLimit: 250000         }
          );
        
          await tx.wait();
        
          console.log("tx", tx);
          return tx;

        
 } catch (error) {
    console.log("erior",error);
 }
};
export const GetGas = async () => {

  // provider
  const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(contract_address, abi, signer);

  console.log("contract", contract);

 try {
  const gasPrice = await provider.getGasPrice();
  console.log("Gas price (in wei):", gasPrice.toString());

  // Define gas limit
  const gasLimit = 250000;

  // Calculate network fee
  const networkFee = gasPrice.mul(gasLimit);  // gasPrice * gasLimit
  console.log("Estimated network fee (in wei):", networkFee.toString());

          return ethers.utils.formatEther(networkFee);

        
 } catch (error) {
    console.log("erior",error);
 }
};
export const GetBalance = async (address, tokenAddress,eth) => {

  console.log("Addres",address,"tokenAddress",tokenAddress)
  // provider
  if(eth){
    const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  console.log("contract", contract);

  const balance = await contract.balanceOf(address);

  return balance.toString();

  }
  else{
    const provider =
    window.ethereum != null
      ? new ethers.providers.Web3Provider(window.ethereum)
      : ethers.providers.getDefaultProvider();
  console.log("provider", provider);

  //signer

  const signer = provider.getSigner();

  console.log("signer", signer);
  // contract instance

  const contract = new ethers.Contract(tokenAddress, tokenAbi, signer);

  console.log("contract", contract);
  const balance = await contract.balanceOf(address);

  return balance.toString();

  }


};