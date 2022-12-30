import AssetImage from "../components/AssetImage"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import { abi } from "../constants/Gwin_abi"
import toast, { Toaster } from "react-hot-toast"
import React from "react"
import Web3 from "web3"

// Withdraw modal to initiate a withdrawal from a pool

const Withdrawal = ({
	isOpen,
	withdrawClose,
	symbol,
	target,
	leverage,
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
	// initialize Moralis web hooks
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	// get chain and convert
	const chainId = parseInt(chainIdHex)
	const chainName = chainDict[chainId]

	let web3 = new Web3()

	const [withdrawalAmount, setWithdrawalAmount] = useState("")
	const [convertedPoolId, setConvertedPoolId] = useState("")
	const contractAddress = contract
	const [convertedWithdrawalAmount, setConvertedWithdrawalAmount] =
		useState(0)
	const [
		convertedCooledWithdrawalAmount,
		setConvertedCooledWithdrawalAmount,
	] = useState(0)
	const [
		convertedHeatedWithdrawalAmount,
		setConvertedHeatedWithdrawalAmount,
	] = useState(0)

	const [isWithdrawing, setisWithdrawing] = useState(false)
	const [withdrawOpen, setWithdrawOpen] = useState(false)
	const [withdrawAll, setWithdrawAll] = useState(false)
	const [errors, setErrors] = useState({})

	useEffect(() => {
		// convert poolId from hex
		if (typeof poolId != "undefined" && poolId != "") {
			const poolIdConverted = poolId.toNumber()
			setConvertedPoolId(poolIdConverted)
		}
	}, [])

	useEffect(() => {
		// check whether value exists
		if (
			typeof withdrawalAmount != "undefined" &&
			withdrawalAmount != "" &&
			withdrawalAmount != 0
		) {
			// get withdrawal amount
			const convertedAmount = withdrawalAmount
			// change to string
			const amountString = convertedAmount.toString()
			// convert to Wei
			const weiAmount = web3.utils.toWei(amountString, "ether")
			if (isHeated == true) {
				// set converted heated amount for submit
				setConvertedHeatedWithdrawalAmount(weiAmount)
				setConvertedCooledWithdrawalAmount(0)
			} else {
				// set converted cooled amount for submit
				setConvertedCooledWithdrawalAmount(weiAmount)
				setConvertedHeatedWithdrawalAmount(0)
			}
		}
	}, [withdrawalAmount, withdrawAll])

	const getTargetConvertedAmount = () => {
		// applies proper symbol and formatting to non-ETH withdrawal amount
		return symbol == "JPY"
			? (withdrawalAmount * priceFeed).toFixed(0)
			: symbol == "BTC"
			? (withdrawalAmount * priceFeed).toFixed(6)
			: symbol == "XAU"
			? (withdrawalAmount * priceFeed).toFixed(2)
			: (symbol == "ETH" && target == "USD") ||
			  (symbol == "USD" && target == "ETH")
			? "$" + (withdrawalAmount * priceFeed).toFixed(2)
			: (withdrawalAmount * priceFeed).toFixed(5)
	}

	const validateForm = () => {
		console.log("form details: ")
		console.log(convertedPoolId)
		console.log(isCooled)
		console.log(isHeated)
		console.log(convertedCooledWithdrawalAmount)
		console.log(convertedHeatedWithdrawalAmount)
		console.log(withdrawAll)
		let newErrors = {}
		if (!withdrawalAmount) {
			newErrors.amount = "Amount is required"
		} else {
			if (withdrawalAmount <= 0) {
				newErrors.amount = "Amount must be greater than zero"
			}
		}
		if (typeof convertedPoolId == "undefined") {
			newErrors.poolId = "Pool ID is invalid"
		}
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	useEffect(() => {
		console.log("form details: ")
		console.log(convertedPoolId)
		console.log(isCooled)
		console.log(isHeated)
		console.log(convertedCooledWithdrawalAmount)
		console.log(convertedHeatedWithdrawalAmount)
		console.log(withdrawAll)
	}, [
		convertedCooledWithdrawalAmount,
		convertedHeatedWithdrawalAmount,
		withdrawAll,
	])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm()) {
			console.log("form details: ")
			console.log(convertedPoolId)
			console.log(isCooled)
			console.log(isHeated)
			console.log(convertedCooledWithdrawalAmount)
			console.log(convertedHeatedWithdrawalAmount)
			console.log(withdrawAll)
			try {
				setisWithdrawing(true) // set withdrawing to true, disables buttons etc.
				// call smart contract to withdraw
				withdraw({
					// handle success or error with toast messages
					onSuccess: handleWithdrawalSuccess,
					onError: (error) => handleWithdrawalError(error),
				}).then(() => setisWithdrawing(false)) // set withdrawing to false
			} catch (err) {
				console.error(err)
				handleWithdrawalError(err) // toast
			}
		}
	}

	const setWithdrawal = (isAll, amount) => {
		if (isAll) {
			// set withdraw to entire deposited amount
			setWithdrawAll(true)
			// set withdraw amount to entire userBal
			setWithdrawalAmount(Number(userBal))
		} else {
			// set withdraw as partial amount
			setWithdrawAll(false)
			// set withdrawal to partial amount
			setWithdrawalAmount(amount)
		}
	}

	// withdraw hook for smart contract
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
			_poolId: convertedPoolId, // number
			_isCooled: isCooled, // bool
			_isHeated: isHeated, // bool
			_cAmount: convertedCooledWithdrawalAmount, // in Wei
			_hAmount: convertedHeatedWithdrawalAmount, // in Wei
			_isAll: withdrawAll, // bool
		},
	})

	///////////   Toast Messsage Updates   ////////////

	const handleWithdrawalSuccess = async (tx) => {
		// if withdraw success, wait
		await tx.wait(1)
		// show toast message
		toast.success("Successfully Withdrawn!")
		// set withdrawing to false
		setisWithdrawing(false)
		// close modal
		withdrawClose()
	}

	const handleWithdrawalError = async (error) => {
		// if withdrawal has error, log error
		console.log(error)
		// show toast message
		toast.error(
			"Uh oh! The withdrawal did not process. Check console for details."
		)
		// end withdrawal process
		setisWithdrawing(false)
		// close modal
		withdrawClose()
	}

	// keep modal closed until isOpen is true
	if (isOpen == false) return null
	return (
		<>
			{/* modal */}
			<div
				className="modal backdrop-blur-sm fixed bg-black bg-opacity-10 top-0 z-10 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
				id="exampleModalCenter"
				tabIndex="-2"
				aria-labelledby="exampleModalCenterTitle"
				aria-modal="true"
				aria-hidden="true"
				role="dialog"
			>
				<div className="modal-dialog modal-dialog-centered relative max-w-lg pointer-events-none">
					<div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-lg outline-none text-current">
						<div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
							<h5
								className="text-xl grid grid-cols-6 font-medium leading-normal text-gray-800"
								id="exampleModalScrollableLabel"
							>
								<div className="m-auto">
									{/* featured asset image */}
									<AssetImage
										symbol={symbol}
										target={target}
										leverage={leverage}
										width="60"
										height="60"
									/>
								</div>
								<div className="col-span-5 font-bold pl-3 align-middle m-auto justify-center">
									Withdraw from {name}
								</div>
							</h5>
							{/* close modal button */}
							<button
								type="button"
								className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => withdrawClose()}
							></button>
						</div>
						{/* begin form */}
						<form onSubmit={handleSubmit}>
							<div className="modal-body relative p-4">
								<div className="grid grid-cols-5">
									<div className="col-span-3" />
									<span className="text-sm sm:text-base col-span-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-middle font-bold bg-indigo-500 text-white rounded">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											className="w-6 h-6 inline-block"
										>
											<path
												className="color-white"
												fill="#fff"
												d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
											/>
										</svg>
										&nbsp;&nbsp;{Number(userBal).toFixed(5)}{" "}
										ETH
									</span>
								</div>
								{/* if user balance is zero, show warning */}
								{Number(userBal) == 0 ? (
									<div
										className="bg-red-100 mt-3 rounded-lg py-5 px-6 mb-3 text-base text-red-700 inline-flex items-center w-full"
										role="alert"
									>
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="fas"
											data-icon="times-circle"
											className="w-4 h-4 mr-2 fill-current"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											<path
												fill="currentColor"
												d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
											></path>
										</svg>
										You do not have any funds deposited to
										this pool.
									</div>
								) : null}
								<div className="form-group mb-6">
									{errors.poolId && (
										<div className="text-red-500">
											{errors.poolId}
										</div>
									)}
									<label
										htmlFor="exampleInputEmail1"
										className="form-label inline-block mb-2 text-gray-700"
									>
										Withdrawal Amount
									</label>
									{/* buttons to set amounts by percentage for ease of use */}
									<div className="grid grid-cols-5 pb-3">
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setWithdrawal(
														false,
														Number(userBal) * 0.1
													)
												}
											>
												10%
											</button>
										</div>
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setWithdrawal(
														false,
														Number(userBal) * 0.25
													)
												}
											>
												25%
											</button>
										</div>
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setWithdrawal(
														false,
														Number(userBal) * 0.5
													)
												}
											>
												50%
											</button>
										</div>
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setWithdrawal(
														false,
														Number(userBal) * 0.75
													)
												}
											>
												75%
											</button>
										</div>
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-r shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setWithdrawal(
														true,
														Number(userBal)
													)
												}
											>
												100%
											</button>
										</div>
									</div>
									{/* withdrawal amount in ETH input */}
									<div className="grid grid-cols-5 py-3">
										<div className="col-span-4">
											<input
												type="number"
												className="form-control
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
												}}
												value={withdrawalAmount}
												required
											/>
										</div>
										<div
											className="text-sm sm:text-base col-span-1 block text-center 
												text-white												
												bg-indigo-500
												w-full
												px-3
												py-1.5
												font-bold
												bg-clip-padding
											 	border-y border-r border-solid border-indigo-600 rounded-r"
										>
											ETH
										</div>
										{errors.amount && (
											<div className="text-red-500">
												{errors.amount}
											</div>
										)}
									</div>
									{/* withdrawal amount in USD */}
									<div className="grid grid-cols-5">
										<div className="col-span-4">
											<input
												type="text"
												className="form-control
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
												aria-describedby="nonEthAmount"
												placeholder="Asset amount"
												value={
													// format balance according to converted target balance
													getTargetConvertedAmount()
												}
												disabled
											/>
										</div>
										<div
											className="col-span-1 block text-center 
												text-white												
												bg-teal-400
												w-full
												px-3
												py-1.5
												text-sm sm:text-base 
												font-bold
												bg-clip-padding
											 	border-y border-r border-solid border-teal-500 rounded-r"
										>
											{symbol == "ETH" ? target : symbol}
										</div>
									</div>
								</div>
							</div>
							{/* footer */}
							<div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
								{/* close button */}
								<button
									type="button"
									className="inline-block px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
									data-bs-dismiss="modal"
									onClick={() => withdrawClose()}
								>
									Close
								</button>
								{/* SUBMIT - withdraw button */}
								<button
									onSubmit={() => handleSubmit}
									type="submit"
									disabled={
										withdrawalAmount == 0 ||
										isWithdrawing == true
									}
									className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
								>
									Withdraw
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default Withdrawal
