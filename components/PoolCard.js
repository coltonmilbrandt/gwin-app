import Image from "next/image"
import Price from "../components/Price"
import { abi } from "../constants/Gwin_abi"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import Balances from "../components/Balances"
import Deposit from "../components/Deposit"
import Withdrawal from "./Withdrawal"
import AssetImage from "../components/AssetImage"
import HeatLevel from "../components/HeatLevel"
import web3 from "web3"
import { useState, useEffect } from "react"

export default function PoolCard({
	pool,
	contract,
	walletBal,
	isHeated,
	isCooled,
	tokenPic,
}) {
	const icePoint = -1000000000000

	const getHeat = (leverage) => {
		if (leverage == icePoint) {
			return "iced"
		} else if (leverage < 0 && leverage > icePoint) {
			return "cooled"
		} else if (leverage > 0) {
			return "heated"
		} else if (leverage < icePoint) {
			return "shorted"
		} else {
			return "none"
		}
	}

	const hEth = (decimals) => {
		const value = web3.utils.fromWei(pool.hBalancePreview.toString())
		return Number(value).toFixed(decimals)
	}

	const cEth = (decimals) => {
		const value = web3.utils.fromWei(pool.cBalancePreview.toString())
		return Number(value).toFixed(decimals)
	}
	const userBal = (decimals) => {
		const value = web3.utils.fromWei(pool.userCEthBalPreview.toString())
		return Number(value).toFixed(decimals)
	}
	const description = (leverage) => {
		let description
		const heat = getHeat(leverage)
		const inX = convertRate(leverage)
		if (isHeated == true) {
			description = inX + " Long"
		} else if (isCooled == true) {
			switch (heat) {
				case "iced":
					description = "Stablized"
					break
				case "cooled":
					description = inX + " Cooled"
					break
				case "shorted":
					description = inX + " Short"
					break
			}
		}
		return description
	}

	const poolId = pool.poolId
	const cRate = pool.cRate
	const hRate = pool.hRate
	const priceFeed = () => {
		return convertHex(pool.currentPrice, 8)
	}
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
			if (
				typeof base2 === "undefined" &&
				(quote1 == "N/A" || quote1 == "")
			) {
				poolName =
					base1 + "/??? " + description(isHeated ? hRate : cRate)
				return poolName
			} else if (quote1 == "N/A" || quote1 == "") {
				// if quote1 is "N/A", set poolName to be base1/base2
				poolName =
					base1 +
					"/" +
					base2 +
					" " +
					description(isHeated ? hRate : cRate)
				return poolName
			} else {
				// otherwise, set poolName to be base1/quote1
				poolName =
					base1 +
					"/" +
					quote1 +
					" " +
					description(isHeated ? hRate : cRate)
				return poolName
			}
		} catch (error) {
			console.error(error)
			return "N/A" // return default value when the hexToUtf8 throws an error
		}
	}
	const symbol = () => {
		// returns the featured asset
		const base1 = splitPair(pool.basePriceFeedKey, 0)
		const quote1 = splitPair(pool.quotePriceFeedKey, 0)
		if (quote1 && quote1 != "") {
			// if quote1 exists, it is the featured asset
			return quote1
		}
		// if quote1 doesn't exist, base1 is the featured asset
		return base1
	}

	const target = () => {
		// returns the asset opposite of the featured asset
		const base1 = splitPair(pool.basePriceFeedKey, 0)
		const base2 = splitPair(pool.basePriceFeedKey, 1)
		const quote1 = splitPair(pool.quotePriceFeedKey, 0)
		if (symbol() == base1) {
			// if base1 is the featured asset, base2 is the target
			return base2
		} else if (symbol() == quote1) {
			// if quote1 is the featured asset, base1 is the target
			return base1
		}
	}

	const underlying = () => {
		return splitPair(pool.basePriceFeedKey, 0)
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

	const convertHex = function (hexVal, decimals) {
		// only proceed if pair is a hex value and is not equal to "0x0"
		try {
			// convert the hex value to a string and split it into parts
			const val = web3.utils.hexToNumber(hexVal)
			if (decimals && decimals != 0) {
				val = val / 10 ** decimals
			}
			return val
		} catch (error) {
			console.error(error)
			return 0 // return default value
		}
	}

	const convertRate = function (rate) {
		let convertedRate
		if (rate && rate != "0x0") {
			try {
				// convert int to readable value (f.e. "5x")
				convertedRate = parseInt(rate) / 10 ** 12 + 1
				convertedRate = Math.abs(convertedRate)
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

	return (
		<div>
			<div className="relative bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
				<HeatLevel
					leverage={isHeated ? hRate : cRate}
					width="30px"
					height="30px"
				/>
				<div className="justify-center flex pb-4">
					<AssetImage
						symbol={symbol()}
						target={target()}
						leverage={isHeated ? hRate : cRate}
						width="100"
						height="100"
					/>
				</div>
				<div className="whitespace-nowrap overflow-hidden text-ellipsis">
					{name()}
				</div>
				<div className="whitespace-nowrap overflow-hidden text-ellipsis">
					{symbol() == "JPY" ? (
						<div>
							{priceFeed().toFixed(0)} {symbol}
						</div>
					) : symbol() == "BTC" ? (
						<div>
							{priceFeed().toFixed(3)} {symbol}
						</div>
					) : symbol() == "XAU" ? (
						<div>{priceFeed().toFixed(3)}/oz</div>
					) : (
						<div>${priceFeed().toFixed(2)}</div>
					)}
				</div>
				{hEth(5) != "" ? (
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						Heated: {hEth(5)} ETH
					</div>
				) : (
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						<></>
					</div>
				)}
				<div className="whitespace-nowrap overflow-hidden text-ellipsis">
					Cooled: {cEth(5)} ETH
				</div>
				{hEth(5) != "" ? (
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						<></>
					</div>
				) : (
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						&nbsp;
					</div>
				)}
				<div className="whitespace-nowrap overflow-hidden text-ellipsis">
					&nbsp;
				</div>
				<div className="grid grid-cols-2">
					<div className="pr-1">
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
							// disabled={
							// 	daiStakedBalance <= 0 ||
							// 	isUnstaking ||
							// 	isStaking
							// }
							// onClick={async () => {
							// 	setToken(daiToken)
							// 	setIsUnstaking(true)
							// }}
							onClick={async () => {
								setOpen(true)
							}}
						>
							Deposit
							{/* {isUnstaking && token == daiToken ? (
									<div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
								) : (
									"Unstake All"
								)} */}
						</button>
					</div>
					<div className="pl-1">
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
							// disabled={
							// 	daiValue == 0 ||
							// 	daiValue == "" ||
							// 	isUnstaking ||
							// 	isStaking
							// }
							onClick={async () => {
								setWithdrawOpen(true)
							}}
						>
							{" "}
							Withdraw
							{/* {isStaking && daiValue > 0 ? (
									<div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
								) : (
									"Stake Tokens"
								)} */}
						</button>
					</div>
				</div>
			</div>
			<Balances
				name={name()}
				balance={userBal(5)}
				convertedBal={userBal(5) * priceFeed()}
				contract={0}
				symbol={symbol()}
				target={target()}
				leverage={isHeated ? hRate : cRate}
				underlying={underlying()}
			/>
			<Deposit
				isOpen={open}
				onClose={() => setOpen(false)}
				symbol={symbol()}
				target={target()}
				leverage={isHeated ? hRate : cRate}
				name={name()}
				hEth={hEth(5)}
				cEth={cEth(5)}
				userBal={userBal(5)}
				contract={contract}
				poolId={poolId}
				isHeated={isHeated}
				isCooled={isCooled}
				priceFeed={priceFeed()}
				walletBal={walletBal}
			/>
			<Withdrawal
				isOpen={withdrawOpen}
				withdrawClose={() => setWithdrawOpen(false)}
				symbol={symbol()}
				target={target()}
				leverage={isHeated ? hRate : cRate}
				name={name()}
				hEth={hEth(5)}
				cEth={cEth(5)}
				userBal={userBal(5)}
				contract={contract}
				poolId={poolId}
				isHeated={isHeated}
				isCooled={isCooled}
				priceFeed={priceFeed()}
				walletBal={walletBal}
			/>
		</div>
	)
}
