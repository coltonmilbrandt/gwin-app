import Image from "next/image"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import { abi } from "../constants/Gwin_abi"
import toast, { Toaster } from "react-hot-toast"

const Withdraw = ({
	isOpen,
	withdrawClose,
	tokenPic,
	name,
	hEth,
	cEth,
	userBal,
	contract,
	poolId,
	isHeated,
	isCooled,
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
	const [withdrawalAmount, setWithdrawalAmount] = useState(0)
	const [cooledWithdrawalAmount, setCooledWithdrawalAmount] = useState(0)
	const [heatedWithdrawalAmount, setHeatedWithdrawalAmount] = useState(0)
	const contractAddress = "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d"

	const [isWithdrawing, setisWithdrawing] = useState(false)
	const [withdrawOpen, setWithdrawOpen] = useState(false)
	const [withdrawAll, setWithdrawAll] = useState(false)

	const {
		runContractFunction: withdraw,
		data: enterTxResponse,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: contractAddress,
		functionName: "withdrawFromTranche",
		params: {
			_poolId: poolId,
			_isCooled: isCooled,
			_isHeated: isHeated,
			_cAmount: Moralis.Units.ETH(cooledWithdrawalAmount),
			_hAmount: Moralis.Units.ETH(heatedWithdrawalAmount),
			_isAll: withdrawAll,
		},
	})

	///////////   Toast Messsage Updates   ////////////

	const handleWithdrawalSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Successfully Withdrawn!")
		// await updateUIValues()
		// await getTokenBalances()
		setisWithdrawing(false)
		withdrawClose()
	}

	const handleWithdrawalError = async (error) => {
		console.log(error)
		toast.error(
			"Uh oh! The withdrawal did not process. Check console for details."
		)
		setisWithdrawing(false)
		withdrawClose()
	}

	const handleUnstakeSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Tokens successfully unstaked!")
		getTokenBalances()
	}

	const handleError = async (error) => {
		console.log(error)
		toast.error(
			"Uh oh! Tx could not be approved. Check console for details."
		)
	}

	function setWithdrawals(bal, isAllEth) {
		console.log("cooled: " + isCooled)
		console.log("heated: " + isHeated)
		setWithdrawAll(isAllEth)
		setWithdrawalAmount(bal)
		console.log(withdrawalAmount)
		if (isCooled == "true") {
			setCooledWithdrawalAmount(bal)
			console.log("didCooled")
		} else if (isHeated == "true") {
			setHeatedWithdrawalAmount(bal)
			console.log("didHeated")
		}
		console.log("cooledWith " + cooledWithdrawalAmount)
		console.log("heatedWith " + heatedWithdrawalAmount)
		console.log(withdrawalAmount)
	}

	useEffect(() => {
		async function handleWithdrawing() {
			setWithdrawals(withdrawalAmount, withdrawAll)
			console.log("isWithdrawing: " + isWithdrawing)
			if (isWithdrawing == true) {
				try {
					console.log(Moralis.Units.ETH(withdrawalAmount))
					console.log(poolId)
					console.log(isCooled)
					console.log(isHeated)
					console.log(Moralis.Units.ETH(cooledWithdrawalAmount))
					console.log(Moralis.Units.ETH(heatedWithdrawalAmount))
					await withdraw({
						onSuccess: handleWithdrawalSuccess,
						onError: (error) => handleWithdrawalError(error),
					})
				} catch (err) {
					console.error(err)
				}
			} else {
				setisWithdrawing(false)
			}
		}
		if (isWithdrawing == true) {
			handleWithdrawing()
		}
	}, [isWithdrawing])

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
								<div class="col-span-5 font-bold pl-3 align-middle m-auto justify-center">
									Withdraw from {name}
									{/* {contractAddress} */}
								</div>
							</h5>
							<button
								type="button"
								class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => withdrawClose()}
							></button>
						</div>
						<div class="modal-body relative p-4">
							{contract}
							<div class="grid grid-cols-5">
								<div class="col-span-3" />
								<span class="text-md col-span-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-middle font-bold bg-indigo-500 text-white rounded">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
										class="w-6 h-6 inline-block"
									>
										<path
											class="color-white"
											fill="#fff"
											d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
										/>
									</svg>
									&nbsp;&nbsp;{Number(userBal).toFixed(5)} ETH
								</span>
							</div>
							{Number(userBal) == 0 ? (
								<div
									class="bg-red-100 mt-3 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
									role="alert"
								>
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="times-circle"
										class="w-4 h-4 mr-2 fill-current"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
										></path>
									</svg>
									You do not have any funds deposited to this
									pool.
								</div>
							) : null}
							<div class="form-group mb-6">
								<label
									htmlFor="exampleInputEmail1"
									class="form-label inline-block mb-2 text-gray-700"
								>
									Withdrawal Amount
									{/* isHeated - {isHeated} -
									isCooled - {isCooled} -
									cooledWithdrawalAmount -{" "}
									{cooledWithdrawalAmount}
									heatedWithdrawalAmount -{" "}
									{heatedWithdrawalAmount} isAll-
									{withdrawAll.toString()} */}
								</label>
								<div class="grid grid-cols-5 pb-3">
									<div class="col">
										<button
											type="button"
											class="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
											onClick={() =>
												setWithdrawals(
													Number(userBal) * 0.1,
													false
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
												setWithdrawals(
													Number(userBal) * 0.25,
													false
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
												setWithdrawals(
													Number(userBal) * 0.5,
													false
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
												setWithdrawals(
													Number(userBal) * 0.75,
													false
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
												setWithdrawals(
													Number(userBal),
													true
												)
											}
										>
											100%
										</button>
									</div>
								</div>
								<div class="grid grid-cols-5 py-3">
									<div class="col-span-4">
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
												rounded-l
												transition
												ease-in-out
												m-0
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
											placeholder="Withdrawal Amount (ether)"
											max={Number(userBal)}
											onChange={(e) => {
												setWithdrawalAmount(
													Number(e.target.value)
												)
											}}
											onInput={(e) => {
												setWithdrawalAmount(
													Number(e.target.value)
												)
												setWithdrawals(
													withdrawalAmount,
													false
												)
											}}
											value={withdrawalAmount}
											required
										/>
									</div>
									<div
										class="col-span-1 block text-center 
												text-white												
												bg-indigo-500
												w-full
												px-3
												py-1.5
												text-base
												font-bold
												bg-clip-padding
											 	border-y border-r border-solid border-indigo-600 rounded-r"
									>
										ETH
									</div>
								</div>

								<div class="grid grid-cols-5">
									<div class="col-span-4">
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
											rounded-l
											transition
											ease-in-out
											m-0
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
											placeholder="USD Amount"
											value={(
												withdrawalAmount * priceFeed
											).toFixed(2)}
											disabled
										/>
									</div>
									<div
										class="col-span-1 block text-center 
												text-white												
												bg-teal-400
												w-full
												px-3
												py-1.5
												text-base
												font-bold
												bg-clip-padding
											 	border-y border-r border-solid border-teal-500 rounded-r"
									>
										$ USD
									</div>
								</div>

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
								onClick={() => withdrawClose()}
								disabled={isWithdrawing == true}
							>
								Close
							</button>
							<button
								// type="submit"
								onClick={() => setisWithdrawing(true)}
								disabled={
									withdrawalAmount == 0 ||
									isWithdrawing == true
								}
								class="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
							>
								Withdraw
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Withdraw
