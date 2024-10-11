import React from 'react'
import metamask from '../../assets/images/metamask.png';
import { WalletButton } from '@rainbow-me/rainbowkit';
// import {  } from '@rainbow-me/rainbowkit';

const Other = ({onClose,isConnected}) => {
  // const handleConnectMetaMask = async () => {
  //   // Check if the Ethereum provider is available
  //   if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
  //     try {
  //       // Request account access for MetaMask
  //       await window.ethereum.request({ method: 'eth_requestAccounts' });
  //       // MetaMask is connected
  //       console.log('MetaMask is connected');
  //       isConnected(true);
  //       onClose();
  //     } catch (error) {
  //       // Handle connection error
  //       console.error('Error connecting to MetaMask:', error);
  //     }
  //   } else if (typeof window.ethereum !== 'undefined' && !window.ethereum.isMetaMask) {
  //     // Ethereum provider is available but it's not MetaMask
  //     alert('Please use MetaMask to connect.');
  //   } else {
  //     // No Ethereum provider (MetaMask or other wallets) is installed
  //     alert('Please install MetaMask to use this feature.');
  //   }
  // };
  
  
  const handleConnectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask is connected');
        isConnected(true); // Set the connection status
        onClose(); // Close the modal
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
    }
  };

  // OKX Wallet connection function
  const handleConnectOKX = async () => {
    if (typeof window.okxwallet !== 'undefined') { // Ensure OKX wallet has a distinct provider
      try {
        await window.okxwallet.request({ method: 'eth_requestAccounts' });
        console.log('OKX Wallet is connected');
        isConnected(true); // Set the connection status
        onClose(); // Close the modal
      } catch (error) {
        console.error('Error connecting to OKX Wallet:', error);
      }
    } else if (typeof window.ethereum !== 'undefined' && !window.ethereum.isMetaMask) {
      // If OKX overrides window.ethereum
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('OKX Wallet is connected');
        isConnected(true); // Set the connection status
        onClose(); // Close the modal
      } catch (error) {
        console.error('Error connecting to OKX Wallet via window.ethereum:', error);
      }
    } else {
      alert('OKX Wallet is not installed. Please install OKX Wallet to use this feature.');
    }
  };


  return (
    <div className="px-[32px] pt-6">
      {/* <div
        className="w-[153px] h-[118px] flex flex-col items-center border rounded-2xl justify-center hover:border-ph hover:border-2 cursor-pointer"
        onClick={handleConnectMetaMask}
      >
        <img src={metamask} alt="" className="h-[48px] w-[48px]" />
        <p className="text-[#3d3d3d] text-[15px] font-medium leading-5 mb-2 mt-1 text-center font-four">
          MetaMask
        </p>
      </div> */}

      <div className='flex justify-between'>
        <button onClick={handleConnectMetaMask}>Metamask</button>
        <button onClick={handleConnectOKX}>OKX</button>
      </div>
      {/* <WalletButton wallet="metamask" /> */}
      {/* <WalletButton wallet="okx" /> */}

    </div>
  );
}

export default Other
