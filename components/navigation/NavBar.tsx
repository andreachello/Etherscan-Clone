import React from 'react';
import Image from "next/image"
import Link from 'next/link'

import etherscan_logo from "../../assets/images/logo-etherscan.svg"
import etherscan_logo_only from "../../assets/images/etherscan-logo-only.png"

import { useEthereumContext } from '../../context/EthereumContext';
import { FaGasPump } from 'react-icons/fa';

interface INavBarProps {
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
 
  const { gweiGasPrice, ETHPrice } = useEthereumContext()

  return (
    <div className='mb-2 bg-white shadow-md z-50'>
    <div className='hidden md:block flex-row border-b border-1'>
      <p className='text-xs p-4 mx-3 md:mx-16 2xl:mx-[17rem] flex'>
        <span className='text-gray-500'>ETH Price:</span>
        <span className='text-blue-600 ml-1'>${ETHPrice} </span>
        <span className='flex ml-4'> 
          <FaGasPump className='text-gray-400 mt-[1px] mx-1'/>
          <span className='text-gray-500'>Gas: </span>
          <span className='text-blue-600 ml-1'>{Math.ceil(gweiGasPrice)} Gwei </span>
        </span>
      </p>
    </div>

    <div className='flex flex-row md:px-4 py-3 justify-between mx-4 md:mx-12 2xl:mx-[16.8rem]'>
      <div className='flex-row'>
        <Link href="/"><Image src={etherscan_logo} alt="Etherscan Logo" width={120}/></Link>
      </div>
      <div className='flex-row space-x-4 text-sm mt-2 hidden md:flex'>
        <Link href="/"><p>Home</p></Link>
        <p className='cursor-not-allowed'>Blockchain</p>
        <p className='cursor-not-allowed'>Tokens</p>
        <p className='cursor-not-allowed'>NFTs</p>
        <p className='cursor-not-allowed'>Resources</p>
        <p className='cursor-not-allowed'>Developers</p>
        <p className='cursor-not-allowed'>More</p>
        <p className='cursor-not-allowed'>Login</p>
      </div>
    </div>
    </div>
    

  );
};

export default NavBar;
