import * as React from 'react';
import { BsTwitter } from 'react-icons/bs';
import { FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa';

import map from "../../assets/images/map.png"
import ethereum_logo from "../../assets/images/Ethereum-logo.png"
import Image from 'next/image';
import Link from 'next/link';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div className='mt-10 bg-gray-100'>
      <div className='mx-5 md:mx-16 2xl:mx-72'>
        <div className='flex space-x-3 py-4 border-b'>
          <Link href="https://twitter.com/AndreaChello"><div className='bg-gray-200 p-2 rounded-full'><BsTwitter /></div></Link>
          <Link href="https://chelloandrea.medium.com/"><div className='bg-gray-200 p-2 rounded-full'><FaMedium /></div></Link>
          <Link href="https://www.linkedin.com/in/andrea-chello-ab50b39b/"><div className='bg-gray-200 p-2 rounded-full'><FaLinkedin /></div></Link>
          <Link href="https://github.com/andreachello"><div className='bg-gray-200 p-2 rounded-full'><FaGithub /></div></Link>
        </div>
        <div className='py-6 flex flex-col md:flex-row space-y-6 md:space-x-12 lg:space-x-24'>
          <div className='md:w-1/3'>
            <div className='flex space-x-2'>
              <Image src={ethereum_logo} className="-mt-1" alt="ETH Logo" width={20} height={20}/>
              <p>Powered by Ethereum</p>
            </div>
            <p className='mt-2 text-xs'>Etherscan is a Block Explorer and Analytics Platform for Ethereum, a decentralized smart contracts platform.</p>
            <Image src={map} alt="World map" width={300} height={300}/>
          </div>
          <div className='flex md:w-1/3 lg:w-1/3'>
            <div className='w-1/2 text-sm flex-col space-y-1'>
              <p className='font-semibold mb-2'>Company</p>
              <p className='cursor-not-allowed'>About Us</p>
              <p className='cursor-not-allowed'>Brand Assets</p>
              <p className='cursor-not-allowed'>Contact Us</p>
              <p className='cursor-not-allowed'>Careers</p>
              <p className='cursor-not-allowed'>Terms of Service</p>
              <p className='cursor-not-allowed'>Bug Bounty</p>
            </div>
            <div className='w-1/2 text-sm flex-col space-y-1'>
              <p className='font-semibold mb-2'>Community</p>
              <p className='cursor-not-allowed'>API Documentation</p>
              <p className='cursor-not-allowed'>Knowledge Base</p>
              <p className='cursor-not-allowed'>Network Status</p>
              <p className='cursor-not-allowed'>Newsletters</p>
              <p className='cursor-not-allowed'>Disqus Comments</p>
            </div>
          </div>
          <div className='md:w-1/3 text-sm flex-col space-y-1'>
            <p className='font-semibold mb-2'>Products & Services</p>
            <p className='cursor-not-allowed'>Advertise</p>
            <p className='cursor-not-allowed'>Explorer-as-a-Service (EaaS)</p>
            <p className='cursor-not-allowed'>API Plans</p>
            <p className='cursor-not-allowed'>Priority Support</p>
            <p className='cursor-not-allowed'>Blockscan</p>
            <p className='cursor-not-allowed'>Blockscan Chat</p>
          </div>
        </div>
        <div className='flex justify-between text-sm py-4 border-t'>
          <p>Andrea Chello @ 2023</p>
          <p className='flex'>
            Donations: 
            <Link href={{pathname:"/account/", query: "0x1391179fE009f6A07f047603dCb3E88BFDb2E16f"}}>
              <span className='text-blue-500 mx-2'>{"0x1391179fE009f6A07f047603dCb3E88BFDb2E16f".slice(0,8)}...{"0x1391179fE009f6A07f047603dCb3E88BFDb2E16f".slice(32,40)}</span>
            </Link>
            ❤️
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
