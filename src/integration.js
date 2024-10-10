import Web3 from "web3";

import { ethers } from "ethers";

import abi from "./abi.json";

const isBrowser = () => typeof window !== "undefined";

const { ethereum } = isBrowser();

if (ethereum) {
  isBrowser().web3 = new Web3(ethereum);
  isBrowser().web3 = new Web3(isBrowser().web3.currentProvider);
}

const contract_address = "0x0FeB850B183C57534b56b7d56520133C8f9BDB65";

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
            gasLimit: 500000         }
          );
        
          await tx.wait();
        
          console.log("tx", tx);
          return tx;

        
 } catch (error) {
    console.log("erior",error);
 }
};