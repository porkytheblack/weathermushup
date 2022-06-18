import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../utils/theme"
import GlobalStylesConfig from '../utils/GlobalStylesConfig'
import Layout from '../Layout'
import { Auth0Provider } from '@auth0/auth0-react'

const domain = typeof process.env.domain !== "undefined" ? process.env.domain : ""
const client_id  = typeof process.env.client_id !== "undefined" ? process.env.client_id : ""

function MyApp({ Component, pageProps }: AppProps) {
  return (
        <Auth0Provider redirectUri={typeof window !== "undefined" ? window.location.origin : "" } domain={domain} clientId={client_id}  >    
          <ChakraProvider theme={theme} >
              <GlobalStylesConfig />  
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </Auth0Provider>
          )   
}

export default MyApp
