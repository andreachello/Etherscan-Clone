import React, {useEffect, useState} from 'react';
import cx from "classnames"
import {TfiEye} from "react-icons/tfi"
import {RxQuestionMarkCircled} from "react-icons/rx"
import {BsSortDown} from "react-icons/bs"
import { ethers } from 'ethers';
import Link from "next/link"
import { useQuery } from 'react-query';
import axios from 'axios';

interface IAccountHistoryProps {
  account: string,
  gasPrice: number
}

type Transaction = {
  blockNumber: number,
  timeStamp: number,
  hash: string,
  nonce:number,
  blockHash: string,
  transactionIndex: number,
  from:string,
  to:string,
  value:number,
  gas: number,
  gasPrice: number,
  isError: number,
  txreceipt_status: number,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: number,
  gasUsed: number,
  confirmations: number,
  methodId: string,
  functionName: string
}

const AccountHistory: React.FunctionComponent<IAccountHistoryProps> = ({
  account,
  gasPrice
}) => {

  const {data, isLoading} = useQuery('Account History', async() => {
    const accountHistoryResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`)
    return accountHistoryResponse.data.result
  })

  const isolateFunctionName = (funcName: string) => {
    const regex = /^[^(]+/;
    const matchResult =  funcName.match(regex)
    if (matchResult !== null) {
      return matchResult[0];
    }
    return "";
  } 

  const transactionIn = (to: string) => {
    if (to != account) return false
    return true
  }

  const TransactionIn = () => {
    return (
      <div className='border rounded-md p-1 bg-green-50 border-green-600'>
        <p className='text-xs text-green-600 font-semibold text-center'>IN</p>
      </div>
    )
  }
  const TransactionOut = () => {
    return (
      <div className='border rounded-md p-1 bg-yellow-50 border-yellow-600'>
        <p className='text-xs text-yellow-600 font-semibold text-center'>Out</p>
      </div>
    )
  }


  return (
    <div>
     <div className='mb-6 text-sm mx-3'>
      {data?.length > 25 ?
        <div className='flex space-x-2'>
          <BsSortDown className='text-lg'/>
          <p>Latest 25 from a total of <span className='text-blue-500'>{data?.length}</span> transactions</p>
        </div>
        : 
        <div className='flex space-x-2'>
          <BsSortDown className='text-lg'/>
          <p>Latest {data?.length} from a total of <span className='text-blue-500'>{data?.length}</span> transactions</p>
        </div>
        }
     </div>
      <div className='overflow-x-scroll'>
        <table className="table-auto w-full overflow-scroll">
        <thead className='border-b'>
          <tr className='text-left text-sm tracking-wide'>
            <th className='px-2'><RxQuestionMarkCircled className="ml-3 text-gray-500 text-center" /></th>
            <th className='px-3'>Transaction Hash</th>
            <th className='px-0'>Method</th>
            <th className='px-3'>Block</th>
            <th className='px-3'>Age</th>
            <th className='px-3'>From</th>
            <th className='px-2'></th>
            <th className='px-2'>To</th>
            <th className='px-2'>Value</th>
            <th className='px-2'>Txn Fee</th>
          </tr>
        </thead>
        <tbody>
        {!isLoading && data?.map((transaction: Transaction, i:number) => (
          <tr key={i} className='text-sm text-left divide-y'>
            <td className='p-3'>
              <div className='border rounded-md p-1 w-8'>
                <TfiEye className='ml-1 text-sm text-gray-700'/>
              </div>
            </td>
            <td className='p-3'><Link href={{pathname:"/transaction/", query: String(transaction.hash)}}><p className='text-blue-500'>{transaction.hash?.slice(0,20)}...</p></Link></td>
            <td>
              <p className='py-1 px-1 bg-gray-50 rounded-md border border-gray-200 text-xs text-center'>{transaction.functionName 
            ? isolateFunctionName(transaction.functionName)
            : "Transfer"}
            </p>
            </td>
            <td className='p-3'><Link href={{pathname:"/block/", query: String(transaction.blockNumber)}}><p className='text-blue-500'>{transaction.blockNumber}</p></Link></td>
            <td className='p-3'>{transaction.timeStamp}</td>
            <td className='p-3'><Link href={{pathname:"/account/", query: String(transaction.from)}}><p className='text-blue-500'>{transaction.from?.slice(0,20)}...</p></Link></td>
            <td className='p-3'>{transactionIn(transaction.to) ? <TransactionIn /> : <TransactionOut />}</td>
            <td className='p-3'><Link href={{pathname:"/account/", query: String(transaction.to)}}><p className='text-blue-500'>{transaction.to?.slice(0,20)}...</p></Link></td>
            <td className='p-3'>
              {Number(ethers.utils.formatEther(transaction.value)).toFixed(4)} ETH
            </td>
            <td className='p-3'>{(transaction.gasUsed * gasPrice).toFixed(4)}</td>
          </tr>

  ))}

        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AccountHistory;
