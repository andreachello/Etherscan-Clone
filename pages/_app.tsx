import '../assets/styles/globals.css'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from "react-query"

import NavBar from "../components/navigation/NavBar"
import Footer from "../components/navigation/Footer"
import { EthereumProvider } from '../context/EthereumContext'

const queryClient = new QueryClient()

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
    <EthereumProvider>
        <NavBar />
          <Component {...pageProps} />
        <Footer />    
    </EthereumProvider>
    </QueryClientProvider>
  )
}

export default MyApp
