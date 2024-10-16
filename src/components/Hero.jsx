import React, { useState, useEffect } from "react";
import ethhero from "../assets/images/ethhero.png";
import okxhero from "../assets/images/okxhero.png";
import okxinput from "../assets/images/okxinput.png";
import Modal from "./Modal";
import ConnectWallet from "./ConnectWallet";
import Exchange from "./Exchange";
import herologo from "../assets/images/herologo.png";
import { ethers } from "ethers";
import ConfirmTransaction from "./ConfirmTransaction";
import { useDisconnect } from 'wagmi'
import { config } from "../App";
import { GetBalance, GetGas } from "../integration";
import { useSwitchChain } from 'wagmi'
import axios from "axios";
const Hero = () => {
  const { disconnect } = useDisconnect()
  const [Confirm, setConfirm] = useState(false);
  const [isEthereum, setIsEthereum] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [gasInDollor, setGasInDollor] = useState("")
  const [selectedToken, setSelectedToken] = useState({
    image: okxinput,
    head: "OKB",
    desc: "OKB Token",
    ETHaddress: "0x75231F58b43240C9718Dd58B4967c5114342a86c",
    Xaddress:"0x75231F58b43240C9718Dd58B4967c5114342a86c"
  });

  const [gasFee, setGasFee] = useState("")
  const [inputValue, setInputValue] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("");
  const [conflict, setConflict] = useState(false)
  const { chains, switchChain } = useSwitchChain()

  const [currenetNetwork, setCurrentNetwork] = useState("homestead")
  const fetchBalance = async (account) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balanceInWei = await provider.getBalance(account);
      const balanceInEth = ethers.utils.formatEther(balanceInWei);
      const limitedBalance = parseFloat(balanceInEth).toFixed(6);
      setBalance(limitedBalance);
      
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };
  const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        // await fetchBalance(accounts[0]);
        const tokenAddress = isEthereum ? selectedToken.ETHaddress : selectedToken.Xaddress;
        if(isEthereum && selectedToken.ETHaddress === "0x0000000000000000000000000000000000000000"){
        await  fetchBalance(
          accounts[0]
        );

        return
        }
        const balance =     await GetBalance(accounts[0],tokenAddress, isEthereum )
    
        console.log("balance",balance);

        if(selectedToken.head === "USDC" || selectedToken.head ==="USDT" || selectedToken.head === "WBTC" ){

        const balanceInEth = Number(balance) / 1000000;
        const limitedBalance = parseFloat(balanceInEth).toFixed(6);
        setBalance(limitedBalance);
        return
        }

        const balanceInEth = ethers.utils.formatEther(balance);
        const limitedBalance = parseFloat(balanceInEth).toFixed(6);
        setBalance(limitedBalance);
      }
    }
    if (typeof window.okxwallet !== "undefined") {
      const accounts = await window.okxwallet.request({
        method: "eth_accounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        setIsConnected(true);
        await fetchBalance(accounts[0]);
        const tokenAddress = isEthereum ? selectedToken.ETHaddress : selectedToken.Xaddress
    const balance =     await GetBalance(accounts[0],tokenAddress, isEthereum )

    console.log("balance",balance);

    if(selectedToken.head === "USDC" || selectedToken.head ==="USDT" || selectedToken.head === "WBTC" ){

      const balanceInEth = Number(balance) / 1000000;
      const limitedBalance = parseFloat(balanceInEth).toFixed(6);
      setBalance(limitedBalance);
      return
      }

      const balanceInEth = ethers.utils.formatEther(balance);
      const limitedBalance = parseFloat(balanceInEth).toFixed(6);
      setBalance(limitedBalance);
    
      }
    }
  };
  useEffect(() => {
    

    checkConnection();
  }, []);


  useEffect(()=>{
    checkConnection();

  },[isConnected,selectedToken])
  const checkNetwork = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork(); // Get the current network
      console.log("netwirk",network);
      
      setCurrentNetwork(network.name); // Store the current network name
      if(network.chainId === 196){
        setCurrentNetwork("xlayer"); // Store the current network name

      }
      console.log("net",network.name);
if(!isEthereum && network.name === "homestead"){
  setConflict(true)
}

if(isEthereum && network.name === "xlayer"){
  setConflict(true)
}
    } catch (error) {
      console.error("Error fetching network:", error);
    }
  };

  const handleSwap = async () => {
    setIsEthereum((prev) => !prev);
    console.log("chains",chains);
    console.log("isEthereum",isEthereum);
    
    if(isEthereum){
      const ethereumParams = {
        chainId: '0xc4', // Ethereum Mainnet chain ID
      };
      console.log("trying to change the chain");
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethereumParams.chainId }],
      });
      switchChain({ chainId: chains[1].id })
    }
    else{
      const ethereumParams = {
        chainId: '0x1', // Ethereum Mainnet chain ID
      };
  
      // Switch to Ethereum Mainnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ethereumParams.chainId }],
      });
      switchChain({ chainId: chains[0].id })

    }
    checkNetwork(); // Check network after swapping

  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };


  const getNetworkFee = async() => {
    try {
      const res = await GetGas();
      console.log("gas fee", res);
    // const val = await  convertCurrency()
    // const usdEquivalent = res * val.data;
    // console.log("USD Equivalent of Gas Fee:", usdEquivalent);
    // setGasInDollor(parseFloat(usdEquivalent.toFixed(4)))
      return res;
      
    } catch (error) {
      
    }
  }

  const convertCurrency = async () => {
    try {
        const response = await axios.post(
            'https://api.apyhub.com/data/convert/currency',
            {
                source: 'eth',
                target: 'usd',
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'apy-token': 'APY0sM431Oy9vafZ3vLmulFTG5tyWoxek8zCcopTHPVxlHK4Y00cA1vgE64LCuqwcaIqJWX', // replace {{token}} with your actual token
                },
            }
        );

        console.log('Conversion Response:', response.data);
        return response.data; // Handle the response as needed
    } catch (error) {
        console.error('Error converting currency:', error);
        throw error; // Handle the error as needed
    }
};

  const handleOpenWalletModal = async () => {
    if (!isConnected) {
      setIsWalletModalOpen(true);
    }

    if (isConnected) {
     const gas= await getNetworkFee()
     
setGasFee(gas.slice(0,8))
      setConfirm(true);
    }
  };
 
  const handleCloseWalletModal = () => {
    setIsWalletModalOpen(false);
  };

  const handleCloseConfirmTransaction = () => {
    setConfirm(false); 
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

  const disconnectWallet = async () => {
    console.log("biuhgjh");
    disconnect({config})
    try {
      console.log("Attempting to disconnect...");
  
      // Check if MetaMask is connected
      if (window.ethereum && window.ethereum.isMetaMask) {
        console.log('Disconnecting MetaMask...');
  
        // Clear connected account and reset connection state
        setIsConnected(false);
  
        // Optionally, clear any stored account information
        localStorage.removeItem('connectedAccount');  // If account is stored in localStorage
  
        // Remove event listeners for MetaMask to prevent future events
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
  
        console.log('Disconnected from MetaMask');
      }
  
      // Check if OKX Wallet is connected
      if (window.okxwallet) {
        console.log('Disconnecting OKX Wallet...');
  
        // Clear connected account and reset connection state
        setIsConnected(false);
        window.okxwallet.disconnect()
        // Optionally, clear any stored account information
        localStorage.removeItem('connectedAccount');  // If account is stored in localStorage
  
        // Remove event listeners for OKX Wallet to prevent future events
        window.okxwallet.removeListener('accountsChanged', handleAccountsChanged);
        window.okxwallet.removeListener('chainChanged', handleChainChanged);
  
        console.log('Disconnected from OKX Wallet');
      }
  
      // Optionally, reload the page to completely reset the dApp state
      window.location.reload();  // This ensures a fresh state
  
    } catch (error) {
      console.error('Error disconnecting from wallet:', error);
    }
  };
  
  // Define event handlers to properly manage account or chain changes
  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      setIsConnected(false);  // If no accounts are available, disconnect
      console.log('Disconnected due to account change');
    }
  };
  
  const handleChainChanged = (chainId) => {
    setIsConnected(false);  // Handle network changes
    console.log('Disconnected due to network change');
  };

   const resetInput = () => {
     setInputValue(""); // Reset the input value to an empty string
   };
  
  // Add event listeners for account and chain changes
  // if (window.ethereum) {
  //   window.ethereum.on('accountsChanged', handleAccountsChanged);
  //   window.ethereum.on('chainChanged', handleChainChanged);
  // }
  console.log("balance" ,balance)
  const isInsufficientBalance = parseFloat(inputValue) > parseFloat(balance);
  return (
    <div className="bg-white">
      <img
        src={herologo}
        alt=""
        className="bg-black p-[5px] rounded-md h-[20px] sm:h-[37px] w-[50px] sm:w-[87px] mx-auto mb-2 sm:mb-4"
      />

      <div className="border border-bor rounded-lg shadow-md sm:px-7 px-2 m-1 mx-3 sm:m-3 py-3 sm:w-[496px] w-fit ">
        <h1 className="font-bold text-xl sm:text-2xl leading-8 text-left font-one">
          Bridge
        </h1>

        <div className="flex justify-end">
          {isConnected && (
            <button
              className="py-1 sm:py-3 px-2 sm:px-4 bg-red-700 rounded-lg text-white font-bold font-one"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          )}
        </div>
        <div className="flex gap-2 items-center mt-2 sm:mt-5">
          <div className="bg-empty rounded-md py-[6px] sm:p-[18px] px-[14px] w-1/2 flex items-center gap-2">
            <img
              src={isEthereum ? ethhero : okxhero}
              alt=""
              className="h-[20px] w-[20px]"
            />
            <p className="font-bold text-sm sm:text-base leading-5 font-one">
              {isEthereum ? "Ethereum" : "X Layer"}
            </p>
          </div>
          <button
            className="border border-bor rounded-[20px] text-[20px] p-1 bg-white h-fit"
            onClick={handleSwap}
          >
            <Exchange />
          </button>
          <div className="bg-empty rounded-md py-[6px] sm:p-[18px] px-[14px] w-1/2 flex items-center gap-2">
            <img
              src={isEthereum ? okxhero : ethhero}
              alt=""
              className="h-[20px] w-[20px]"
            />
            <p className="font-bold text-sm sm:text-base leading-5 font-one">
              {isEthereum ? "X Layer" : "Ethereum"}
            </p>
          </div>
        </div>

        <div className="bg-empty rounded-[8px] mt-2 sm:mt-5 py-0.5 sm:p-2 px-[16px] flex-col items-center">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="0.00"
              value={inputValue}
              onChange={handleInputChange}
              className="bg-empty flex-1 text-[36px] overflow-hidden pr-1.5 truncate w-full font-bold border-none px-1 py-0.5 sm:p-2 focus:outline-none focus:ring-0 input-caret"
            />
            <button
              className="ml-2 bg-white rounded-md pl-2 h-fit text-black flex items-center px-1 py-2 sm:py-3"
              onClick={handleOpenModal}
            >
              <img
                src={selectedToken.image}
                alt="Token"
                className="h-[20px] w-[20px]"
              />
              <p className="pl-1 font-four font-medium">{selectedToken.head}</p>

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
          {isConnected && (
            <div
              className={`flex justify-end text-xs sm:text-base ${
                isInsufficientBalance ? "text-red-500" : "text-black"
              }`}
            >
              Balance: {balance} {selectedToken.head}
            </div>
          )}
        </div>

        {isConnected && inputValue > 0 && isInsufficientBalance && (
          <button
            className="bg-empty text-black text-opacity-20 font-bold w-full rounded-full  text-base sm:text-lg py-2 sm:py-4 mt-2 sm:mt-5 hover:text-ph font-one cursor-not-allowed"
            disabled
          >
            Insufficient {selectedToken.head} balance
          </button>
        )}

        {isConnected && inputValue > 0 && !isInsufficientBalance && (
          <button
            className="bg-black text-white font-bold w-full rounded-full  text-base sm:text-lg py-2 sm:py-4 mt-2 sm:mt-5 hover:text-ph font-one"
            onClick={handleOpenWalletModal}
          >
            Bridge
          </button>
        )}

        {isConnected && (inputValue <= 0 || inputValue === "") && (
          <button
            className="bg-empty text-black text-opacity-20 font-bold w-full rounded-full text-base sm:text-lg py-2 sm:py-4 mt-2 sm:mt-5 hover:text-ph font-one cursor-not-allowed"
            disabled
          >
            Bridge
          </button>
        )}

        {!isConnected && (
          <button
            className="bg-black text-white font-bold w-full rounded-full py-2 sm:py-4 mt-2 sm:mt-5 text-base sm:text-lg  hover:text-ph font-one"
            onClick={handleOpenWalletModal}
          >
            Connect Wallet
          </button>
        )}

        {/* <button
          className="bg-black text-white font-bold w-full rounded-full py-4 text-lg mt-5 hover:text-ph font-one"
          onClick={handleOpenWalletModal}
        >
          {isConnected ? "Bridge" : "Connect Wallet"}
        </button> */}

        {Confirm && (
          <ConfirmTransaction
            onClose={handleCloseConfirmTransaction}
            isEthereum={isEthereum}
            tokenAddress={selectedToken}
            networkFee={gasFee}
            value={inputValue}
            account={account}
            resetInput={resetInput}
            inDollor={gasInDollor}
          />
        )}

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
          isConnected={setIsConnected}
        />

        {/* {isConnected && <p>{account}</p>} */}

        {/* {conflict && <p>switch network</p> } */}
      </div>

      <p className="text-black text-sm sm:text-base font-semibold text-center leading-5  sm:pt-2 font-two">
        Powered by Winks.fun
      </p>
    </div>
  );
};

export default Hero;
