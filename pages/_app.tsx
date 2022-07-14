import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import {theme} from "../utils/theme"
import GlobalStylesConfig from '../utils/GlobalStylesConfig'
import Layout from '../Layout'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const domain = typeof process.env.domain !== "undefined" ? process.env.domain : ""
const client_id  = typeof process.env.client_id !== "undefined" ? process.env.client_id : ""

function MyApp({ Component, pageProps }: AppProps) {
  console.log(client_id, "👈 client id ai")
  const query_client = new QueryClient()
  
  return (  
      <QueryClientProvider client={query_client} > 
        <Auth0Provider redirectUri={typeof window !== "undefined" ? window.location.origin : "" } domain={"dev-1r9889va.us.auth0.com"} clientId={"SGrJW5dCxNq1YakYf1GWXFTGE9fVbUWH"}  >    
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
