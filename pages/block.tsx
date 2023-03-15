import Link from 'next/link';
import { useRouter } from 'next/router';
import React,{ useEffect, useState } from 'react';
import { RxQuestionMarkCircled } from 'react-icons/rx';
import { TfiLightBulb } from 'react-icons/tfi';
import Error404 from '../components/navigation/Error404';
import { useEthereumContext } from '../context/EthereumContext';

interface IBlockProps {
}

type Block = {
  _difficulty: number,
  difficulty: number,
  extraData: string,
  gasLimit: number,
  gasUsed: number,
  hash: string,
  miner: string,
  nonce: string,
  number: number,
  parentHash: string,
  timestamp: number,
  transactions: string[]
}

const Block: React.FunctionComponent<IBlockProps> = (props) => {
  const { provider } = useEthereumContext()
  const router = useRouter()
  const { query } = router
  const block =  Object.keys(query)[0] // get block from url

  const [blockData, setBlockData] = useState<Block>()
  const [blockError, setBlockError] = useState<unknown>()
  
  const getBlockData = async() => {
   try {
      const response = await provider.getBlock(Number(block))
      setBlockData(response)
   } catch (error) {
      setBlockError(error)
   }
  }

  useEffect(() => {
    if (block) {
      getBlockData()
    }
  },[block])

  const invalidBlock = blockData?.parentHash === "0x0000000000000000000000000000000000000000000000000000000000000000"

  return (
    <>
    {!invalidBlock ? 
       <div className='mx-3 md:mx-16 2xl:mx-72'>
       <div className='py-4 border-b'><span className='font-semibold'>Block </span><span className='text-xs text-gray-500'> #{block}</span></div>
       <div className='flex text-xs font-semibold space-x-2 py-4'>
         <p className='py-2 px-3 rounded-lg flex cursor-pointer bg-[#0784c3] text-white'>Overview</p>
         <p className='py-2 px-3 rounded-lg flex cursor-not-allowed bg-gray-200'>Consensus Info</p>
         <p className='py-2 px-3 rounded-lg flex cursor-not-allowed bg-gray-200'>MEV Info</p>
         <p className='py-2 px-3 rounded-lg flex cursor-not-allowed bg-gray-200'>Comments</p>
       </div>
 
       <div className='bg-white rounded-lg p-4 text-sm shadow flex flex-col space-y-4'>
         <div className='flex space-x-6 md:space-x-72'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Block Height:</p>
           </div>
           <p className=''>{blockData?.number}</p>
         </div>
         <div className='flex space-x-6 md:space-x-[20.5rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Status:</p>
           </div>
           <p className=''>{}</p>
         </div>
         <div className='flex space-x-6 md:space-x-[18.6rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Timestamp:</p>
           </div>
           <p>{blockData?.timestamp}</p>
         </div>
         <div className='flex space-x-6 md:space-x-72'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Proposed On:</p>
           </div>
           <p>Block proposed on slot -, epoch -</p>
         </div>
         <div className='flex space-x-6 md:space-x-72'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Transactions:</p>
           </div>
           <p>{blockData?.transactions.length} transactions in this block</p>
         </div>
 
 
         <div className='flex flex-col md:flex-row md:space-x-[17.7rem] border-t pt-4'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Fee Recipient:</p>
           </div>
           <p className='text-blue-500'><Link href={{pathname:"/account/", query: String(blockData?.miner)}}>{blockData?.miner}</Link></p>
         </div>
         <div className='flex space-x-6 md:space-x-[17.6rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Block Reward:</p>
           </div>
           <p>-</p>
         </div>
         <div className='flex space-x-6 md:space-x-[17.2rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Total Difficulty:</p>
           </div>
           <p>{blockData?.difficulty}</p>
         </div>
         <div className='flex space-x-6 md:space-x-[21.5rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Size:</p>
           </div>
           <p>-</p>
         </div>
 
         <div className='flex space-x-6 md:space-x-[19.2rem] border-t pt-4'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Gas Used:</p>
           </div>
           <p>{Number(blockData?.gasUsed).toLocaleString()} ({(Number(blockData?.gasUsed)/30000000*100).toFixed(2)}%)</p>
         </div>
         <div className='flex space-x-6 md:space-x-[19.3rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Gas Limit:</p>
           </div>
           <p>{Number(blockData?.gasLimit).toLocaleString()}</p>
         </div>
         <div className='flex space-x-6 md:space-x-[16rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Base Fee Per Gas:</p>
           </div>
           <p>-</p>
         </div>
         <div className='flex space-x-6 md:space-x-[18.7rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Burnt Fees:</p>
           </div>
           <p>-</p>
         </div>
         <div className='flex space-x-6 md:space-x-[18.9rem]'>
           <div className='text-gray-500 flex space-x-2'>
             <RxQuestionMarkCircled className="mt-[3px] text-gray-500 text-center" />
             <p>Extra Data:</p>
           </div>
           <p>{blockData?.extraData}</p>
         </div>
       </div>
       <div className='flex text-xs text-gray-500 py-3 space-x-1'>
         <TfiLightBulb /> <p>Blocks are batches of transactions linked via cryptographic hashes. Any tampering of a block would invalidate all following blocks as all subsequent hashes would change. Learn more about this page in our Knowledge Base.</p>
       </div>
     </div> 
  : <Error404 />}
    </>
  );
};

export default Block;
