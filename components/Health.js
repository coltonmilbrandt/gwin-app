import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { abi } from "../constants/Gwin_abi"
import { useEffect, useState } from "react"
import convertHex from "../helpers/convertHex"
import Web3 from "web3"

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

	const health = isCooled ? pool.cHealth : pool.hHealth
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
						: "green",
			}}
		>
			{health}
		</span>
	)
}

export default Health
