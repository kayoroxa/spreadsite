import '../styles/reset.css'
import type { AppProps } from 'next/app'
import { StoreProvider, createStore } from 'easy-peasy'
import model from '../../store/models'

const store = createStore(model)

export default function MyApp({ Component, pageProps }: AppProps) {
  const contextProps = {}

  return (
    <StoreProvider store={store}>
      <Component {...pageProps} {...contextProps} />
    </StoreProvider>
  )
}
