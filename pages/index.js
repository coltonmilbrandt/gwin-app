import Head from "next/head"
import styles from "../styles/Home.module.css"
import Dash from "./Dash"
import Nav from "../components/Nav"
import React from "react"
import { useRouter } from "next/router"
import propTypes from "prop-types"

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Gwin</title>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
			</Head>
			<Nav />
			<Dash />
		</div>
	)
}
