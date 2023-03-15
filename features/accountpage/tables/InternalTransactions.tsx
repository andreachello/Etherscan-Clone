import React, {useEffect, useState} from 'react';
import cx from "classnames"
import {TfiEye} from "react-icons/tfi"
import {RxQuestionMarkCircled} from "react-icons/rx"
import {BsSortDown, BsArrowRight} from "react-icons/bs"
import { ethers } from 'ethers';
import Link from "next/link"
import axios from "axios"
import { useQuery } from "react-query"

interface IInternalTransactionsProps {
  account: string,
}

type InternalTransaction = {
  blockNumber: number,
  timeStamp: number,
  hash: string,
  from:string,
  to:string,
  value:number,
  gas: number,
  gasPrice: number,
  isError: number,
  type: string,
  input: string,
  contractAddress: string,
  gasUsed: number,
  traceId: string,
}

const InternalTransactions: React.FunctionComponent<IInternalTransactionsProps> = ({
  account,
}) => {

    const {data, isLoading} = useQuery('Internal Transactions', async() => {
        const internalTxResponse = await axios.get(`https://api.etherscan.io/api?module=account&action=txlistinternal&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`)
        return internalTxResponse.data.result
      })

  const TransactionTo = () => {
    return (
      <div className='border rounded-full p-1 bg-green-50 border-green-600 w-8'>
        <BsArrowRight className='text-xs ml-1 text-green-600 font-semibold text-center' />
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
          <th className='px-3'>Parent Txn Transaction Hash</th>
          <th className='px-3'>Block</th>
          <th className='px-3'>Age</th>
          <th className='px-3'>From</th>
          <th className='px-2'></th>
          <th className='px-2'>To</th>
          <th className='px-2'>Value</th>
        </tr>
      </thead>
      <tbody>
      {data && data?.map((transaction: InternalTransaction, i: number) => (
        <tr key={i} className='text-sm text-left divide-y'>
          <td className='p-3'><Link href={{pathname:"/transaction/", query: String(transaction.hash)}}><p className='text-blue-500'>{transaction.hash?.slice(0,20)}...</p></Link></td>
          <td className='p-3'><Link href={{pathname:"/block/", query: String(transaction.blockNumber)}}><p className='text-blue-500'>{transaction.blockNumber}</p></Link></td>
          <td className='p-3'>{transaction.timeStamp}</td>
          <td className='p-3'><Link href={{pathname:"/account/", query: String(transaction.from)}}><p className='text-blue-500'>{transaction.from?.slice(0,20)}...</p></Link></td>
          <td><TransactionTo /></td>
          <td className='pl-6'><Link href={{pathname:"/account/", query: String(transaction.to)}}><p className='text-blue-500'>{transaction.to?.slice(0,20)}...</p></Link></td>
          <td className='p-3'>
            {transaction.value && Number(ethers.utils.formatEther(transaction.value)).toFixed(4)} ETH
          </td>
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

export default InternalTransactions;
