import React, { useState, useEffect } from "react";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";
import okxinput from "../assets/images/okxinput.png";
import Modal from "./Modal";
import ConnectWallet from "./ConnectWallet";
import Exchange from "./Exchange";
import herologo from "../assets/images/herologo.png";
import { eth } from "web3";
import { Bridge } from "../integration";
import { ethers } from "ethers";
const Hero = () => {
  const [isEthereum, setIsEthereum] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    image: okxinput,
    head: "OKB",
    desc: "OKB Token",
    address:"0x75231F58b43240C9718Dd58B4967c5114342a86c"
  });
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false); // State to track connection status
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(""); 
  const [currentNetwork, setCurrentNetwork] = useState(""); // New state to track the current network


  const fetchBalance = async (account) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Create a provider
      const balanceInWei = await provider.getBalance(account); // Get balance in Wei
      const balanceInEth = ethers.utils.formatEther(balanceInWei); // Convert Wei to Ether
      const limitedBalance = parseFloat(balanceInEth).toFixed(6);
      
      setBalance(limitedBalance);     } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]); // Store the connected account
          setIsConnected(true); // Set connection status to true
          await fetchBalance(accounts[0]); 
          await checkNetwork();
        }
      }
    };

    checkConnection();
  }, []);

  const checkNetwork = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork(); // Get the current network
      setCurrentNetwork(network.name); // Store the current network name
      console.log("net",network.name);
    } catch (error) {
      console.error("Error fetching network:", error);
    }
  };

  const fetchBalanceBasedOnNetwork = async (account) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum); // Create a provider
      const balanceInWei = await provider.getBalance(account); // Get balance in Wei
      const balanceInEth = ethers.utils.formatEther(balanceInWei); // Convert Wei to Ether
      const limitedBalance = parseFloat(balanceInEth).toFixed(6);
      
      setBalance(limitedBalance);   
      await checkNetwork();
      } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };


  useEffect(()=>{

  },[selectedToken])
  const handleSwap = () => {
    setIsEthereum((prev) => !prev);
    checkNetwork(); // Check network after swapping

  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenWalletModal = async () => {
    if(!isConnected){
      setIsWalletModalOpen(true);

    }

    if(isEthereum && currentNetwork !== "homestead" || !isEthereum && currentNetwork === "homestead"){
      changeNetwork()
      return;
    }

    if(isConnected){
      console.log("sstarts briding");
      console.log("input val",inputValue);
      console.log("is eth",isEthereum);
      console.log("token",selectedToken.address);
      console.log("useer address",account);
      let dest = isEthereum ? 3 : 1;
      const amountInWei = ethers.utils.parseEther(inputValue);
      console.log("amount un giwe", amountInWei);
      try {
        const res = await Bridge(inputValue, dest, account,amountInWei.toString(), selectedToken.address, true,[])
      } catch (error) {
        
      }
    }
  };

  const changeNetwork = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const networkName = isEthereum ? "homestead" : "x-layer"; // Adjust based on your network names

    const networks = {
        homestead: {
            chainId: "0x1", // Mainnet
            chainName: "Ethereum Mainnet",
            nativeCurrency: {
                name: "Ether",
                symbol: "ETH",
                decimals: 18,
            },
            rpcUrls: ["https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID"], // Replace with actual RPC URL
        },
        "x-layer": {
            chainId: "0xc4", // Replace with your X Layer chain ID
            chainName: "X Layer Mainnet",
            nativeCurrency: {
                name: "X Token",
                symbol: "OKB",
                decimals: 18,
            },
            rpcUrls: ["https://wallet.okex.org/fullnode/xlayer/discover/rpc/ro"], // Replace with actual RPC URL
        },
    };

    try {
        const currentNetwork = await provider.getNetwork();
        const desiredNetwork = networks[networkName];

        if (currentNetwork.chainId !== parseInt(desiredNetwork.chainId, 16)) {
            // Network is not the desired one, attempt to add it
            await provider.send("wallet_addEthereumChain", [desiredNetwork]);
            console.log("Network added:", desiredNetwork.chainName);
        } else {
            // Switch to the network if it's already present
            await provider.send("wallet_switchEthereumChain", [{ chainId: desiredNetwork.chainId }]);
            console.log("Switched to network:", desiredNetwork.chainName);
        }
        
        await checkNetwork(); // Check the network again after switching
    } catch (error) {
        console.error("Failed to switch or add network:", error);
    }
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

   
    const sanitizedValue = value.replace(/[^0-9.]/g, "");

    
    if (sanitizedValue === "") {
      setInputValue("");
      return;
    }

    
    const parts = sanitizedValue.split(".");

    
    if (parts.length > 2) {
      return;
    }

    
    if (parts[0].length > 1 && parts[0][0] === "0" && !parts[1]) {
      parts[0] = parts[0].replace(/^0+/, "");
    }

    
    if (parts[1] && parts[1].length > 6) {
      return;
    }


    const integerPart =
      parts[0] === "" ? "" : parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    
    const decimalPart = parts[1] === undefined ? "" : `.${parts[1]}`;

    
    const formattedValue = integerPart + decimalPart;

   
    setInputValue(formattedValue);
  };





  return (
    <div className="bg-white">
      <img
        src={herologo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[37px] w-[87px] mx-auto mb-4"
      />

      <div className="border border-bor rounded-lg shadow-md px-7 py-8 w-[496px] ">
        <h1 className="font-bold text-2xl leading-8 text-left">Bridge</h1>
        <div className="flex gap-2 items-center mt-5">
          <div className="bg-empty rounded-md p-[18px] px-[14px] w-1/2 flex items-center gap-2">
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
          <div className="bg-empty rounded-md p-[18px] px-[14px] w-1/2 flex items-center gap-2">
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

        <div className="bg-empty rounded-[8px] mt-5 p-3 px-[16px] flex-col items-center">
       <div className="flex">
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
{
  isConnected && (
    <div className="flex justify-end">Balance: {balance} ETH </div>

  )
}       
        </div>
      

        <button
          className="bg-black text-white font-bold w-full rounded-full py-4 text-lg mt-5 hover:text-ph"
          onClick={handleOpenWalletModal}
        >
          {/* {isConnected ? "Bridge" : "Connect Wallet"} Conditional label */}
          {isConnected && currentNetwork === (isEthereum ? "homestead" : "x-layer") ? "Bridge" : "Switch to correct network"}

          </button>
        <button
          className="bg-black text-white font-bold w-full rounded-full py-4 text-lg mt-5 hover:text-ph"
          onClick={handleOpenWalletModal}
        >
          {/* {isConnected ? "Bridge" : "Connect Wallet"} Conditional label */}
          {isConnected && currentNetwork === (isEthereum ? "homestead" : "x-layer") ? "Bridge" : "Switch to correct network"}

          </button>
    
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onTokenSelect={handleTokenSelect}
          selectedToken={selectedToken}
          balance={balance}
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
