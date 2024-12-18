import { store } from '@/store'
import theme from '@/styles'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />;
      </ChakraProvider>
    </Provider>
  )
}
