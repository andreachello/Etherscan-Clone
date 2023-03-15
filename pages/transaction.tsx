import { ethers } from 'ethers';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{ useContext, useEffect, useState } from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { TfiLightBulb } from 'react-icons/tfi';
import { useEthereumContext } from '../context/EthereumContext';

interface ITransactionProps {
}


const Transaction: React.FunctionComponent<ITransactionProps> = (props) => {
  const { provider } = useEthereumContext()
  const router = useRouter()
  const { query } = router
  const transaction =  Object.keys(query)[0] // get transaction from url

  const [transactionData, setTransactionData] = useState<ethers.providers.TransactionResponse>()
  
  const getTransactionData = async() => {
    const response = await provider.getTransaction(transaction)
    setTransactionData(response)
  }

  useEffect(() => {
    if (transaction) {
      getTransactionData()
    }
  },[transaction])
  
  return (
    <div className='mx-3 md:mx-16 2xl:mx-72'>
      <div className='py-4 border-b'><span className='font-semibold'>Transaction Details </span></div>
      <div className='flex text-xs font-semibold space-x-2 py-4'>
        <p className='py-2 px-3 rounded-lg flex cursor-pointer bg-[#0784c3] text-white'>Overview</p>
        <p className='py-2 px-3 rounded-lg flex cursor-not-allowed bg-gray-200'>State</p>
        <p className='py-2 px-3 rounded-lg flex cursor-not-allowed bg-gray-200'>Comments</p>
      </div>

      <div className='bg-white rounded-lg p-4 text-sm shadow flex flex-col space-y-4'>
        <div className='flex flex-col md:flex-row md:space-x-[16rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p className=''>Transaction Hash:</p>
          </div>
          <p className=''>{transactionData?.hash}</p>
        </div>
        <div className='flex space-x-6 md:space-x-[20.5rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Status:</p>
          </div>
          <p className=''>-</p>
        </div>
        <div className='flex space-x-6 md:space-x-[20.8rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Block:</p>
          </div>
          <p>{transactionData?.blockNumber}</p>
        </div>
        <div className='flex space-x-6 md:space-x-[18.6rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Timestamp:</p>
          </div>
          <p>-</p>
        </div>


        <div className='flex flex-col md:flex-row md:space-x-[20.8rem] border-t pt-4'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>From:</p>
          </div>
          <p className='text-blue-500'><Link href={{pathname:"/account/", query: String(transactionData?.from)}}>{transactionData?.from}</Link></p>
        </div>
        <div className='flex flex-col md:flex-row md:space-x-[21.9rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>To:</p>
          </div>
          <p className='text-blue-500'><Link href={{pathname:"/account/", query: String(transactionData?.to)}}>{transactionData?.to}</Link></p>
        </div>

        <div className='flex space-x-6 md:space-x-[20.8rem] border-t pt-4'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Value:</p>
          </div>
          <p>{transactionData && ethers.utils.formatEther(transactionData.value)} ETH</p>
        </div>
        <div className='flex space-x-6 md:space-x-[16.7rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Transaction Fee:</p>
          </div>
          <p>-</p>
        </div>
        <div className='flex space-x-6 md:space-x-[19.2rem]'>
          <div className='text-gray-500 flex space-x-2'>
            <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
            <p>Gas Price:</p>
          </div>
          <p>{transactionData?.gasPrice && ethers.utils.formatEther(transactionData?.gasPrice)} ETH</p>
        </div>
      </div>
      <div className='flex text-xs text-gray-500 py-3 space-x-1'>
        <TfiLightBulb /> <p>A transaction is a cryptographically signed instruction that changes the blockchain state. Block explorers track the details of all transactions in the network. Learn more about transactions in our Knowledge Base.</p>
      </div>
    </div>
  );
};

export default Transaction;
