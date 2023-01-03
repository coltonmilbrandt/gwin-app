import Image from "next/image"
import AssetImage from "../components/AssetImage"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import { abi } from "../constants/Gwin_abi"
import toast, { Toaster } from "react-hot-toast"
import Web3 from "web3"

const Deposit = ({
	isOpen,
	onClose,
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

	const [depositAmount, setDepositAmount] = useState("")

	// converted values for form submission
	const [convertedPoolId, setConvertedPoolId] = useState("")
	const [convertedDepositAmount, setConvertedDepositAmount] = useState("")
	const [convertedCooledDepositAmount, setConvertedCooledDepositAmount] =
		useState(0)
	const [convertedHeatedDepositAmount, setConvertedHeatedDepositAmount] =
		useState(0)

	// is depositing value for button disable etc.
	const [isDepositing, setIsDepositing] = useState(false)

	// errors to display for form validation
	const [errors, setErrors] = useState({})

	// deposit hook for smart contract
	const {
		runContractFunction: deposit,
		data,
		error,
		isFetching,
		isLoading,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: contract,
		functionName: "depositToTranche",
		params: {
			_poolId: convertedPoolId, // number
			_isCooled: isCooled, // bool
			_isHeated: isHeated, // bool
			_cAmount: convertedCooledDepositAmount, // in Wei
			_hAmount: convertedHeatedDepositAmount, // in Wei
		},
		msgValue: convertedDepositAmount, // in Wei
	})

	// show 'loading...' toast message while processing transaction
	useEffect(() => {
		if (isLoading) {
			toast.loading("Transaction in progress...", {
				position: "top-center",
				autoClose: false,
				hideProgressBar: true,
				closeOnClick: false,
				pauseOnHover: false,
				draggable: false,
			})
		} else {
			toast.dismiss()
		}
	}, [isLoading])

	// show 'success' or 'error' message after processing transaction
	useEffect(() => {
		if (error) {
			toast.error(`Error: ${error.message}`, {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			})
		} else if (data) {
			toast.success("Transaction completed successfully!", {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			})
		}
	}, [error, data])

	useEffect(() => {
		console.log(convertedPoolId)
		console.log(isCooled)
		console.log(isHeated)
		console.log(convertedCooledDepositAmount)
		console.log(convertedHeatedDepositAmount)
		console.log(convertedDepositAmount)
	}, [convertedCooledDepositAmount, convertedDepositAmount, convertedPoolId])

	///////////   Toast Messsage Updates   ////////////

	const handleDepositSuccess = async (tx) => {
		// if deposit success wait
		await tx.wait(1)
		// // show toast message
		// toast.success("Successfully Staked!")
		// end depositing process
		setIsDepositing(false)
		// close modal
		onClose()
	}

	const handleDepositError = async (error) => {
		// if deposit error, log error
		console.log(error)
		// // show toast message
		// toast.error(
		// 	"Uh oh! The deposit did not process. Check console for details."
		// )
		// end deposit
		setIsDepositing(false)
		// close modal
		onClose()
	}

	useEffect(() => {
		// convert poolId from hex
		if (typeof poolId != "undefined" && poolId != "") {
			const poolIdConverted = poolId.toNumber()
			setConvertedPoolId(poolIdConverted)
		}
	}, [])

	useEffect(() => {
		// convert user entered values for smart contract
		if (
			// check whether value exists
			typeof depositAmount != "undefined" &&
			depositAmount != "" &&
			depositAmount != 0
		) {
			// get deposit amount
			const convertedAmount = depositAmount
			// change to string
			const amountString = convertedAmount.toString()
			// convert to Wei
			const weiAmount = web3.utils.toWei(amountString, "ether")
			setConvertedDepositAmount(weiAmount)
			if (isHeated == true) {
				// set converted heated amount for submit
				setConvertedHeatedDepositAmount(weiAmount)
				setConvertedCooledDepositAmount(0)
			} else {
				// set converted cooled amount for submit
				setConvertedCooledDepositAmount(weiAmount)
				setConvertedHeatedDepositAmount(0)
			}
		}
	}, [depositAmount])

	const validateForm = () => {
		// create error object
		let newErrors = {}
		if (!depositAmount) {
			newErrors.amount = "Amount is required"
		} else {
			if (depositAmount <= 0) {
				// add to error object
				newErrors.amount = "Amount must be greater than zero"
			}
		}
		if (typeof convertedPoolId == "undefined") {
			// add to error object
			newErrors.poolId = "Pool ID is invalid"
		}
		// set errors
		setErrors(newErrors)
		// if no errors, return true
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e) => {
		// prevent default HTML form behavior
		e.preventDefault()
		// if form passes validation
		if (validateForm()) {
			try {
				setIsDepositing(true) // set depositing to true, disables buttons etc.
				// call smart contract to deposit
				deposit({
					// handle success or error with toast messages
					onSuccess: handleDepositSuccess,
					onError: (error) => handleDepositError(error),
				}).then(() => setIsDepositing(false)) // set depositing to false
			} catch (err) {
				console.error(err)
				handleDepositError(err) // toast
			}
		}
	}

	const getTargetConvertedAmount = () => {
		// applies proper symbol and formatting to non-ETH withdrawal amount
		return symbol == "JPY"
			? (depositAmount * priceFeed).toFixed(0)
			: symbol == "BTC"
			? (depositAmount * priceFeed).toFixed(6)
			: symbol == "XAU"
			? (depositAmount * priceFeed).toFixed(2)
			: (symbol == "ETH" && target == "USD") ||
			  (symbol == "USD" && target == "ETH")
			? "$" + (depositAmount * priceFeed).toFixed(2)
			: (depositAmount * priceFeed).toFixed(5)
	}

	// keep modal closed until isOpen is true
	if (isOpen == false) return null
	return (
		<>
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
									Deposit to {name}
								</div>
							</h5>
							<button
								type="button"
								className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => onClose()}
							></button>
						</div>
						{/* begin form */}
						<form onSubmit={handleSubmit}>
							{/* ETH wallet balance */}
							<div className="modal-body relative p-4">
								<div className="grid grid-cols-5">
									<div className="col-span-3" />
									<span className="text-sm sm:text-base col-span-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-indigo-500 text-white rounded">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
											className="w-7 h-7 inline-block"
										>
											<path
												className="color-white"
												fill="#fff"
												d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 336c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
											/>
										</svg>
										&nbsp;&nbsp;{walletBal.toFixed(5)} ETH
									</span>
								</div>
								<div className="form-group mb-6">
									{errors.poolId && (
										<div className="text-red-500">
											{errors.poolId}
										</div>
									)}
									<label
										htmlFor="depositAmount1"
										className="form-label inline-block mb-2 text-gray-700"
									>
										Deposit Amount
									</label>
									{/* buttons to set amounts by percentage for ease of use */}
									<div className="grid grid-cols-5 pb-3">
										<div className="col">
											<button
												type="button"
												className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													setDepositAmount(
														Number(walletBal * 0.1)
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
													setDepositAmount(
														Number(walletBal * 0.25)
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
													setDepositAmount(
														Number(walletBal * 0.5)
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
													setDepositAmount(
														Number(walletBal * 0.75)
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
													setDepositAmount(
														Number(walletBal)
													)
												}
											>
												100%
											</button>
										</div>
									</div>
									{/* deposit amount in ETH input */}
									{depositAmount == walletBal ? (
										<div className="text-red-500">
											Make sure you have enough ETH left
											for gas fees.
										</div>
									) : null}
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
												placeholder="Deposit Amount (ether)"
												max={Number(walletBal)}
												onChange={(e) => {
													setDepositAmount(
														Number(e.target.value)
													)
												}}
												onInput={(e) => {
													setDepositAmount(
														Number(e.target.value)
													)
												}}
												value={depositAmount}
												required
											/>
										</div>
										<div
											className="col-span-1 block text-center 
												text-white												
												bg-indigo-500
												w-full
												px-3
												py-1.5
												text-sm sm:text-base
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
									{/* deposit amount in USD */}
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
									onClick={() => onClose()}
									disabled={isDepositing == true}
								>
									Close
								</button>
								{/* SUBMIT - deposit button */}
								<button
									onSubmit={() => handleSubmit}
									type="submit"
									disabled={
										depositAmount == 0 ||
										isDepositing == true
									}
									className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
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
