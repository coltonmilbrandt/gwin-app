import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { abi } from "../constants/Gwin_abi"
import { useEffect, useState } from "react"
import convertHex from "../helpers/convertHex"
import Web3 from "web3"
import generatePoolName from "../helpers/generatePoolName"

const Health = ({
	pool,
	leverage,
	hEth,
	cEth,
	contract,
	isCooled,
	priceFeed,
}) => {
	const web3 = new Web3()

	// convert ETH value from smart contract
	const convertEth = (val, decimals) => {
		const result = web3.utils.fromWei(val.toString())
		return Number(result).toFixed(decimals)
	}

	// useEffect(() => {
	// 	const interval = setInterval(async () => {
	// 		const test = await simulateInteractUp()
	// 		console.log("TESTESTESTEST")
	// 		console.log(test)
	// 		const [upBalHEth, upBalCEth] = await simulateInteractUp()
	// 		const [downBalHEth, downBalCEth] = await simulateInteractDown()
	// 		const upBalConverted = convertEth(Number(upBalHEth), 5)
	// 		const downBalConverted = convertEth(Number(downBalHEth), 5)
	// 		const upBalCEthConverted = convertEth(Number(upBalCEth), 5)
	// 		const downBalCEthConverted = convertEth(Number(downBalCEth), 5)
	// 		console.log("upBalConverted: " + upBalConverted)
	// 		console.log("downBalConverted: " + downBalConverted)
	// 	}, 5000) // runs every 5 seconds
	// 	return () => clearInterval(interval)
	// }, [])

	const health = isCooled ? pool.cHealth : pool.hHealth
	// console.log("health: " + health)
	// console.log("leverage: " + leverage)
	// health = health / 10 ** 10
	health = health.toString()

	return (
		<span
			style={{
				color:
					health <= 50
						? "red"
						: health <= 75
						? "orange"
						: health <= 110
						? "green"
						: health <= 200
						? "green"
						: "black",
			}}
		>
			{health}
		</span>
	)
}

export default Health
