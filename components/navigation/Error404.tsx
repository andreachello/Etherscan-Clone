import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

interface IError404Props {
}

const Error404: React.FunctionComponent<IError404Props> = (props) => {
  return (
    <div className='px-6 pt-4 pb-48 md:py-32 lg:py-48 xl:p-48 bg-[url("error-404.svg")] bg-cover bg-no-repeat bg-center'>
        
       <div className='flex flex-col space-y-4 mx-6 md:mx-12 2xl:mx-24'>
        <p className='text-xl lg:text-5xl text-blue-500 py-2'>Search not found</p>
        <div className='text-sm md:text-md text-gray-700'>
            <p>Oops! You have entered an empty search string</p>
            <p>If you think this is a problem with us, please tell us.</p>
        </div>
        <p className='text-white bg-blue-500 px-3 py-2 w-32 rounded-md text-center hover:bg-blue-800'><Link href="/">Back Home</Link></p>
       </div>
    </div>
  );
};

export default Error404;
