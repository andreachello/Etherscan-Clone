import React, {useState, useEffect} from 'react';
import cx from "classnames"
import {TfiEye} from "react-icons/tfi"
import {RxQuestionMarkCircled} from "react-icons/rx"
import {BsSortDown} from "react-icons/bs"
import { ethers } from 'ethers';
import Link from "next/link"
import axios from "axios"
import { useQuery } from "react-query"

interface IERC20TokenProps {
  account: string,
}

type ERC20Transaction = {
  blockNumber: number,
  timeStamp: number,
  hash: string,
  nonce:number,
  blockHash: string,
  transactionIndex: number,
  from:string,
  to:string,
  value:number,
  tokenName:string,
  tokenSymbol: string,
  tokenDecimal: number,
  gas: number,
  gasPrice: number,
  input: string,
  contractAddress: string,
  cumulativeGasUsed: number,
  gasUsed: number,
  confirmations: number,
}

const ERC20Token: React.FunctionComponent<IERC20TokenProps> = ({
  account,
}) => {

  const {data, isLoading} = useQuery('ERC20', async() => {
    const erc20TxResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=tokentx&address=${account}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`)
    return erc20TxResponse.data.result
  })

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
      {!isLoading && data?.length > 25 ?
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
          <th className='px-3'>Txn Hash</th>
          <th className='px-3'>Age</th>
          <th className='px-3'>From</th>
          <th className='px-2'></th>
          <th className='px-2'>To</th>
          <th className='px-2'>Value</th>
          <th className='px-2'>Token</th>
        </tr>
      </thead>
      <tbody>
      {!isLoading && data?.map((transaction: ERC20Transaction, i: number) => (
        <tr key={i} className='text-sm text-left divide-y'>
          <td className='p-3'>
            <div className='border rounded-md p-1 w-8'>
              <TfiEye className='ml-1 text-sm text-gray-700'/>
            </div>
          </td>
          <td className='p-3'><Link href={{pathname:"/transaction/", query: String(transaction.hash)}}><p className='text-blue-500'>{transaction.hash?.slice(0,20)}...</p></Link></td>
          <td className='p-3'>{transaction.timeStamp}</td>
          <td className='p-3'><Link href={{pathname:"/account/", query: String(transaction.from)}}><p className='text-blue-500'>{transaction.from?.slice(0,20)}...</p></Link></td>
          <td className='p-3'>{transactionIn(transaction.to) ? <TransactionIn /> : <TransactionOut />}</td>
          <td className='p-3'><Link href={{pathname:"/account/", query: String(transaction.to)}}><p className='text-blue-500'>{transaction.to?.slice(0,20)}...</p></Link></td>
          <td className='p-3'>
            {Number(ethers.utils.formatEther(transaction.value)).toFixed(4)}
          </td>
          <td className='p-3'>{transaction.tokenName}</td>
        </tr>

))}

      </tbody>
    </table>
    </div>
    {data?.length == 0 && !isLoading &&
    <div className='text-center py-24'>No Data</div>
    }
    </div>
  );
};

export default ERC20Token;
