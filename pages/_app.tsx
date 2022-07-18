import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../utils/theme"
import GlobalStylesConfig from '../utils/GlobalStylesConfig'
import Layout from '../Layout'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { isString } from 'lodash'



function MyApp({ Component, pageProps }: AppProps) {
  const query_client = new QueryClient()
  const domain = typeof process.env.domain !== "undefined" ? process.env.domain : ""
  const client_id  = typeof process.env.client_id !== "undefined" ? process.env.client_id : ""
  
  return (  
      <QueryClientProvider client={query_client} > 
        <Auth0Provider redirectUri={typeof window !== "undefined" ? window.location.origin : "" } domain={domain} clientId={client_id}  >    
          <ChakraProvider theme={theme} >
              <GlobalStylesConfig />  
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ChakraProvider>
          </Auth0Provider>
          </QueryClientProvider>
          )   
}

export default MyApp
