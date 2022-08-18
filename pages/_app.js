import "../styles/globals.css"
import { MoralisProvider, moralisProvider } from "react-moralis"
import Head from "next/head"
import React from "react"

function MyApp({ Component, pageProps }) {
	return (
		<MoralisProvider initializeOnMount={false}>
			<Component {...pageProps} />
		</MoralisProvider>
	)
}

export default MyApp
