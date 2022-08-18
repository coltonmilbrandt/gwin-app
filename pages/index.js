import Head from "next/head"
// import Image from 'next/image'
import styles from "../styles/Home.module.css"
import Dash from "./Dash"
import Nav from "../components/Nav"
import React from "react"
import { useRouter } from "next/router"
import propTypes from "prop-types"

export default function Home() {
	return (
		<div className={styles.container}>
			<Nav />
			<Dash />
		</div>
	)
}
