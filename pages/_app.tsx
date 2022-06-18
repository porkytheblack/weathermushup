import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../utils/theme"
import GlobalStylesConfig from '../utils/GlobalStylesConfig'
import Layout from '../Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return <ChakraProvider theme={theme} >
            <GlobalStylesConfig />  
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>   
}

export default MyApp
