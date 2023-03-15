import { ethers } from "ethers"
import { useCallback, useEffect, useState } from "react"

const useBlockDetails = (provider: ethers.providers.JsonRpcProvider) => {

    const [blocksWithDetails, setBlocksWithDetails] = useState<ethers.providers.Block[]>()
    const [currentBlock, setCurrentBlock] = useState<number>(0)
    const [blockRewards, setBlockRewards] = useState([0])
    const [transactions, setTransactions] = useState<ethers.providers.TransactionResponse[]>([])
    const [gasPrice, setGasPrice] = useState<number>(0)
    const [gweiGasPrice, setGweiGasPrice] = useState<number>(0)
    const [latestFinalizedBlock, setLatestFinalizedBlock] = useState<number>(0)
    const [latestSafeBlock, setLatestSafeBlock] = useState<number>(0)
    const [isBlockLoading, setIsBlockLoading] = useState(true)

    const getBlockData = useCallback(async () => {
      try {

        const [currentBlockNumber, gasPriceResponse, finalizedBlock, safeBlock] = await Promise.all([
            provider.getBlockNumber(),
            provider.getGasPrice(),
            provider.getBlock("finalized"),
            provider.getBlock("safe"),
            ]);

        // Gas
        const latestGasPrice = ethers.utils.formatUnits(gasPriceResponse)      
        const latestGweiGasPrice = ethers.utils.formatUnits(gasPriceResponse, "gwei")
        setGasPrice(Number(latestGasPrice))
        setGweiGasPrice(Number(latestGweiGasPrice))

        // Block Status
        setLatestFinalizedBlock(finalizedBlock.number)
        setLatestSafeBlock(safeBlock.number)
        setCurrentBlock(currentBlockNumber)
    

        // single block transaction
        const currentBlockTransactions = await provider.getBlockWithTransactions(currentBlockNumber)
        setTransactions(currentBlockTransactions.transactions);
    
        // top blocks
        const previousBlock = currentBlockNumber - 6
        const blockList = []
    
        for (let i = currentBlockNumber; i > previousBlock; i --) {
            blockList.push(i)
        }

        // get block details
        const blockDetails = await Promise.all(blockList.map(async (blockNumber) => {
            return provider.getBlock(blockNumber)
          }))

        setBlocksWithDetails(blockDetails)

        // get block reward
    
        // tenBlocks.map(async(block: number) => {
        //   const blockReward = await getBlockReward(block)
        //   blockRewards.push(blockReward)
        // })
    
            // const blockReward = await getBlockReward(tenBlocks[0])
            // console.log("Block Reward", blockReward);
            // console.log("Block Number", tenBlocks[0]);
            
            // blockRewards.push(blockReward)
        
        setIsBlockLoading(false)
                
        } catch (error) {
            console.log(error);
        }
    }, [provider])
    
    
    useEffect(() => {
        getBlockData()
    }, [])

    return {
        currentBlock,
        blocksWithDetails,
        transactions,
        gasPrice,
        gweiGasPrice,
        latestFinalizedBlock,
        latestSafeBlock,
        // blockRewards,
        isBlockLoading,
    }
}

export default useBlockDetails