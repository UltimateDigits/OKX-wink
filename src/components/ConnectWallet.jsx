import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import OkxWallet from "./connectwallet/OkxWallet";
import Other from "./connectwallet/Other";

const ConnectWallet = ({ isOpen, onClose,isConnected }) => {
  const [activeTab, setActiveTab] = useState("okx"); 
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-2 sm:py-5 ">
      <div className="bg-white relative border-b border-[#989898] w-full m-3 sm:w-[500px] h-full rounded-3xl ">
        <div className="pt-[30px] sm:pt-[43px] pr-[25px] sm:pr-[32px] pb-[27px] sm:pb-[37px] pl-[25px] sm:pl-[32px]">
          <h2 className="text-[20px] sm:text-[32px] font-bold leading-[132%] mb-2 text-left font-one">
            Connect Wallet
          </h2>
          <p className="text-[#a8a8a8] text-sm sm:text-base leading-5 text-left font-two">
            Securely start your Web3 journey
          </p>
        </div>
        <button
          className="text-[#989898] font-semibold text-2xl hover:text-black hover:bg-modem absolute right-5 top-5 rounded-md"
          onClick={onClose}
        >
          <VscClose size={24} />
        </button>

        <div className="flex mx-[32px] border-b-2 border-bor">
          <div
            className={`text-base sm:text-lg font-normal leading-5 px-6 pb-3 cursor-pointer font-four ${
              activeTab === "okx"
                ? "text-black border-b-2 border-black"
                : "text-[#989898]"
            }`}
            onClick={() => setActiveTab("okx")}
          >
            OKX Wallet
          </div>
          <div
            className={`text-base sm:text-lg font-normal font-four leading-5 px-6 pb-3 cursor-pointer ${
              activeTab === "other"
                ? "text-black border-b-2 border-black"
                : "text-[#989898]"
            }`}
            onClick={() => setActiveTab("other")}
          >
            Other
          </div>
        </div>

        {activeTab === "okx" ? (
          <OkxWallet onClose={onClose} isConnected={isConnected} />
        ) : (
          <Other onClose={onClose} isConnected={isConnected} />
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
