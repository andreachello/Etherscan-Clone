import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router"
import {ethers} from "ethers"

import AccountCards from '../features/accountpage/AccountCards';
import Error404 from '../components/navigation/Error404';
import { useEthereumContext } from '../context/EthereumContext';
import AccountTabs from '../features/accountpage/AccountTabs';

const account: React.FunctionComponent = () => {

  const { provider, ETHPrice, gasPrice} = useEthereumContext()
  const router = useRouter()
  const { query } = router
  const account =  Object.keys(query)[0] // get account from url

  const [balance, setBalance] = useState("")

  const [error, setError]= useState<unknown>()

  const accountData = async() => {

    try {
      const adddressBalance = await provider.getBalance(account);
      setBalance(Number(ethers.utils.formatEther(adddressBalance)).toFixed(4))
    } catch (error) {
      setError(error)
    }
  }

  useEffect(() => {
    if(account) {      
      accountData()      
    }
  }, [account])

  return (
    <>
    {error && !balance ? <Error404 />
    :
    <>
      <AccountCards 
          account={account}
          balance={balance}
          ETHPrice={ETHPrice} />     
        <AccountTabs account={account} gasPrice={gasPrice}/>
      </>
      }
    </>
  );
};

export default account;

