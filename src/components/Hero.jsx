import React, { useState } from "react";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";
import { HiSwitchHorizontal } from "react-icons/hi";
import okxinput from "../assets/images/okxinput.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import Modal from "./Modal";
import ConnectWallet from "./ConnectWallet"; 
import Exchange from "./Exchange";

const Hero = () => {
  const [isEthereum, setIsEthereum] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false); // State for wallet modal
  const [selectedToken, setSelectedToken] = useState({
    image: okxinput,
    head: "OKB",
    desc: "OKB Token",
  });

  const handleSwap = () => {
    setIsEthereum((prev) => !prev);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenWalletModal = () => {
    setIsWalletModalOpen(true); // Open the wallet modal
  };

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false); // Close the wallet modal
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    handleCloseModal();
  };

  return (
    <div className="border border-bor rounded-lg shadow-md px-7 py-8 w-[496px] bg-white">
      <h1 className="font-bold text-2xl leading-8 text-left">Bridge</h1>
      <div className="flex gap-2 items-center mt-5">
        <div className="bg-[#f7f7f7] rounded-md p-[18px] px-[14px] w-1/2 flex items-center gap-2">
          <img
            src={isEthereum ? ethhero : okxhero}
            alt=""
            className="h-[20px] w-[20px]"
          />
          <p className="font-bold text-base leading-5">
            {isEthereum ? "Ethereum" : "X Layer"}
          </p>
        </div>
        <button
          className="border border-bor rounded-[20px] text-[20px] p-1 bg-white h-fit"
          onClick={handleSwap}
        >
          <Exchange />
        </button>
        <div className="bg-[#f7f7f7] rounded-md p-[18px] px-[14px] w-1/2 flex items-center gap-2">
          <img
            src={isEthereum ? okxhero : ethhero}
            alt=""
            className="h-[20px] w-[20px]"
          />
          <p className="font-bold text-base leading-5">
            {isEthereum ? "X Layer" : "Ethereum"}
          </p>
        </div>
      </div>

      <div className="bg-empty rounded-[8px] mt-5 p-3 px-[16px] flex items-center">
        <input
          type="text"
          placeholder="0.00"
          className="bg-empty flex-1 text-[36px] overflow-hidden pr-1.5 truncate w-full font-bold border-none p-2 focus:outline-none focus:ring-0 input-caret"
        />
        <button
          className="ml-2 bg-white rounded-md pl-2 py-2 text-black flex items-center px-1"
          onClick={handleOpenModal}
        >
          <img src={selectedToken.image} alt="" className="h-[20px] w-[20px]" />
          <p className="pl-1">{selectedToken.head}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
          >
            <path fill="none" stroke="black" d="M4.5 6L8 9.5L11.5 6" />
          </svg>
        </button>
      </div>
      <button
        className="bg-black text-white font-bold w-full rounded-full py-4 text-lg mt-5 hover:text-ph"
        onClick={handleOpenWalletModal} // Open wallet modal on button click
      >
        Connect wallet
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onTokenSelect={handleTokenSelect}
        selectedToken={selectedToken}
      />

      <ConnectWallet
        isOpen={isWalletModalOpen}
        onClose={handleCloseWalletModal}
      />
    </div>
  );
};

export default Hero;
