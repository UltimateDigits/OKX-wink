import React from 'react'
import okswal from '../../assets/images/okxwal.png'
import chrome from '../../assets/images/chrome.png'
import scan from '../../assets/images/scan.png'

const OkxWallet = () => {
  return (
    <div className="pt-0 px-[32px] pb-[16px]">
      <div className="bg-[#f9f9f9] rounded-[12px] flex justify-between mt-[24px] p-[14px] pl-[22px]">
        <div className="flex gap-3 bg-modem rounded-md">
          <img src={okswal} alt="" className="h-[35px] w-[35px]" />
          <div className="text-left ml-[16px]">
            <p className="text-[18px] font-medium leading-[24px] ">OKX app</p>
            <p className="text-[#909090] text-[14px] leading-[16px] mb-[52px] mt-[8px]">
              Scan QR code to connect your wallet
            </p>
            <p className="text-[#a8a8a8] text-[13px]">
              Not installed yet? <span className="text-black ">Download</span>
            </p>
          </div>
        </div>

        <img src={scan} alt="" className="h-[106px] w-[106px]" />
      </div>

      <div className="bg-[#f9f9f9] rounded-[12px] flex justify-between mt-[24px] p-[14px] pl-[22px]">
        <div className="flex gap-3 bg-modem rounded-md items-center">
          <div className='relative'>
            <img src={okswal} alt="" className="h-[35px] w-[35px] relative" />
            <img src={chrome} alt="" className=" absolute h-[25px] w-[25px] -right-2 -bottom-2" />
          </div>

          <div className="text-left ml-[16px]">
            <p className="text-[18px] font-medium leading-[24px] ">
              Add wallet extension to Chrome
            </p>
          </div>
        </div>
        <button
          className="bg-black text-white font-medium  w-24 rounded-full py-3 text-sm  hover:text-ph"
          // Open wallet modal on button click
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default OkxWallet
