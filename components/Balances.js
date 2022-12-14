import Image from "next/image"
import Price from "../components/Price"

export default function Balances(props) {
	const name = props.name
	const balance = props.balance
	const convertedBal = props.convertedBal
	const tokenPic = props.tokenPic
	const symbol = props.symbol
	return (
		<div className="grid grid-cols-7 bg-sky-50 m-3 mb-6 shadow-lg p-4 rounded-lg text-gray-600">
			<div className="flex flex-col col-span-2 items-center justify-center pr-4">
				<Image
					src={tokenPic}
					className="bg-white rounded-full"
					width="50px"
					height="50px"
					alt={name}
				/>
			</div>
			<div className="grid col-span-5 grid-cols-7 text-sm sm:text-base">
				<div className="flex col-span-4 flex-col">
					<b>User Balance:</b>
				</div>
				<div className="col-span-3 flex flex-col text-right">
					{balance} {name}
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
