import React, {useState, useEffect} from 'react';
import cx from "classnames"
import {TfiEye} from "react-icons/tfi"
import {RxQuestionMarkCircled} from "react-icons/rx"
import {BsSortDown} from "react-icons/bs"
import { ethers } from 'ethers';
import Link from "next/link"
import axios from "axios"
import { useQuery } from "react-query"

interface IProducedBlocksProps {
  account: string,
}

type Transaction = {
    blockNumber: string,
    timeStamp: string,
    blockReward: number
}

const ProducedBlocks: React.FunctionComponent<IProducedBlocksProps> = ({
  account,
}) => {

  const {data, isLoading} = useQuery('Internal Transactions', async() => {
    const response = await axios.get(`https://api.etherscan.io/api?module=account&action=getminedblocks&address=${account}&blocktype=blocks&page=1&offset=10&apikey=${process.env.ETHERSCAN_API_KEY}`)
    return response.data.result
  })

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
          <th className='px-3'>Block</th>
          <th className='px-3'>Age</th>
          <th className='px-2'>Reward</th>
        </tr>
      </thead>
      <tbody>
      {data && data?.map((transaction: Transaction, i: number) => (
        <tr key={i} className='text-sm text-left divide-y'>
       
          <td className='p-3'><Link href={{pathname:"/block/", query: String(transaction.blockNumber)}}><p className='text-blue-500'>{transaction.blockNumber}</p></Link></td>
          <td className='p-3'>{transaction.timeStamp}</td>
          <td className='p-3'>{transaction.blockReward && Number(ethers.utils.formatEther(transaction?.blockReward)).toFixed(4)} ETH</td>
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

export default ProducedBlocks;
