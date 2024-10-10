import React, { useState, useEffect } from "react";
import { LuSearch } from "react-icons/lu";
import { VscClose } from "react-icons/vsc";
import { IoCloseCircle } from "react-icons/io5";
import Options from "../constant";

const Modal = ({ isOpen, onClose, onTokenSelect, selectedToken }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(Options); // Show all by default

  // Function to clear input and reset filtered options
  const handleClear = () => {
    setInputValue("");
    setIsFocused(false);
    setFilteredOptions(Options); // Reset to show all options
  };

  // Function to handle input change and filter options based on head or desc
  const handleInputChange = (value) => {
    setInputValue(value);
    setIsFocused(true);

    // Filter options based on any part of the token name or description
    const filtered = value
      ? Options.filter(
          (option) =>
            option.head.toLowerCase().includes(value.toLowerCase()) ||
            option.desc.toLowerCase().includes(value.toLowerCase())
        )
      : Options; // Reset to show all options if input is empty

    setFilteredOptions(filtered);
  };

  const handleOptionClick = (option) => {
    onTokenSelect(option);
    setInputValue(""); // Clear input after selecting option
    setIsFocused(false);
    setFilteredOptions(Options); // Reset options
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-16 font-custom bg-white">
      <div className="bg-white rounded-lg relative border-b border-[#989898] w-[400px] h-full">
        <div className="flex items-center justify-between p-3 px-6 border-b-2 border-bor">
          <p className="text-left font-semibold text-[#0b0b0b]">Select token</p>
          <button
            className="text-[#989898] font-semibold text-2xl hover:text-black hover:bg-modem rounded-md"
            onClick={onClose}
          >
            <VscClose />
          </button>
        </div>
        <div>
          <div
            className={`group flex items-center bg-modem mx-6 mt-5 mb-4 
  ${
    isFocused || inputValue
      ? "border-black border-[1px] bg-white outline outline-gray-200"
      : "border-modem border-[2px] hover:border-bor hover:border-[2px]"
  }
  rounded-lg px-4 py-3 transition duration-300 hover:bg-white`}
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
              onChange={(e) => handleInputChange(e.target.value)}
            />
            {inputValue && (
              <IoCloseCircle
                className="text-gray-500 text-xs cursor-pointer ml-2 h-6 w-6 hover:text-black"
                onClick={handleClear}
              />
            )}
          </div>
          <div className="flex flex-col">
            {inputValue && filteredOptions.length === 0 && (
              <p className="text-center text-gray-500 py-2">No results found</p>
            )}
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className={`flex mx-3 px-3 gap-3 items-center rounded-md py-[10px] ${
                  option.head === selectedToken?.head
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
