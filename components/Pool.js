import Image from "next/image"
import Price from "../components/Price"
import Balances from "../components/Balances"
import Deposit from "../components/Deposit"
import { useState, useEffect } from "react"

export default function Pool(props) {
	const tokenPic = props.tokenPic
	const name = props.name
	const hEth = props.hEth
	const cEth = props.cEth
	const userBal = props.userBal
	const contract = props.contract
	const poolId = props.poolId
	const priceFeed = props.priceFeed
	const walletBal = props.walletBal

	const [open, setOpen] = useState(false)

	return (
		<div>
			<div className="bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
				<div class="justify-center flex pb-4">
					<Image
						src={tokenPic}
						class="bg-white rounded-full"
						width="100px"
						height="100px"
						alt="/"
					/>
				</div>
				<div class="whitespace-nowrap overflow-hidden text-ellipsis">
					{name} - ${priceFeed.toFixed(2)}
				</div>
				{hEth != "" ? (
					<div class="whitespace-nowrap overflow-hidden text-ellipsis">
						Heated: {hEth} ETH
					</div>
				) : (
					<div class="whitespace-nowrap overflow-hidden text-ellipsis">
						<></>
					</div>
				)}
				<div class="whitespace-nowrap overflow-hidden text-ellipsis">
					Cooled: {cEth} ETH
				</div>
				{hEth != "" ? (
					<div class="whitespace-nowrap overflow-hidden text-ellipsis">
						<></>
					</div>
				) : (
					<div class="whitespace-nowrap overflow-hidden text-ellipsis">
						&nbsp;
					</div>
				)}
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
							onClick={async () => {}}
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
				name="ETH"
				balance={userBal}
				convertedBal={userBal * priceFeed}
				price="price"
				tokenPic={tokenPic}
				contract={0}
			/>
			<Deposit
				isOpen={open}
				onClose={() => setOpen(false)}
				tokenPic={tokenPic}
				name={name}
				hEth={hEth}
				cEth={cEth}
				userBal={userBal}
				contract={contract.address}
				poolId={poolId}
				priceFeed={priceFeed}
				walletBal={walletBal}
			/>
		</div>
	)
}
