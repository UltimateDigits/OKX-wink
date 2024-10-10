import React from "react";
import { PiApproximateEqualsBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";

const ConfirmTransaction = ({ onClose }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-5 ">
        <div className="bg-white relative border-b border-[#989898] w-[400px]  rounded-md p-5">
          <h1 className="font-bold text-base leading-5 font-one text-left">
            Confirm transaction
          </h1>

          <div className="flex justify-between items-center border-2 border-bor rounded-lg px-3 py-4 mt-5">
            <div className="flex gap-2">
              <img src={ethhero} alt="" className="h-[20px] w-[20px]" />
              <p className="font-bold text-base leading-5 font-one">
                {"Ethereum"}
              </p>
            </div>
            <FaArrowRight className="text-[#989898]" />
            <div className="flex gap-2">
              <img src={okxhero} alt="" className="h-[20px] w-[20px]" />
              <p className="font-bold text-base leading-5 font-one">
                {"X Layer"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between bg-empty rounded-lg p-4 mt-4">
            <div className="flex gap-3 items-center">
              <img src={ethhero} alt="" className="h-[30px] w-[30px]" />
              <p className="font-bold text-lg leading-5 font-one">{"ETH"}</p>
            </div>
            <div>
              <h1 className="font-bold text-xl leading-5 font-one text-right">
                0.0000001
              </h1>
              <p className="text-right text-[#989898] font-two">$0.02</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7">
            <p className="text-left text-[#989898] font-two  font-medium text-sm">
              Ethereum network fee
            </p>
            <div className="flex items-center gap-1">
              <p className="text-right  font-two text-sm">0.00214 ETH</p>
              <PiApproximateEqualsBold className="text-[12px] text-[#989898]" />
              <p className="text-right text-[#989898] font-two text-sm">
                $5.03
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-1">
            <p className="text-left text-[#989898] font-two  font-medium text-sm">
              Est arrival time
            </p>
            <p className="text-right  font-two text-sm">15 minutes</p>
          </div>

          <div className="mt-7 flex justify-between items-center gap-4">
            <button
              onClick={onClose} // Call the onClose function to close the modal
              className="bg-[#F5F5F5] hover:bg-black text-black font-bold py-2 w-full border border-black hover:text-white rounded-full"
            >
              Cancel
            </button>

            <button className="bg-black hover:bg-white text-white hover:text-black font-bold py-2 w-full border border-black rounded-full">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
