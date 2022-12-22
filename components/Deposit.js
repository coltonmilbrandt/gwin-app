import Image from "next/image"
import AssetImage from "../components/AssetImage"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import { abi } from "../constants/Gwin_abi"
import toast, { Toaster } from "react-hot-toast"

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
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	const chainId = parseInt(chainIdHex)
	const chainName = chainDict[chainId]
	const [depositAmount, setDepositAmount] = useState(0)
	const [cooledDepositAmount, setCooledDepositAmount] = useState(0)
	const [heatedDepositAmount, setHeatedDepositAmount] = useState(0)

	const [isDepositing, setisDepositing] = useState(false)

	const {
		runContractFunction: deposit,
		data: enterTxResponse,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: contract,
		functionName: "depositToTranche",
		params: {
			_poolId: poolId,
			_isCooled: isCooled,
			_isHeated: isHeated,
			_cAmount: Moralis.Units.ETH(cooledDepositAmount),
			_hAmount: Moralis.Units.ETH(heatedDepositAmount),
		},
		msgValue: Moralis.Units.ETH(depositAmount),
	})

	///////////   Toast Messsage Updates   ////////////

	const handleDepositSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Successfully Staked!")
		// await updateUIValues()
		// await getTokenBalances()
		setisDepositing(false)
		onClose()
	}

	const handleDepositError = async (error) => {
		console.log(error)
		toast.error(
			"Uh oh! The deposit did not process. Check console for details."
		)
		setisDepositing(false)
		onClose()
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

	function setDeposits(bal) {
		console.log("cooled: " + isCooled)
		console.log("heated: " + isHeated)
		setDepositAmount(bal)
		console.log(depositAmount)
		if (isCooled == "true") {
			setCooledDepositAmount(bal)
			console.log("didCooled")
		} else if (isHeated == "true") {
			setHeatedDepositAmount(bal)
			console.log("didHeated")
		}
		console.log("cooledDep " + cooledDepositAmount)
		console.log("heatedDep " + heatedDepositAmount)
		console.log(depositAmount)
	}

	useEffect(() => {
		async function handleDepositing() {
			setDeposits(depositAmount)
			console.log("isDepositing: " + isDepositing)
			if (isDepositing == true) {
				try {
					console.log(Moralis.Units.ETH(depositAmount))
					console.log(poolId)
					console.log(isCooled)
					console.log(isHeated)
					console.log(Moralis.Units.ETH(cooledDepositAmount))
					console.log(Moralis.Units.ETH(heatedDepositAmount))
					await deposit({
						onSuccess: handleDepositSuccess,
						onError: (error) => handleDepositError(error),
					})
				} catch (err) {
					console.error(err)
				}
			} else {
				setisDepositing(false)
			}
		}
		if (isDepositing == true) {
			handleDepositing()
		}
	}, [isDepositing])

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
								<label
									htmlFor="exampleInputEmail1"
									className="form-label inline-block mb-2 text-gray-700"
								>
									Deposit Amount
								</label>
								<div className="grid grid-cols-5 pb-3">
									<div className="col">
										<button
											type="button"
											className="inline-block w-full px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-xs leading-tight uppercase rounded-l shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
											onClick={() =>
												setDeposits(
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
												setDeposits(
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
												setDeposits(
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
												setDeposits(
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
												setDeposits(Number(walletBal))
											}
										>
											100%
										</button>
									</div>
								</div>
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
												setDeposits(
													Number(depositAmount)
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
								</div>

								<div className="grid grid-cols-5">
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
											placeholder="USD Amount"
											value={(
												depositAmount * priceFeed
											).toFixed(2)}
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
										$ USD
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
							<button
								type="button"
								className="inline-block px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
								data-bs-dismiss="modal"
								onClick={() => onClose()}
								disabled={isDepositing == true}
							>
								Close
							</button>
							<button
								onClick={() => setisDepositing(true)}
								disabled={
									depositAmount == 0 || isDepositing == true
								}
								className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
							>
								Deposit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Deposit
