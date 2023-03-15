import React from 'react';
import Image from "next/image"

import eth_logo from "../../assets/images/Ethereum-logo.png"
import { CiGlobe } from "react-icons/ci"
import { CiServer } from "react-icons/ci"
import { TbGauge } from "react-icons/tb"
import { useEthereumContext } from '../../context/EthereumContext';

const ETHBanner: React.FunctionComponent = (props) => {

    const {ETHSupply, ETHPrice, nodeCount, gasPrice, gweiGasPrice, latestFinalizedBlock, latestSafeBlock} = useEthereumContext()
    const ETHMarketCap = (ETHPrice * ETHSupply / 1000000000000000000).toLocaleString()

    return (
      <div className='bg-white rounded-md p-4 mx-3 md:mx-16 2xl:mx-72 -mt-12 shadow lg:flex lg:flex-row'>
        <div className='flex flex-col md:flex-row lg:w-2/3'>
          <div className='flex flex-col md:w-1/2 pr-4'>
            <div className='text-xs flex flex-row pb-6 border-b'>
              <div className='pr-4 ml-1'>
                <Image src={eth_logo} alt='ETH' width={15} height={15} />
              </div>
              <div>
                <p className='text-gray-400'>ETHER PRICE</p>
                <p>${ETHPrice}</p>
              </div>
            </div>
  
            <div className='text-xs flex flex-row pt-6'>
              <div className='pr-2 text-2xl'>
                <CiGlobe />
              </div>
              <div>
                <p className='text-gray-400'>MARKET CAP</p>
                <p>${ETHMarketCap}</p>
              </div>
            </div>
          </div>
  
          <div className='flex flex-col md:w-1/2 md:border-l md:px-4 mt-6 pt-6 md:pt-0 md:mt-0 border-b border-t md:border-t-0 pb-6 md:border-b-0 md:pb-0'>
            <div className='flex flex-row'>
              <div className='flex flex-col w-1/2'>
                <div className='text-xs flex flex-row pb-6 border-b'>
                  <div className='pr-2 text-2xl'>
                    <CiServer />
                  </div>
                  <div>
                    <p className='text-gray-400'>TOTAL NODE COUNT</p>
                    <p>{nodeCount}</p>
                  </div>
                </div>
  
                <div className='text-xs flex flex-row pt-6'>
                  <div className='pr-2 text-2xl'>
                    <TbGauge />
                  </div>
                  <div>
                    <p className='text-gray-400 uppercase'>Last Finalized Block</p>
                    <p>{latestFinalizedBlock}</p>
                  </div>
                </div>
              </div>
  
              <div className='flex flex-col w-1/2 text-right'>
                <div className='text-xs flex flex-row pb-6 border-b justify-end'>
                  <div>
                    <p className='text-gray-400 uppercase'>Med Gas Price</p>
                    <p>{Math.ceil(gweiGasPrice)} Gwei (${Math.round(gasPrice * 100)/100})</p>
                  </div>
                </div>
  
                <div className='text-xs flex flex-row pt-6 justify-end'>
                  <div>
                    <p className='text-gray-400 uppercase'>Last Safe Block</p>
                    <p>{latestSafeBlock}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='lg:w-1/3 px-4 lg:border-l mt-4 md:mt-4 lg:mt-0 md:border-t lg:border-t-0 md:pt-4 lg:pt-0'>
            <div className='text-xs flex flex-row pb-6'>
              <div>
               
              </div>
            </div>
          </div>
      </div>
    );
  };
  

export default ETHBanner;
