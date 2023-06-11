import '@/styles/globals.css'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'


export default function App({ Component, pageProps }) {
  
  return <Component {...pageProps} />
}
