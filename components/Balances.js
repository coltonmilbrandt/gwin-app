import Image from "next/image"
import AssetImage from "../components/AssetImage"
import Price from "../components/Price"

export default function Balances(props) {
	const name = props.name
	const balance = props.balance
	const convertedBal = props.convertedBal
	const tokenPic = props.tokenPic
	const symbol = props.symbol
	const target = props.target
	const leverage = props.leverage
	const underlying = props.underlying
	return (
		<div className="grid grid-cols-7 bg-sky-50 m-3 mb-6 shadow-lg p-4 rounded-lg text-gray-600">
			<div className="flex flex-col col-span-2 items-center justify-center pr-4">
				<AssetImage
					symbol={symbol}
					target={target}
					leverage={leverage}
					width="60"
					height="60"
				/>
			</div>
			<div className="grid col-span-5 grid-cols-7 text-sm sm:text-base">
				<div className="flex col-span-4 flex-col">
					<b>User Balance:</b>
				</div>
				<div className="col-span-3 flex flex-col text-right">
					{balance} {underlying}
				</div>
				<div className="col-span-7 flex flex-col text-right">
					{symbol == "JPY" ? (
						<div>
							{convertedBal.toFixed(0)} {symbol}
						</div>
					) : symbol == "BTC" ? (
						<div>
							{convertedBal.toFixed(5)} {symbol}
						</div>
					) : symbol == "XAU" ? (
						<div>
							{convertedBal.toFixed(2)} {symbol}
						</div>
					) : (
						<div>${convertedBal.toFixed(2)}</div>
					)}
				</div>
			</div>
		</div>
	)
}
