import React from 'react'
import okswal from '../../assets/images/okxwal.png'
import chrome from '../../assets/images/chrome.png'
import scan from '../../assets/images/scan.png'

const OkxWallet = ({ onClose, isConnected }) => {


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

      <div className="flex ">
        <button
          className="w-[100px] h-[90px] sm:w-[153px] sm:h-[118px] flex flex-col items-center border rounded-2xl justify-center hover:border-ph hover:border-2 cursor-pointer"
          onClick={handleConnectOKX}
        >
          <img src={okswal} alt="" className="sm:h-[48px] sm:w-[48px] h-[32px] w-[32px]" />
          <p className="text-[#3d3d3d] sm:text-[15px] font-medium leading-5 sm:mb-2 mt-1 text-center text-sm  font-four">
            OKX
          </p>
        </button>
      </div>
      {/* <WalletButton wallet="metamask" /> */}
      {/* <WalletButton wallet="okx" /> */}
    </div>
  );
};

export default OkxWallet
