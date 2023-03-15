import * as React from 'react';
import ETHBanner from './ETHBanner';
import SearchBar from '../../components/search/SearchBar';

const HomeBanner: React.FunctionComponent = () => {

  return (
   <>
    <div className="bg-[url('../images/waves-light.svg')] pt-12 pb-32">
      <div className='mx-3 md:mx-16 2xl:mx-72'>
         <div className='flex flex-col md:w-1/2 pr-3 md:pr-0'>
          <p className='text-white font-semibold'>
            The Ethereum Blockchain Explorer
           </p>
          <SearchBar/>
          <p className='text-white text-xs'>
            Sponsored: The safe way to earn with your Bitcoin in DeFi. Threshold’s tBTC. Mint tBTC here.
          </p>
         </div>
       </div>
    </div>
    <ETHBanner />
   </>
  );
};

export default HomeBanner;
