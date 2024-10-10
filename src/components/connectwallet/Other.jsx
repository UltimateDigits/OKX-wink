import React from 'react'
import metamask from '../../assets/images/metamask.png';

const Other = ({onClose}) => {
  const handleConnectMetaMask = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // MetaMask is connected
        console.log('MetaMask is connected');
        onClose()
      } catch (error) {
        // Handle error
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      // MetaMask is not installed
      alert('Please install MetaMask to use this feature.');
    }
  };
  return (
    <div className="px-[32px] pt-6">
      <div
        className="w-[153px] h-[118px] flex flex-col items-center border rounded-2xl justify-center hover:border-ph hover:border-2 cursor-pointer"
        onClick={handleConnectMetaMask}
      >
        <img src={metamask} alt="" className="h-[48px] w-[48px]" />
        <p className="text-[#3d3d3d] text-[15px] font-medium leading-5 mb-2 mt-1 text-center font-four">
          MetaMask
        </p>
      </div>
    </div>
  );
}

export default Other
