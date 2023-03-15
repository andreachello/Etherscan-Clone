import React,{useContext, useState} from 'react';
import {useRouter} from "next/router"
import { useEthereumContext } from '../../../context/EthereumContext';
import Link from 'next/link';
import { IoCubeOutline } from "react-icons/io5"
import { CiMemoPad } from "react-icons/ci"
import { ethers } from 'ethers';
import TableLoader from "../../../components/loaders/TableLoader"

interface ILatestTransactionsProps {
}

const LatestTransactions: React.FunctionComponent<ILatestTransactionsProps> = (props) => {

    const router = useRouter()
    const {blocksWithDetails, transactions, gasPrice, gweiGasPrice, isBlockLoading} = useEthereumContext()

    const trimmedTransactions = transactions.slice(0,6)
    const trimmedBlocks = blocksWithDetails?.slice(0,6)

    const getBlockElapsedTime = (timestamp: number) => {
        const blockTime = new Date(timestamp)
        const now = new Date();
        const currentTime = now.getTime()
        return (currentTime - blockTime.getTime())/1000
    }

    // const getBlockReward = (gasUsed, baseFeePerGas, gasPrice=46) => {
    //     const totalFee = ethers.utils.formatEther(
    //         ethers.BigNumber.from(gasUsed).mul(gasPrice)
    //     )
    //     const burnedFee = gasUsed - baseFeePerGas
    //     return burnedFee
    // } 

  return (
    <div className='mx-3 lg:mx-16 2xl:mx-72 mt-6 flex flex-col lg:flex-row md:space-x-4 space-y-4 md:space-y-0'>
        <div className='flex flex-col px-4 lg:w-1/2 bg-white rounded-md shadow'>
            <div className='pt-5 pb-4 border-b'>
            <p className='text-sm font-bold'>Latest Blocks</p>
            </div>

            {isBlockLoading ? 
            <TableLoader />
            :
            <div className='pt-4 overflow-x-scroll'>
            <div className="table-auto">
            <div>
            {trimmedBlocks?.map((block, i) => (
                    <div key={i+1} className="py-4 border-b flex flex-row space-x-16 md:space-x-48 lg:space-x-20 xl:space-x-20 2xl:space-x-16">
                        <div>
                            <div className='flex flex-row'>
                                <div className='p-3 bg-gray-50 rounded'>
                                    <IoCubeOutline className='text-2xl text-gray-500'/>
                                </div>
                               <div className='mx-2 mt-1'>
                                    <Link href={{pathname: "/block", query: String(block.number)}}>
                                        <span className=' text-blue-500 text-sm'>{block.number}</span>
                                    </Link>
                                    <p className='text-xs text-gray-400'>{getBlockElapsedTime(block.timestamp)}</p>
                               </div>
                            </div>
                        </div>
                        <div className='mt-1 text-sm'>
                            <p>
                                Fee Recipient
                                <span className='px-2 text-blue-500'>
                                    <Link href={{pathname:"/account/", query: String(block.miner)}}>
                                        {block.miner.slice(0,4)}...{block.miner.slice(38)}
                                    </Link>
                                </span>
                            </p>
                            <p className='text-blue-500'>{block.transactions.length} txns</p>
                        </div>
                        <div className='text-xs mt-2'>
                            {/* TODO: Get block reward */}
                            {/* {blockRewards && blockRewards[0]} */}
                            {/* {burnedFee = block.gasUsed - block.baseFeePerGas} */}
                            {/* {Number(block.gasUsed) * 2 - Number(block.gasUsed) - Number(block.baseFeePerGas)} */}
                            {/* {getBlockReward(block.gasUsed, block.baseFeePerGas)} */}
                            {/* // (Number(block.gasUsed) * gasPrice) - gasPrice +ethers.utils.formatEther() */}
                            
                            <p className='p-1 border  rounded-lg font-semibold'>
                                {Number(block.gasUsed).toLocaleString()} Gas
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            {trimmedBlocks && trimmedBlocks.length < 6 && !isBlockLoading ?
            <p className='text-center py-6 text-sm text-gray-500'>Refresh to fetch remaining data</p>
            : ""}
            </div>
            </div>
            }
        </div>

        <div className='flex flex-col px-4 lg:w-1/2 bg-white rounded-md shadow'>
            <div className='pt-5 pb-4 border-b'>
            <p className='text-sm font-bold'>Latest Transactions</p>
            </div>

        {isBlockLoading ? <TableLoader />
        :
        <div className='pt-4 overflow-x-scroll'>
        <div className="table-auto">
        <div>
        {trimmedTransactions && trimmedTransactions.map((transaction, i) => (
                <div key={i+1} className="py-4 border-b flex flex-row space-x-16 md:space-x-48 lg:space-x-20 xl:space-x-20 2xl:space-x-16">
                    <div>
                        <div className='flex flex-row'>
                            <div className='p-3 bg-gray-50 rounded'>
                                <CiMemoPad className='text-2xl text-gray-500'/>
                            </div>
                           <div className='mx-2 mt-1 text-sm'>
                                <Link href={{pathname: "/transaction", query: String(transaction.hash)}}>
                                    <span className=' text-blue-500'>
                                    {transaction.hash.slice(0,12)}...
                                    </span>
                                </Link>
                                <p className='text-xs text-gray-400'>{transaction.timestamp}</p>
                           </div>
                        </div>
                    </div>
                    <div className='mt-1 text-sm'>
                        <p>
                            From
                            <span className='px-2 text-blue-500'>
                                <Link href={{pathname:"/account/", query: String(transaction.from)}}>
                                    {transaction.from.slice(0,8)}...{transaction.from.slice(32)}
                                </Link>
                            </span>
                        </p>
                        To 
                        <span className='px-2 text-blue-500'>
                            <Link href={{pathname:"/account/", query: String(transaction.to)}}>
                                {transaction.to.slice(0,8)}...{transaction.to.slice(32)}
                            </Link>
                        </span>
                    </div>
                    <div className='mt-2 text-xs'>
                        <p className='p-1 border rounded-lg font-semibold'>
                            {Number(ethers.utils.formatEther(transaction.value)).toFixed(4)} ETH
                        </p>
                    </div>
                </div>
            ))}
        </div>
        </div>
        </div>
        }
        </div>
    </div>
  );
};

export default LatestTransactions;
