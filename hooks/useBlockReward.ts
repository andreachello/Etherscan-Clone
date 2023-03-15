import { useEffect } from 'react';
import axios from "axios"
import { ethers } from "ethers"

const useBlockReward = (ALCHEMY_API_URL: string) => {
    const getBlockReward = async (blockNum: number) => {

        const getBlock = async (num: number) => {
          // convert to hex
          const blockNumHex = ethers.utils.hexlify(num)
          const blockResponse = await axios.post(
            ALCHEMY_API_URL, {
              jsonrpc: "2.0",
              method: "eth_getBlockByNumber",
              params: [blockNumHex, true], // full transaction details
              id: 0
            }
          )
          return blockResponse.data.result
        }
    
        const getGasUsage = async (hash: string) => {
          const transactionResponse = await axios.post(
            ALCHEMY_API_URL, {
              jsonrpc: "2.0",
              method: "eth_getTransactionReceipt",
              params: [`${hash}`],
              id: 0
            }
          )
    
          console.log(transactionResponse.data.result.gasUsed);
          
          return transactionResponse.data.result.gasUsed
        }
    
        const getUncle = async (hash: string) => {
          const uncleRes = await axios.post(
            ALCHEMY_API_URL, {
              jsonrpc: "2.0",
              method: "eth_getBlockByHash",
              params: [`${hash}`, false],
              id: 0,
            }
          );
          return uncleRes.data.result;
        };
    
        try {
          console.log("fetching block rewards...");
          const block = await getBlock(blockNum)
          const blockNumber = parseInt(block.number)
          const transactions = block.transactions
          const baseFeePerGas = block.baseFeePerGas
          const gasUsed = block.gasUsed
    
          // Cost of all transactions in a block
    
          // 1. Sum of transaction fees
          let minerTips = []
          let sumMinerTips = 0
    
          for (const tx of transactions) {
            const txGasUsage = await getGasUsage(tx.hash)
            console.log(txGasUsage);
            console.log("Gas Price", ethers.utils.formatEther(tx.gasPrice));
            
            
            const totalFee = ethers.utils.formatEther(
              ethers.BigNumber.from(txGasUsage).mul(tx.gasPrice).toString()
            )
    
            console.log(totalFee);
            
            minerTips.push(Number(totalFee))
          }
    
          // sum miner tips
          if (transactions.length > 0) {
            sumMinerTips = minerTips.reduce((prevTip, currentTip) => prevTip + currentTip)
          }
    
          console.log("Sum Miner TIPS:", sumMinerTips);
          
    
          // 2. Sum of Burned Fees in a block
          const burnedFee = ethers.utils.formatEther(
            ethers.BigNumber.from(gasUsed).mul(baseFeePerGas).toString()
          )
    
          // // 3. Nephew Rewards
          // const baseBlockReward = 2 
          // const nephewReward = baseBlockReward / 32
          // const uncleCount = block.uncles.length
          // const totalNephewReward = uncleCount * nephewReward
    
          // // 4. Uncle Rewards - iterate over each tx hash in uncle rewards
          // let uncleRewardsArr = []
    
          // for (const hash of block.uncles) {
          //   const uncle = await getUncle(hash)
          //   const unlceNum = parseInt(uncle.number)
          //   const uncleMiner = uncle.miner
          //   const uncleReward = (unlceNum + 8 - blockNumber) * baseBlockReward / 8
          //   uncleRewardsArr.push({
          //     reward: `${uncleReward}`,
          //     miner: uncleMiner
          //   })
          // }
    
          // Block reward if no uncle
          // const blockReward = baseBlockReward + (sumMinerTips - Number(burnedFee))
          const blockReward = (sumMinerTips - Number(burnedFee))
    
          return blockReward
    
          // if (uncleCount > 0) {
          //   console.log(blockReward + totalNephewReward);
            
          //   return blockReward + totalNephewReward
          //   console.log("miner:", block.miner);
          //   console.log("Uncle rewards:");
          //   console.log(uncleRewardsArr);
          // } else {
          //   console.log("NO UNCLE");
            
          //   return blockReward
          //   console.log("miner:", block.miner);
          // }
    
          
        } catch (error) {
          console.log(error);
          
        }
    
      }

      useEffect(() => {
        // getBlockReward()
      }, [])
}

export default useBlockReward