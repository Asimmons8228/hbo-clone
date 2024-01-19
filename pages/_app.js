import '@/styles/styles.scss'
import { HBOProvider } from '@/components/HBOprovider'

export default function App({ Component, pageProps }) {
  return (
    <>
  <HBOProvider>
    <Component {...pageProps} />
  </HBOProvider>
  </>
  )
}
