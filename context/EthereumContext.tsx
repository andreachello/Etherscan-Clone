import { ethers } from "ethers";
import React, {createContext, ReactNode, useContext } from "react";
import useBlockDetails from "../hooks/useBlockDetails";
import useEtherData from "../hooks/useEtherData";

interface IEthereum {
  currentBlock: number;
  blocksWithDetails: ethers.providers.Block[] | undefined,
  transactions: ethers.providers.TransactionResponse[],
  gasPrice: number,
  gweiGasPrice: number,
  ETHPrice: number,
  ETHSupply: number,
  nodeCount: number,
  latestFinalizedBlock: number,
  latestSafeBlock: number,
  // blockRewards: number[],
  isBlockLoading: boolean,
  isEtherDataLoading: boolean,
  provider: ethers.providers.JsonRpcProvider,
}

const ALCHEMY_API_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_API_URL)

const EthereumContext = createContext<IEthereum>({
  currentBlock: 0,
  blocksWithDetails: [],
  transactions: [],
  gasPrice: 0,
  gweiGasPrice: 0,
  ETHPrice: 0,
  ETHSupply: 0,
  nodeCount: 0,
  latestFinalizedBlock: 0,
  latestSafeBlock: 0,
  // blockRewards: [],
  isBlockLoading: false,
  isEtherDataLoading: false,
  provider: provider,
});

export const EthereumProvider = ({ children }: { children: ReactNode }) => {

  const {ETHPrice, ETHSupply, nodeCount, isEtherDataLoading} = useEtherData()

      const {
        currentBlock,
        blocksWithDetails,
        transactions,
        gasPrice,
        gweiGasPrice,
        latestFinalizedBlock,
        latestSafeBlock,
        // blockRewards,
        isBlockLoading,
    } = useBlockDetails(provider)
  

  return (
    <EthereumContext.Provider value={{ 
      currentBlock,
      blocksWithDetails,
      transactions,
      gasPrice,
      gweiGasPrice,
      ETHPrice,
      ETHSupply,
      nodeCount,
      latestFinalizedBlock,
      latestSafeBlock,
      // blockRewards,
      isBlockLoading,
      isEtherDataLoading,
      provider,
     }}>
        {children}
    </EthereumContext.Provider>
  )
};

export const useEthereumContext = () => {
  const context = useContext(EthereumContext)
  if (context === undefined) throw new Error("useEthereumContext must be within an EthereumProvider")
  return context
}
