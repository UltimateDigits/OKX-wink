import React, { useState } from "react";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";
import okxinput from "../assets/images/okxinput.png";
import Modal from "./Modal";
import ConnectWallet from "./ConnectWallet";
import Exchange from "./Exchange";
import herologo from "../assets/images/herologo.png";

const Hero = () => {
  const [isEthereum, setIsEthereum] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    image: okxinput,
    head: "OKB",
    desc: "OKB Token",
  });
  const [inputValue, setInputValue] = useState("");

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
    setIsWalletModalOpen(true);
  };

  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleTokenSelect = (token) => {
    setSelectedToken(token);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    let { value } = e.target;

    // Allow only digits and one decimal point
    const sanitizedValue = value.replace(/[^0-9.]/g, "");

    // If the input is completely empty, set the value to an empty string
    if (sanitizedValue === "") {
      setInputValue("");
      return;
    }

    // Split the value into integer and decimal parts
    const parts = sanitizedValue.split(".");

    // Prevent more than one decimal point
    if (parts.length > 2) {
      return;
    }

    // Remove leading zeros unless the input is "0" or a decimal like "0.xx"
    if (parts[0].length > 1 && parts[0][0] === "0" && !parts[1]) {
      parts[0] = parts[0].replace(/^0+/, "");
    }

    // Check if the decimal part exceeds 6 digits
    if (parts[1] && parts[1].length > 6) {
      return;
    }

    // Format the integer part with thousand separators
    const integerPart =
      parts[0] === "" ? "" : parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Handle the case where the user types only a decimal point, like "0."
    const decimalPart = parts[1] === undefined ? "" : `.${parts[1]}`;

    // Combine the formatted integer part and the decimal part
    const formattedValue = integerPart + decimalPart;

    // Update the state with the formatted value
    setInputValue(formattedValue);
  };





  return (
    <div>
      <img
        src={herologo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[37px] w-[87px] mx-auto mb-4"
      />

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
            value={inputValue}
            onChange={handleInputChange}
            className="bg-empty flex-1 text-[36px] overflow-hidden pr-1.5 truncate w-full font-bold border-none p-2 focus:outline-none focus:ring-0 input-caret"
          />
          <button
            className="ml-2 bg-white rounded-md pl-2 py-2 text-black flex items-center px-1"
            onClick={handleOpenModal}
          >
            <img
              src={selectedToken.image}
              alt=""
              className="h-[20px] w-[20px]"
            />
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
          onClick={handleOpenWalletModal}
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
    </div>
  );
};

export default Hero;
