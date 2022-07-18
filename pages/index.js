import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import Stake from '../components/Stake'
import { useMoralis } from "react-moralis"

export default function Home() {
  const { isWeb3Enabled } = useMoralis()

  return (
    <div className={styles.container}>
      <Header />
      {isWeb3Enabled ? (
        <>
        <Stake />
        </>
      ) : (
        <div>No Metamask detected...</div>
      )}
    </div>
  )
}
