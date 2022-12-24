import AssetImage from "../components/AssetImage"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import React from "react"
import Web3 from "web3"
import generatePoolName from "../helpers/generatePoolName"

const web3 = new Web3()

// Create Pool modal to create a new market with a pool pair

const CreatePool = ({ isOpen, userWalletBal, onClose, contract }) => {
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

	const [symbol, setSymbol] = useState("ETH")
	const [leverage, setLeverage] = useState(0)
	const [target, setTarget] = useState("ETH")

	const [formData, setFormData] = useState({
		poolType: "",
		parentId: "",
		basePriceFeedAddress: "",
		baseKey: "",
		quotePriceFeedAddress: "",
		quoteKey: "",
		cRate: "",
		hRate: "",
	})
	const [errors, setErrors] = useState({})

	const isFormFilled = Object.values(formData).every((value) => value !== "")

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		console.log(formData)
	}

	const validateForm = () => {
		let newErrors = {}
		if (!formData.poolType) {
			newErrors.poolType = "Pool type is required"
		}
		if (!formData.parentId) {
			newErrors.parentId = "Parent ID is required"
		}
		if (!formData.basePriceFeedAddress) {
			newErrors.basePriceFeedAddress =
				"Base price feed address is required"
		} else {
			const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(
				formData.basePriceFeedAddress
			)
			if (!isValidAddress) {
				newErrors.basePriceFeedAddress =
					"Base price feed address is not a valid Ethereum address"
			}
		}
		if (!formData.baseKey) {
			newErrors.baseKey = "Base key is required"
		}
		if (!formData.quotePriceFeedAddress) {
			newErrors.quotePriceFeedAddress =
				"Quote price feed address is required"
		} else {
			const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(
				formData.quotePriceFeedAddress
			)
			if (!isValidAddress) {
				newErrors.quotePriceFeedAddress =
					"Quote price feed address is not a valid Ethereum address"
			}
		}
		if (!formData.quoteKey) {
			newErrors.quoteKey = "Quote key is required"
		}
		if (!formData.cRate) {
			newErrors.cRate = "cRate is required"
		}
		if (!formData.hRate) {
			newErrors.hRate = "hRate is required"
		}
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		if (validateForm()) {
			// Convert baseKey and quoteKey to bytes 32
			const baseKeyBytes32 = web3.utils.toHex(formData.baseKey)
			const quoteKeyBytes32 = web3.utils.toHex(formData.quoteKey)
			let poolTypeNum
			switch (formData.poolType) {
				case "classic":
					poolTypeNum = 0
					break
				case "modified":
					poolTypeNum = 1
					break
				default:
					poolTypeNum = null
			}
			// submit form data
			// call moralis hook here
			console.log(baseKeyBytes32)
			console.log(quoteKeyBytes32)
			console.log(formData)
		}
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
								className="text-xl font-medium leading-normal text-gray-800"
								id="exampleModalScrollableLabel"
							>
								Create a New Pool Pair
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
									&nbsp;&nbsp;
									{Number(userWalletBal).toFixed(5)} ETH
								</span>
							</div>
							{/* if user balance is zero, show warning */}
							{Number(userWalletBal) == 0 ? (
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
									You don't appear to have funds to create a
									pool, connect a wallet with ETH.
								</div>
							) : null}
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="poolType">Pool Type</label>
									<select
										id="poolType"
										name="poolType"
										value={formData.poolType}
										onChange={handleChange}
										className={`form-control
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
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									>
										<option value="">
											Select a pool type
										</option>
										<option value="classic">Classic</option>
										<option value="modified">
											Modified
										</option>
									</select>
									{errors.poolType && (
										<div className="invalid-feedback">
											{errors.poolType}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="parentId">Parent ID</label>
									<input
										type="text"
										id="parentId"
										name="parentId"
										value={formData.parentId}
										onChange={handleChange}
										className={`form-control
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
											focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.parentId && (
										<div className="invalid-feedback">
											{errors.parentId}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="basePriceFeedAddress">
										Base Price Feed Address
									</label>
									<input
										type="text"
										id="basePriceFeedAddress"
										name="basePriceFeedAddress"
										value={formData.basePriceFeedAddress}
										onChange={handleChange}
										className={`form-control
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
											focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.basePriceFeedAddress && (
										<div className="invalid-feedback">
											{errors.basePriceFeedAddress}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="baseKey">
										Base Key (hash)
									</label>
									<input
										type="text"
										id="baseKey"
										name="baseKey"
										value={formData.baseKey}
										onChange={handleChange}
										className={`form-control
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
											focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.baseKey && (
										<div className="invalid-feedback">
											{errors.baseKey}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="quotePriceFeedAddress">
										Quote Price Feed Address
									</label>
									<input
										type="text"
										id="quotePriceFeedAddress"
										name="quotePriceFeedAddress"
										value={formData.quotePriceFeedAddress}
										onChange={handleChange}
										className={`form-control
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
											focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.quotePriceFeedAddress && (
										<div className="invalid-feedback">
											{errors.quotePriceFeedAddress}
										</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="quoteKey">
										Quote Key (hash)
									</label>
									<input
										type="text"
										id="quoteKey"
										name="quoteKey"
										value={formData.quoteKey}
										onChange={handleChange}
										className={`form-control
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
											focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.quoteKey && (
										<div className="invalid-feedback">
											{errors.quoteKey}
										</div>
									)}
								</div>
								<div className="form-group">
									<div className="flex justify-between">
										<label className="flex" htmlFor="cRate">
											Cooled Rate
										</label>
										<div className="flex justify-self-end">
											{`${
												Number(formData.cRate) /
												10 ** 12
											}x`}
										</div>
									</div>
									<input
										type="range"
										id="cRate"
										name="cRate"
										min="-10000000000000"
										max="0"
										step="250000000000"
										value={formData.cRate}
										onChange={handleChange}
										className={`form-control
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
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.cRate && (
										<div className="invalid-feedback">
											{errors.cRate}
										</div>
									)}
								</div>
								<div className="form-group">
									<div className="flex justify-between">
										<label className="flex" htmlFor="hRate">
											hRate
										</label>
										<div className="flex justify-self-end">
											{`${
												Number(formData.hRate) /
												10 ** 12
											}x`}
										</div>
									</div>
									<input
										type="range"
										id="hRate"
										name="hRate"
										min="0"
										max="10000000000000"
										step="250000000000"
										value={formData.hRate}
										onChange={handleChange}
										className={`form-control
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
                                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
									/>
									{errors.hRate && (
										<div className="invalid-feedback">
											{errors.hRate}
										</div>
									)}
								</div>
								<div>
									This pool is a{" "}
									{generatePoolName(
										formData.baseKey,
										formData.quoteKey,
										true, // is heated
										false, // is cooled
										formData.hRate,
										formData.cRate
									)}
								</div>
								<div>
									This pool is a{" "}
									{generatePoolName(
										formData.baseKey,
										formData.quoteKey,
										false, // is heated
										true, // is cooled
										formData.hRate,
										formData.cRate
									)}
								</div>
								{/* footer */}
								<div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
									{/* close button */}
									<button
										type="button"
										className="inline-block px-6 py-2.5 bg-[#7d71d1] text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
										data-bs-dismiss="modal"
										onClick={() => onClose()}
										// disabled={isWithdrawing == true}
									>
										Close
									</button>
									{/* withdraw button */}
									<button
										onSubmit={() => handleSubmit}
										type="submit"
										disabled={!isFormFilled}
										// disabled={
										// 	withdrawalAmount == 0 ||
										// 	isWithdrawing == true
										// }
										className="inline-block px-6 py-2.5 bg-indigo-500 text-white font-medium text-sm leading-tight rounded shadow-md disabled:opacity-40 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
									>
										Create Pool
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CreatePool
