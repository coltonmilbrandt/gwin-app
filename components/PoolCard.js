import Balances from "../components/Balances"
import Deposit from "../components/Deposit"
import Withdrawal from "./Withdrawal"
import AssetImage from "../components/AssetImage"
import HeatLevel from "../components/HeatLevel"
import web3 from "web3"
import { useState, useEffect } from "react"
import splitPair from "../helpers/splitPair"
import target from "../helpers/target"
import featuredSymbol from "../helpers/featuredSymbol"
import getHeat from "../helpers/getHeat"
import convertHex from "../helpers/convertHex"
import generatePoolName from "../helpers/generatePoolName"
import Health from "./Health"
import generateDescription from "../helpers/generateDescription"
import generateChartPair from "../helpers/generateChartPair"

// returns a Pool Card that shows the information for a pool

export default function PoolCard({
	pool,
	handlePoolSelection,
	contract,
	walletBal,
	isHeated,
	isCooled,
	tokenPic,
}) {
	// set values from pool prop
	const poolId = pool.id
	const cRate = pool.cRate
	const hRate = pool.hRate

	// convert hEth value from smart contract
	const hEth = (decimals) => {
		const value = web3.utils.fromWei(pool.hBalancePreview.toString())
		return Number(value).toFixed(decimals)
	}

	// convert cEth value from smart contract
	const cEth = (decimals) => {
		const value = web3.utils.fromWei(pool.cBalancePreview.toString())
		return Number(value).toFixed(decimals)
	}

	// convert User Balance from smart contract
	const userBal = (decimals) => {
		let value
		if (isCooled) {
			value = web3.utils.fromWei(pool.userCEthBalPreview.toString())
		} else if (isHeated) {
			value = web3.utils.fromWei(pool.userHEthBalPreview.toString())
		}
		return Number(value).toFixed(decimals)
	}

	// convert price from smart contract
	const priceFeed = () => {
		return convertHex(pool.currentPrice, 8)
	}
	// generate name based on price feeds
	const name = () => {
		return generatePoolName(
			pool.basePriceFeedKey,
			pool.quotePriceFeedKey,
			isHeated,
			isCooled,
			hRate,
			cRate
		)
	}
	// generate chart pair based on price feeds
	const chartPair = () => {
		return generateChartPair(
			pool.basePriceFeedKey,
			pool.quotePriceFeedKey,
			isHeated,
			isCooled,
			hRate,
			cRate
		)
	}

	const symbol = () => {
		// returns the featured asset
		const symbolLeverage = isHeated ? hRate : cRate
		return featuredSymbol(
			pool.basePriceFeedKey,
			pool.quotePriceFeedKey,
			symbolLeverage
		)
	}

	const targetSymbol = () => {
		// returns the asset opposite of the featured asset
		const targetLeverage = isHeated ? hRate : cRate
		return target(
			pool.basePriceFeedKey,
			pool.quotePriceFeedKey,
			targetLeverage
		)
	}

	const underlying = () => {
		return splitPair(pool.basePriceFeedKey, 0)
	}

	const [open, setOpen] = useState(false)
	const [withdrawOpen, setWithdrawOpen] = useState(false)

	return (
		<div>
			<div className="relative bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
				{/* show heat level as icon */}
				<HeatLevel
					leverage={isHeated ? hRate : cRate}
					width="30px"
					height="30px"
				/>
				<div className="justify-center flex pb-4">
					{/* show featured asset image */}
					<AssetImage
						symbol={symbol()}
						target={targetSymbol()}
						leverage={isHeated ? hRate : cRate}
						width="100"
						height="100"
					/>
				</div>
				<div className="grid grid-cols-2 whitespace-nowrap overflow-hidden text-ellipsis">
					<div
						className="cursor-pointer text-[#6b5ebd] hover:text-indigo-400 transition-all"
						onClick={() =>
							handlePoolSelection(
								poolId,
								pool.parentId,
								name(),
								chartPair()
							)
						}
					>
						<b>
							{generateDescription(
								isHeated ? hRate : cRate,
								isHeated,
								isCooled
							)}{" "}
							{featuredSymbol(
								pool.basePriceFeedKey,
								pool.quotePriceFeedKey,
								isHeated ? hRate : cRate
							)}
						</b>
					</div>
					<div className="text-right">{name()}</div>
				</div>
				<div className="grid grid-cols-2 mt-1">
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						Health:&nbsp;
						<Health
							pool={pool}
							leverage={isHeated ? hRate : cRate}
							hEth={hEth(5)}
							cEth={cEth(5)}
							contract={contract}
							isCooled={isCooled}
							priceFeed={priceFeed()}
						/>
					</div>
					<div className="text-right whitespace-nowrap overflow-hidden text-ellipsis">
						{
							// determine formatting based on symbol
							symbol() == "JPY" ? (
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
							)
						}
					</div>
				</div>

				{/* show balances */}
				<div className="grid grid-cols-2 mt-1">
					<div className="whitespace-nowrap overflow-hidden text-ellipsis">
						<b className="text-[#c9665f]">Heated</b> {hEth(5)} ETH
					</div>
					<div className="text-right whitespace-nowrap overflow-hidden text-ellipsis">
						{cEth(5)} ETH <b className="text-cyan-600">Cooled</b>
					</div>
				</div>
				<div className="whitespace-nowrap overflow-hidden text-ellipsis">
					&nbsp;
				</div>
				<div className="grid grid-cols-2">
					<div className="pr-1">
						{/* deposit button */}
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
							onClick={async () => {
								setOpen(true)
							}}
						>
							Deposit
						</button>
					</div>
					<div className="pl-1">
						{/* withdraw button */}
						<button
							className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#7d71d1] hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-200 disabled:opacity-50 disabled:bg-[#9e92ff]"
							onClick={async () => {
								setWithdrawOpen(true)
							}}
						>
							{" "}
							Withdraw
						</button>
					</div>
				</div>
			</div>
			{/* show user balance */}
			<Balances
				name={name()}
				balance={userBal(5)}
				convertedBal={userBal(5) * priceFeed()}
				contract={0}
				symbol={symbol()}
				target={targetSymbol()}
				leverage={isHeated ? hRate : cRate}
				underlying={underlying()}
			/>
			{/* deposit modal */}
			<Deposit
				isOpen={open}
				onClose={() => setOpen(false)}
				symbol={symbol()}
				target={targetSymbol()}
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
			{/* withdrawal modal */}
			<Withdrawal
				isOpen={withdrawOpen}
				withdrawClose={() => setWithdrawOpen(false)}
				symbol={symbol()}
				target={targetSymbol()}
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
