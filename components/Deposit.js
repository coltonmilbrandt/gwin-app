import Image from "next/image"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"

const Deposit = ({
	isOpen,
	onClose,
	tokenPic,
	name,
	hEth,
	cEth,
	userBal,
	contract,
	poolId,
	priceFeed,
	walletBal,
}) => {
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	const chainId = parseInt(chainIdHex)
	const chainName = chainDict[chainId]
	const [depositAmount, setDepositAmount] = useState(0)

	const [isStaking, setIsStaking] = useState(false)

	const {
		runContractFunction: deposit,
		data: enterTxResponse,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: contract.abi,
		contractAddress: contract.address,
		functionName: "depositToTranche",
		params: {
			_poolId: poolId,
			amount: Moralis.Units.ETH(depositAmount),
		},
	})

	useEffect(() => {
		async function handleStaking() {
			if (isStaking == true) {
				try {
					await approveToken({
						onSuccess: handleSuccess,
						onError: (error) => handleError(error),
					})
				} catch (err) {
					console.error(err)
				}
			} else {
				setIsStaking(false)
			}
		}
		if (isStaking == true) {
			handleStaking()
		}
	}, [isStaking])

	if (isOpen == false) return null
	return (
		<>
			<div
				class="modal backdrop-blur-sm fixed bg-black bg-opacity-10 top-0 z-10 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
				id="exampleModalCenter"
				tabIndex="-2"
				aria-labelledby="exampleModalCenterTitle"
				aria-modal="true"
				aria-hidden="true"
				role="dialog"
			>
				<div class="modal-dialog modal-dialog-centered relative max-w-lg pointer-events-none">
					<div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-lg outline-none text-current">
						<form>
							<div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
								<h5
									class="text-xl grid grid-cols-6 font-medium leading-normal text-gray-800"
									id="exampleModalScrollableLabel"
								>
									<div class="m-auto">
										<Image
											src={tokenPic}
											class="bg-white rounded-full"
											width="50px"
											height="50px"
											alt="/"
										/>
									</div>
									<div class="col-span-5 pl-3 align-middle m-auto justify-center">
										Deposit to {name}
									</div>
								</h5>
								<button
									type="button"
									class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
									data-bs-dismiss="modal"
									aria-label="Close"
									onClick={() => onClose()}
								></button>
							</div>
							<div class="modal-body relative p-4">
								{/* {contract} */}
								<div class="grid grid-cols-5">
									<div class="col-span-3" />
									<span class="text-md col-span-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-500 text-white rounded">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											class="w-7 h-7 inline-block"
										>
											<path
												class="color-white"
												fill="#fff"
												d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 336c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
											/>
										</svg>
										&nbsp;&nbsp;{walletBal.toFixed(5)} ETH
									</span>
								</div>

								<div class="form-group mb-6">
									<label
										htmlFor="exampleInputEmail1"
										class="form-label inline-block mb-2 text-gray-700"
									>
										Deposit Amount
									</label>
									<div class="grid grid-cols-5 pb-3">
										<div class="col">
											<button
												type="button"
												class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(
														walletBal * 0.1
													)
												}
											>
												10%
											</button>
										</div>
										<div class="col">
											<button
												type="button"
												class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(
														walletBal * 0.25
													)
												}
											>
												25%
											</button>
										</div>
										<div class="col">
											<button
												type="button"
												class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(
														walletBal * 0.5
													)
												}
											>
												50%
											</button>
										</div>
										<div class="col">
											<button
												type="button"
												class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(
														walletBal * 0.75
													)
												}
											>
												75%
											</button>
										</div>
										<div class="col">
											<button
												type="button"
												class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(walletBal)
												}
											>
												100%
											</button>
										</div>
									</div>
									<input
										type="number"
										class="form-control
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
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Deposit Amount (ether)"
										max={walletBal}
										onInput={(e) => {
											setDepositAmount(e.target.value)
										}}
										value={depositAmount}
										required
									/>
									{/* <small
										id="emailHelp"
										class="block mt-1 text-xs text-gray-600"
									>
										We'll never share your email with anyone
										else.
									</small> */}
								</div>
								{/* <button
									type="submit"
									class="
											px-6
											py-2.5
											bg-blue-600
											text-white
											font-medium
											text-xs
											leading-tight
											uppercase
											rounded
											shadow-md
											hover:bg-blue-700 hover:shadow-lg
											focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
											active:bg-blue-800 active:shadow-lg
											transition
											duration-150
											ease-in-out"
								>
									Submit
								</button> */}
							</div>
							<div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
								<button
									type="button"
									class="inline-block px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
									data-bs-dismiss="modal"
									onClick={() => onClose()}
								>
									Close
								</button>
								<button
									type="submit"
									disabled={depositAmount == 0}
									class="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
								>
									Deposit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Deposit
