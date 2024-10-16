import React, { useState, useEffect } from "react";
import { PiApproximateEqualsBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";
import { Bridge } from "../integration";
import { ethers } from "ethers";
import Successfull from "./Successfull";
import ErrorTransaction from "./ErrorTransaction"; 

const ConfirmTransaction = ({
  onClose,
  isEthereum,
  value,
  networkFee,
  inDollor,
  tokenAddress,
  account,
  resetInput,
}) => {
  const [confirm, setConfirm] = useState(false);
  const [transactionError, setTransactionError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); 

  const handleTransaction = async () => {
    setIsProcessing(true); 
    try {
      const destinationChain = isEthereum ? 3 : 1;
      const destAdress = isEthereum
        ? tokenAddress.ETHaddress
        : tokenAddress.Xaddress;
      const amountInWei = ethers.utils.parseEther(value.toString());

      const res = await Bridge(
        value,
        destinationChain,
        account,
        amountInWei.toString(),
        destAdress,
        true,
        "0x"
      );

      if (res ) {
        setConfirm(true);
        resetInput();
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setTransactionError(true);
      }
    } catch (error) {
      console.log("error", error);
      setTransactionError(true);
    } finally {
      setIsProcessing(false); 
    }
  };

  
  useEffect(() => {
    if (transactionError) {
      setTimeout(() => {
        onClose();
        resetInput();
      }, 2000); 
    }
  }, [transactionError, onClose, resetInput]);

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 py-5">
        <div className="bg-white relative border-b border-[#989898] w-[400px] rounded-md p-5">
          {confirm ? (
            <Successfull />
          ) : transactionError ? (
            <ErrorTransaction />
          ) : (
            <div>
              <h1 className="font-bold text-base leading-5 font-one text-left">
                Confirm transaction
              </h1>

              <div className="flex justify-between items-center border-2 border-bor rounded-lg px-3 py-4 mt-5">
                <div className="flex gap-2">
                  <img
                    src={isEthereum ? ethhero : okxhero}
                    alt=""
                    className="h-[20px] w-[20px]"
                  />
                  <p className="font-bold text-base leading-5 font-one">
                    {isEthereum ? "Ethereum" : "X Layer"}
                  </p>
                </div>
                <FaArrowRight className="text-[#989898]" />
                <div className="flex gap-2">
                  <img
                    src={!isEthereum ? ethhero : okxhero}
                    alt=""
                    className="h-[20px] w-[20px]"
                  />
                  <p className="font-bold text-base leading-5 font-one">
                    {!isEthereum ? "Ethereum" : "X Layer"}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between bg-empty rounded-lg p-4 mt-4">
                <div className="flex gap-3 items-center">
                  <img
                    src={tokenAddress.image}
                    alt=""
                    className="h-[30px] w-[30px]"
                  />
                  <p className="font-bold text-lg leading-5 font-one">
                    {tokenAddress.head}
                  </p>
                </div>
                <div>
                  <h1 className="font-bold text-xl leading-5 font-one text-right">
                    {value}
                  </h1>
                  {/* <p className="text-right text-[#989898] font-two">$0.02</p> */}
                </div>
              </div>

              <div className="flex justify-between items-center mt-7">
                <p className="text-left text-[#989898] font-two font-medium text-sm">
                  Ethereum network fee
                </p>
                <div className="flex items-center gap-1">
                  <p className="text-right font-two text-sm">
                    {networkFee} ETH
                  </p>
                  <PiApproximateEqualsBold className="text-[12px] text-[#989898]" />
                  <p className="text-right text-[#989898] font-two text-sm">
                    ${inDollor}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-1">
                <p className="text-left text-[#989898] font-two font-medium text-sm">
                  Est arrival time
                </p>
                <p className="text-right font-two text-sm">15 minutes</p>
              </div>

              <div className="mt-7 flex justify-between items-center gap-4">
                <button
                  onClick={onClose}
                  className="bg-[#F5F5F5] hover:bg-black text-black font-bold py-2 w-full border border-black hover:text-white rounded-full"
                >
                  Cancel
                </button>

                <button
                  className="bg-black hover:bg-white text-white hover:text-black font-bold py-2 w-full border border-black rounded-full"
                  onClick={handleTransaction}
                  disabled={isProcessing} 
                >
                  {isProcessing ? "Processing..." : "Confirm"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransaction;
