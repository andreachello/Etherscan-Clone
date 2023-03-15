import { useState, useEffect, useCallback } from "react";
import axios from "axios"

const useEtherData = () => {

  const [ETHPrice, setETHPrice] = useState<number>(0)
  const [ETHSupply, setETHSupply] = useState<number>(0)
  const [updatedPriceData, setUpdatedPriceData] = useState<string>('')

  const [nodeCount, setNodeCount] = useState(0)

  const [isEtherDataLoading, setIsEtherDataLoading] = useState(true)


  const getEtherPrice = useCallback(async () => {
    try {
    
      const priceResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.ETHERSCAN_API_KEY}`)
      setETHPrice(priceResponse.data.result.ethusd)
      const timestamp = Number(priceResponse.data.result.ethusd_timestamp)
      const date = new Date(timestamp)
      setUpdatedPriceData("Updated @:" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())      

      const supplyResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=ethsupply&apikey=${process.env.ETHERSCAN_API_KEY}`)
      setETHSupply(supplyResponse.data.result)

      const nodeResponse = await axios.get(`https://api.etherscan.io/api?module=stats&action=nodecount&apikey=${process.env.ETHERSCAN_API_KEY}`)
      setNodeCount(nodeResponse.data.result)

      setIsEtherDataLoading(false)

    } catch (error) {
      console.log(error);
      
    }
  }, [ETHPrice, ETHSupply])
    
  useEffect(() => {
    getEtherPrice()
  }, [])

  return {ETHPrice, ETHSupply, nodeCount, isEtherDataLoading}

}

export default useEtherData

