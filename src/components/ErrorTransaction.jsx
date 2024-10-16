import React from 'react'
import { MdCancel } from "react-icons/md";

const ErrorTransaction = () => {
  return (
    <div>
      <div className="success-message flex flex-col items-center text-center bg-white p-10">
        <MdCancel className="success-icon text-red-700 text-5xl sm:text-8xl mb-6 sm:mb-10" />
        <h2 className=" font-semibold text-[#333] font-two text-base sm:text-lg">
          Something Went Wrong
        </h2>
      </div>
    </div>
  );
}

export default ErrorTransaction
