import { useRouter } from 'next/router';
import * as React from 'react';

const SearchBar: React.FunctionComponent = () => {
    const router = useRouter()
    const checkSearchTerm = (term: React.KeyboardEvent<HTMLInputElement>) => {
        if (term.currentTarget.value.length < 40) {
          // block
          router.push({
            pathname: '/block/',
            query: String(term.currentTarget.value),
          })
        } else if (term.currentTarget.value.length > 40 && term.currentTarget.value.length < 60) {
          // account
          router.push({
            pathname: '/account/',
            query: String(term.currentTarget.value),
          })
        } else {
          // tx
          router.push({
            pathname: '/transaction/',
            query: String(term.currentTarget.value),
          })
        }
      }
    
    return (
        <div className='my-2 flex flex-row bg-white w-full rounded py-2 pr-1'>
            <span className='w-24 text-center text-sm py-1'>All Filters</span>
            <input className='w-full py-1 px-1 text-sm' placeholder='Search by Address / Txn / Block / Token / Domain Name'
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        checkSearchTerm(e)
                    }
                }}/>
        </div>         
    )
};

export default SearchBar;
