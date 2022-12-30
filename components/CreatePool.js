import AssetImage from "../components/AssetImage"
import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import { chainDict } from "../constants/chainDict"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import Web3 from "web3"
import generatePoolName from "../helpers/generatePoolName"
import toast, { Toaster } from "react-hot-toast"

let web3 = new Web3()

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
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [formData, setFormData] = useState({
		amount: "",
		poolType: "classic",
		parentId: "",
		basePriceFeedAddress: "",
		baseKey: "",
		quotePriceFeedAddress: "",
		quoteKey: "",
		cRate: "-1000000000000",
		hRate: "1000000000000",
	})
	const [errors, setErrors] = useState({})

	const formKeysToCheck = [
		"amount",
		"poolType",
		"parentId",
		"basePriceFeedAddress",
		"baseKey",
		"cRate",
		"hRate",
	]

	const isFormFilled = formKeysToCheck.every((key) => formData[key] !== "")

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
		console.log(formData)
	}

	const validateForm = () => {
		const pattern = /^[a-zA-Z]{3,5}\/[a-zA-Z]{3,5}$/
		let newErrors = {}
		if (!formData.amount) {
			newErrors.amount = "Amount is required"
		} else {
			if (formData.amount <= 0) {
				newErrors.amount = "Amount must be greater than zero"
			}
		}
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
		} else if (!pattern.test(formData.baseKey)) {
			newErrors.baseKey =
				"Base key must be in the format 'XXX/XXX', where X is a letter between 3 and 5 characters in length."
		}
		if (formData.quotePriceFeedAddress) {
			// only validate optional field if it has an entry
			const isValidAddress = /^0x[0-9a-fA-F]{40}$/.test(
				formData.quotePriceFeedAddress
			)
			if (!isValidAddress) {
				newErrors.quotePriceFeedAddress =
					"Quote price feed address is not a valid Ethereum address"
			}
		}
		if (formData.quoteKey) {
			// only validate optional field if it has an entry
			if (!pattern.test(formData.quoteKey)) {
				newErrors.quoteKey =
					"Quote key must be in the format 'XXX/XXX', where X is a letter between 3 and 5 characters in length."
			}
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
			if (
				typeof formData.quotePriceFeedAddress == "undefined" ||
				formData.quotePriceFeedAddress == ""
			) {
				formData.quotePriceFeedAddress =
					"0x0000000000000000000000000000000000000000"
			}
			// Convert baseKey and quoteKey to bytes 32
			const baseKeyHex = web3.utils.utf8ToHex(formData.baseKey)
			const quoteKeyHex = web3.utils.utf8ToHex(formData.quoteKey)
			console.log(baseKeyHex)
			let strippedBaseKeyHex = baseKeyHex.slice(2)
			let strippedQuoteKeyHex = quoteKeyHex.slice(2)
			let padBaseKey = strippedBaseKeyHex.padStart(64, "0")
			let padQuoteKey = strippedQuoteKeyHex.padStart(64, "0")
			padBaseKey = "0x" + padBaseKey
			padQuoteKey = "0x" + padQuoteKey
			const stringAmount = formData.amount.toString()
			const convertedAmount = web3.utils.toWei(stringAmount, "ether")
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
			setFormData({
				...formData,
				amount: convertedAmount,
				poolType: poolTypeNum,
				baseKey: padBaseKey,
				quoteKey: padQuoteKey,
			})
			setIsSubmitting(true)
			// submit form data
			// call moralis hook here
			console.log(padBaseKey)
			console.log(padQuoteKey)
			console.log(formData)
		}
	}

	useEffect(() => {
		if (isSubmitting == true) {
			try {
				onClose()
				console.log(formData)
				// initializePool().then(() => setIsSubmitting(false))
				initializePool({
					onSuccess: handleCreatePoolSuccess,
					onError: (error) => handleCreatePoolError(error),
				}).then(() => setIsSubmitting(false))
				// setIsSubmitting(false)
			} catch (error) {
				console.log(error)
			}
		}
	}, [formData])

	const handleCreatePoolSuccess = async (tx) => {
		// end depositing process
		setIsSubmitting(false)
		// if deposit success wait
		await tx.wait(1)
		// show toast message
		toast.success("Successfully Staked!")
	}

	const handleCreatePoolError = async (error) => {
		// end deposit
		setIsSubmitting(false)
		// if deposit error, log error
		console.log(error)
		// show toast message
		toast.error(
			"Uh oh! The pool could not be created. Check console for details."
		)
	}

	// create pool hook for smart contract
	const {
		runContractFunction: initializePool,
		data: enterTxResponse,
		isLoading,
		isFetching,
	} = useWeb3Contract({
		abi: abi,
		contractAddress: contract,
		functionName: "initializePool",
		params: {
			_type: formData.poolType,
			_parentId: formData.parentId,
			_basePriceFeedAddress: formData.basePriceFeedAddress,
			_baseCurrencyKey: formData.baseKey,
			_quotePriceFeedAddress: formData.quotePriceFeedAddress,
			_quoteCurrencyKey: formData.quoteKey,
			_cRate: formData.cRate,
			_hRate: formData.hRate,
		},
		msgValue: formData.amount,
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
								className="text-xl font-medium leading-normal text-gray-800 flex"
								id="exampleModalScrollableLabel"
							>
								<svg
									className="fill-indigo-500 w-8 h-8"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512"
								>
									<path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 91.9c-11.1 0-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.8 4c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0c-2.2-.7-4.3-1.5-6.4-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V304c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.4-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V112c0-11.1-9-20.1-20.1-20.1zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z" />
								</svg>
								&nbsp;&nbsp;Create a New Pool Pair
								{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
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
							) : (
								<div
									class="bg-yellow-100 mt-3 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
									role="alert"
								>
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="exclamation-triangle"
										class="w-4 h-4 mr-2 fill-current"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										<path
											fill="currentColor"
											d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
										></path>
									</svg>
									<p>
										Carefully reference documentation{" "}
										<a
											className="text-sky-600 hover:text-sky-800 font-bold"
											href="https://coltonmilbrandt.gitbook.io/gwin/technical-details/creating-a-new-market"
											target="_blank"
											rel="noopener"
										>
											here
										</a>
										.
									</p>
								</div>
							)}
							<form onSubmit={handleSubmit}>
								<div className="form-group mt-2">
									<label htmlFor="amount">
										Deposit Amount (ETH)
									</label>
									<input
										type="text"
										id="amount"
										name="amount"
										value={formData.amount}
										placeholder="ETH deposit to initialize pool"
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
									{errors.amount && (
										<div className="text-red-500">
											{errors.amount}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
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
										<div className="text-red-500">
											{errors.poolType}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<label htmlFor="parentId">Parent ID</label>
									<input
										type="text"
										id="parentId"
										name="parentId"
										value={formData.parentId}
										placeholder="Parent ID - (ex. 0 for none)"
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
										<div className="text-red-500">
											{errors.parentId}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<label htmlFor="basePriceFeedAddress">
										Base Price Feed Address
									</label>
									<input
										type="text"
										id="basePriceFeedAddress"
										name="basePriceFeedAddress"
										value={formData.basePriceFeedAddress}
										placeholder="Price Feed Address - (ex. 0x...)"
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
										<div className="text-red-500">
											{errors.basePriceFeedAddress}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<label htmlFor="baseKey">Base Key</label>
									<input
										type="text"
										id="baseKey"
										name="baseKey"
										value={formData.baseKey}
										placeholder="Pair Description (ex. ETH/USD)"
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
										<div className="text-red-500">
											{errors.baseKey}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<label htmlFor="quotePriceFeedAddress">
										Quote Price Feed Address
									</label>
									<input
										type="text"
										id="quotePriceFeedAddress"
										name="quotePriceFeedAddress"
										value={formData.quotePriceFeedAddress}
										placeholder="Price Feed Address - (ex. 0x...)"
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
										<div className="text-red-500">
											{errors.quotePriceFeedAddress}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<label htmlFor="quoteKey">Quote Key</label>
									<input
										type="text"
										id="quoteKey"
										name="quoteKey"
										value={formData.quoteKey}
										placeholder="Pair Description (ex. BTC/USD)"
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
										<div className="text-red-500">
											{errors.quoteKey}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
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
										max="-250000000000"
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
										<div className="text-red-500">
											{errors.cRate}
										</div>
									)}
								</div>
								<div className="form-group mt-2">
									<div className="flex justify-between">
										<label className="flex" htmlFor="hRate">
											hRate
										</label>
										<div className="flex justify-self-end">
											{`${
												Number(formData.hRate) /
													10 ** 12 +
												1
											}x`}
										</div>
									</div>
									<input
										type="range"
										id="hRate"
										name="hRate"
										min="0"
										max="9000000000000"
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
										<div className="text-red-500">
											{errors.hRate}
										</div>
									)}
								</div>
								<h2 className="text-xl font-semibold mt-3">
									Pool Pair Details:
								</h2>
								<div>
									The Cooled pool is:{" "}
									{generatePoolName(
										formData.baseKey,
										formData.quoteKey,
										false, // is heated
										true, // is cooled
										formData.hRate,
										formData.cRate
									)}
								</div>
								<div>
									The Heated pool is:{" "}
									{generatePoolName(
										formData.baseKey,
										formData.quoteKey,
										true, // is heated
										false, // is cooled
										formData.hRate,
										formData.cRate
									)}
								</div>
								{/* footer */}
								<div className="modal-footer flex mt-3 flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
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
