import React from "react";
import { FaCheckCircle } from "react-icons/fa";


const Successfull = () => {
  return (
    <div>
      <div className="success-message flex flex-col items-center text-center bg-white p-10">
        <FaCheckCircle className="success-icon text-green-500 text-8xl mb-10" />
        <h2 className=" font-semibold text-[#333] font-two text-lg">
          Transaction Successful!
        </h2>
      </div>
    </div>
  );
};

export default Successfull;
