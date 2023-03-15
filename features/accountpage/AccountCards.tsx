import Image from 'next/image';
import React from 'react';
import {FaEthereum, FaRegCopy} from "react-icons/fa"
import {AiOutlineQrcode} from "react-icons/ai"
import {BiMessageDetail} from "react-icons/bi"
import {IoIosArrowDown} from "react-icons/io"
import avatar from "../../assets/images/wallet-icon.png"

interface IAccountCardsProps {
    account: string,
    balance: string,
    ETHPrice: number,
}

const AccountCards: React.FunctionComponent<IAccountCardsProps> = ({
    account,
    balance,
    ETHPrice,
}) => {
  return (
    <div className='mx-6 md:mx-16 2xl:mx-72'>
        <div>
            <div className='py-4 border-b flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-between'>
                <div className='flex flex-row space-x-3'>
                    <div><Image src={avatar} width={25} height={25} alt="Wallet avatar" className="rounded-full"/></div>
                    <p><span className='font-bold text-lg'>Address </span> 
                    <span className='text-xs md:text-base'>{account}</span></p>
                    <FaRegCopy className='text-gray-400 mt-1'/>
                    <AiOutlineQrcode className='text-gray-400 mt-1'/>
                    <BiMessageDetail className='text-gray-400 mt-1'/>
                </div>
                <div className='text-white text-sm flex space-x-2'>
                    <p className='bg-[#0784c3] py-1 px-3 cursor-not-allowed rounded-lg flex'>Buy <IoIosArrowDown className='mt-1 ml-1'/></p>
                    <p className='bg-[#0784c3] py-1 px-3 cursor-not-allowed rounded-lg flex'>Exchange <IoIosArrowDown className='mt-1 ml-1'/></p>
                    <p className='bg-[#0784c3] py-1 px-3 cursor-not-allowed rounded-lg flex'>Earn <IoIosArrowDown className='mt-1 ml-1'/></p>
                    <p className='bg-[#0784c3] py-1 px-3 cursor-not-allowed rounded-lg hidden md:flex'>Gaming <IoIosArrowDown className='mt-1 ml-1'/></p>
                </div>
            </div>
            <div className='py-4'>
                <p className='text-gray-500'><span className='font-bold'>Featured:</span> Curious on Ethereum's hottest 🔥 trading pairs? View top pairs and details with DEX Trading Pairs! </p>
            </div>
            <div className='py-3 flex flex-row space-x-2'>
                <p className='p-1 text-xs font-bold border border-gray-600 rounded-2xl bg-gray-100 w-48 text-center'>
                    Fee Recipient: {account?.slice(0,4)}...{account?.slice(37,40)}
                </p>
                <p className='p-1 text-xs font-bold border border-gray-600 rounded-2xl bg-gray-100 w-48 text-center'>
                    Proposer Fee Recipient
                </p>
            </div>
        </div>

        <div className='lg:flex lg:flex-row'>
            <div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 lg:w-2/3'>
                <div className='flex flex-col md:w-1/2 lg:w-1/2 bg-white shadow p-4 rounded-lg'>
                    <p className='text-sm font-semibold'>Overview</p>
                    <p className='uppercase text-gray-500 text-xs pt-4 pb-1'>ETH Balance</p>
                    <div className='flex flex-row space-x-1'><FaEthereum className='text-sm mt-1 text-gray-500'/> <p className='text-sm'>{balance} ETH</p></div>
                    <p className='uppercase text-gray-500 text-xs pt-4 pb-1'>ETH Value</p>
                    <p className='text-sm'>${(Number(balance) * ETHPrice).toFixed(2).toLocaleString()} <span className='text-xs text-gray-700'>(@ ${ETHPrice}/ETH)</span></p>
                </div>
                <div className='flex flex-col md:w-1/2 lg:w-1/2 bg-white shadow p-4 rounded-lg'>
                    <p className='text-sm font-semibold'>More Info</p>
                    <p className='uppercase text-gray-500 text-xs pt-4 pb-1'>Private Name Tags</p>
                    <p className='text-sm p-1 mt-2 border w-16 cursor-not-allowed text-center rounded-full'>+ Add</p>
                </div>
            </div>
            <div className='lg:w-1/3 bg-white shadow p-4 rounded-lg lg:ml-4 mt-4 lg:mt-0'>
                <p className='text-sm font-semibold'>Multi Chain</p>
                <p className='uppercase text-gray-500 text-xs pt-4 pb-1'>Multichain addresses</p>
                <p></p>

            </div>
        </div>
    </div>
  );
};

export default AccountCards;
