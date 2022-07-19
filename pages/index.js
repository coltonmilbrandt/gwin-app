import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dash from '../components/Dash'
import Nav from '../components/Nav'


export default function Home() {
  

  return (
    <div className={styles.container}>
      <Nav />
      <Dash />
      
    </div>
  )
}
