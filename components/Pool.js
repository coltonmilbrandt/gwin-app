import Image from "next/image"
import Price from "../components/Price"
import Balances from "../components/Balances"

export default function Pool(props) {
	const name = props.name
	const wallet = props.wallet
	const staked = props.staked
	const price = props.price
	const tokenPic = props.tokenPic
	const contract = props.contract
	return (
		<div>
			<div className="bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
				<div class="justify-center flex pb-4">
					<Image
						src="/../public/dai.png"
						class="bg-white rounded-full"
						width="100px"
						height="100px"
						alt="/"
					/>
				</div>
				<div class="whitespace-nowrap overflow-hidden text-ellipsis">
					ETH/USD 10x Pool - $
				</div>
				<div class="whitespace-nowrap overflow-hidden text-ellipsis">
					Heated: ETH
				</div>
				<div class="whitespace-nowrap overflow-hidden text-ellipsis">
					Cooled: ETH
				</div>
				<form>
					<div class="flex justify-center">
						<div class="mb-3 w-full">
							<input
								required
								type="number"
								class="
                                    form-control
                                    block
                                    w-full
                                    px-3
                                    py-1.5
                                    text-base
                                    font-normal
                                    text-gray-700
                                    bg-white bg-clip-padding
                                    border border-solid border-gray-300
                                    rounded
                                    transition
                                    ease-in-out
                                    m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                                    "
								id="exampleNumber0"
								placeholder="DAI to Stake"
								value=""
								onInput={(e) => {}}
							/>
						</div>
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
							>
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
								{/* {isStaking && daiValue > 0 ? (
									<div className="animate-spin spinner-border h-6 w-6 border-b-2 rounded-full"></div>
								) : (
									"Stake Tokens"
								)} */}
							</button>
						</div>
					</div>
				</form>
			</div>
			<Balances
				name="ETH"
				wallet={0}
				staked={0}
				price="price"
				tokenPic="/../public/dai.png"
				contract={0}
			/>
		</div>
	)
}
