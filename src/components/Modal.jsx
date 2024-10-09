import React, { useState } from "react";
import { LuSearch } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";
import Options from "../constant";

const Modal = ({ isOpen, onClose, onTokenSelect, selectedToken }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClear = () => {
    setInputValue("");
    setIsFocused(false);
  };

  if (!isOpen) return null;

  const handleOptionClick = (option) => {
    onTokenSelect(option); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-16 font-custom">
      <div className="bg-white rounded-lg relative border-b border-[#989898] w-[400px] h-full">
        <div className="flex items-center justify-between p-3 px-6 border-b-2 border-bor">
          <p className="text-left font-semibold text-[#0b0b0b]">Select token</p>
          <button
            className="text-[#989898] font-semibold text-2xl hover:text-black hover:bg-modem"
            onClick={onClose} 
          >
            <VscClose />
          </button>
        </div>
        <div>
          <div
            className={`group flex items-center bg-modem mx-6 mt-5 mb-4 border-2 border-modem ${
              isFocused || inputValue
                ? "border-blue-500 bg-white"
                : "hover:border-bor hover:border-2"
            } rounded-lg px-4 py-3 transition duration-300 hover:bg-white`}
          >
            <LuSearch className="text-gray-400 mr-4 text-xl" />
            <input
              type="text"
              placeholder="Search by token name or address"
              className={`outline-none border-none w-full font-light bg-modem text-[14px] transition duration-300 ${
                isFocused || inputValue
                  ? "text-black bg-white"
                  : "bg-modem text-gray-500 group-hover:bg-white group-hover:text-black"
              }`}
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setInputValue(e.target.value)}
            />
            {inputValue && (
              <MdCancel
                className="text-gray-400 text-xl cursor-pointer ml-2"
                onClick={handleClear}
              />
            )}
          </div>
          <div className="flex flex-col">
            {Options.map((option) => (
              <div
                key={option.id}
                className={`flex mx-6 gap-3 items-center py-[10px] ${
                  option.head === selectedToken.head
                    ? "bg-modem"
                    : "hover:bg-modem"
                }`}
                onClick={() => handleOptionClick(option)} 
              >
                <img src={option.image} alt="" className="h-[30px] w-[30px]" />
                <div className="leading-5">
                  <p className="text-left">{option.head}</p>
                  <p className="text-[12px] text-left text-[#989898]">
                    {option.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
