import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import toast, { Toaster } from "react-hot-toast"
import PoolCard from "../components/PoolCard"
import Web3 from "web3"
import PoolCardSection from "../components/PoolCardSection"
import getContract from "../constants/contracts"
import Welcome from "../components/Welcome"
import Loader from "../components/Loader"

// this is the main portion of the functional app, contains pools

export default function Details() {
	// initialize Moralis web hooks
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	// get chain ID and convert
	const chainIdReadable = parseInt(chainIdHex)
	const chainName = chainDict[chainIdReadable]
	console.log("ChainId" + chainIdReadable)

	// define web3
	let web3

	// initialize web3
	if (
		typeof window !== "undefined" &&
		typeof window.ethereum !== "undefined"
	) {
		// we are in the browser and metamask is running
		window.ethereum.request({ method: "eth_requestAccounts" })
		web3 = new Web3(window.ethereum)
	}

	// get contract info
	const contractsInfo = require("../constants/contractInfo.json")

	// initialize gwin address
	const [gwin, setGwin] = useState("")

	// get gwin address
	useEffect(() => {
		setGwin(getContract(chainIdReadable))
	})

	return (
		<div>
			<h1>Hello!</h1>
		</div>
	)
}
