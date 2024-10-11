import React from 'react'
import './App.css'
import Hero from './components/Hero';
import ConfirmTransaction from './components/ConfirmTransaction';
import Successfull from './components/Successfull';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import { WagmiProvider } from 'wagmi';
import {
  mainnet, xLayer
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [metaMaskWallet],
    },
  ],
  {
    appName: 'My RainbowKit App',
    projectId: 'YOUR_PROJECT_ID',
  }
);
export const config = getDefaultConfig({
  
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [mainnet, xLayer],
  ssr: true, // If your dApp uses server side rendering (SSR)
},connectors);


const queryClient = new QueryClient();


function App() {
  

  return (
    <>
     <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
      <div className="h-screen font-custom flex justify-center items-center ">
        {/* <Successfull/> */}
        <Hero/>
      </div>
      </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>

    </>
  );
}

export default App
