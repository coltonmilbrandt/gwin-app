import Image from "next/image"
import Price from "../components/Price"
import Balances from "../components/Balances"
import Deposit from "../components/Deposit"
import Withdrawal from "./Withdrawal"
import web3 from "web3"
import { useState, useEffect } from "react"

export default function PoolCard({ pool, contract, walletBal, tokenPic }) {
	const hEth = pool.hBalancePreview
	const cEth = pool.cBalancePreview
	const userBal = pool.userCEthBalPreview
	const poolId = pool.poolId
	const isHeated = pool.isHeated
	const isCooled = pool.isCooled
	const cRate = pool.cRate
	const hRate = pool.hRate
	const priceFeed = pool.priceFeed
	const name = () => {
		try {
			// split basePriceFeedKey into base1 and base2
			const base1 = splitPair(pool.basePriceFeedKey, 0)
			const base2 = splitPair(pool.basePriceFeedKey, 1)
			console.log("base1: " + base1)
			console.log("base2: " + base2)
			// split quotePriceFeedKey into quote1
			const quote1 = splitPair(pool.quotePriceFeedKey, 0)
			console.log("quote1: " + quote1)
			const leverage = isHeated ? convertRate(hRate) : convertRate(cRate)
			let poolName
			// if quote1 is "N/A", set poolName to be base1/base2
			if (quote1 == "N/A" || quote1 == "") {
				poolName = base1 + "/" + base2 + " " + leverage
				return poolName
			} else {
				// otherwise, set poolName to be base1/quote1
				poolName = base1 + "/" + quote1 + " " + leverage
				return poolName
			}
		} catch (error) {
			console.error(error)
			return "N/A" // return default value when the hexToUtf8 throws an error
		}
	}
	const symbol = () => {
		// return the base currency of the pair as the symbol
		const base = splitPair(pool.basePriceFeedKey, 0)
		return base
	}

	const splitPair = function (pair, element) {
		// only proceed if pair is a hex value and is not equal to "0x0"
		if (web3.utils.isHex(pair) && pair != "0x0") {
			try {
				// convert the hex value to a string and split it into parts
				const str = web3.utils.hexToUtf8(pair)
				const parts = str.split("/")
				const result = parts[element]
				return result
			} catch (error) {
				console.error(error)
				return "N/A" // return default value when the hexToUtf8 throws an error
			}
		} else {
			return "N/A"
		}
	}

	const convertRate = function (rate) {
		let convertedRate
		if (rate && rate != "0x0") {
			try {
				// convert int to readable value (f.e. "5x")
				convertedRate = parseInt(rate) / 10 ** 10
				convertedRate = convertedRate.toString() + "x"
				return convertedRate
			} catch (error) {
				console.error(error)
				return "N/A" // return default value when error thrown
			}
		}
	}

	const [open, setOpen] = useState(false)
	const [withdrawOpen, setWithdrawOpen] = useState(false)

	return <div>{name()}</div>
}
