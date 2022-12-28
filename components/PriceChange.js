// import { useState, useEffect } from "react"
// import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
// import React from "react"
// import { abi } from "../constants/mockV3abi"
// import { chainDict } from "../constants/chainDict"
// import toast, { Toaster } from "react-hot-toast"
// import Web3 from "web3"

// export default function PriceChange() {
// 	// initialize Moralis web hooks
// 	const {
// 		isWeb3Enabled,
// 		account,
// 		chainId: chainIdHex,
// 		Moralis,
// 	} = useMoralis()
// 	// get chain ID and convert
// 	const chainIdReadable = parseInt(chainIdHex)
// 	const chainName = chainDict[chainIdReadable]
// 	console.log("ChainId" + chainIdReadable)

// 	// get contract info
// 	const contractsInfo = require("../constants/contractInfo.json")

// 	const [amount, setAmount] = useState("")
// 	const [latestPrice, setLatestPrice] = useState("")
// 	const [isAdjusting, setIsAdjusting] = useState(false)

// 	// initialize gwin address
// 	const [ethPriceFeed, setEthPriceFeed] = useState("")
// 	// const [xauPriceFeed, setXauPriceFeed] = useState("")
// 	// const [btcPriceFeed, setBtcPriceFeed] = useState("")
// 	// const [jpyPriceFeed, setJpyPriceFeed] = useState("")
// 	// const [selectedFeed, setSelectedFeed] = useState("")

// 	//@@@@@@@ set price feed addresses here @@@@@@@\\
// 	useEffect(() => {
// 		// set local contract addresses
// 		setEthPriceFeed("0x5b7d3C948b398e838d0EC3fD0203985C1C5CE184")
// 		// setXauPriceFeed("0x02Bf113140e41aA55542c1bEb40369f2451dD92A")
// 		// setBtcPriceFeed("0x9FEa47da584101238612aB2cCE41a8e2CD69E8D3")
// 		// setJpyPriceFeed("0x07C3EAf7C79afaB24ea94Cca202aAd818144E8F9")
// 	}, [ethPriceFeed])

// 	useEffect(() => {
// 		const interval = setInterval(async () => {
// 			const latestData = await latestRoundData()
// 			console.log("latest data")
// 			console.log(abi)
// 			console.log(ethPriceFeed)
// 			console.log(latestData)

// 			// extract answer
// 			const answer = Number(latestData.answer)
// 			console.log(answer)
// 			setLatestPrice(answer)
// 		}, 5000) // runs every 5 seconds

// 		return () => clearInterval(interval)
// 	}, [latestRoundData, ethPriceFeed, amount])

// 	function adjustAnswer(value, percentage) {
// 		// calculate the adjustment amount
// 		const adjustment = value + value * (percentage / 100)

// 		// update the answer value
// 		setAmount(adjustment)
// 		console.log("adjustment: " + adjustment)
// 	}

// 	useEffect(() => {
// 		async function handleAdjusting() {
// 			adjustAnswer(amount, 5)
// 			console.log("isAdjusting: " + isAdjusting)
// 			if (isAdjusting == true) {
// 				try {
// 					// call smart contract for price change
// 					await updateAnswer({
// 						onSuccess: handlePriceChangeSuccess,
// 						onError: (error) => handleDepositError(error),
// 					})
// 				} catch (err) {
// 					console.error(err)
// 				}
// 			} else {
// 				// end deposit
// 				setIsAdjusting(false)
// 			}
// 		}
// 		if (isAdjusting == true) {
// 			handleAdjusting()
// 		}
// 	}, [isAdjusting])

// 	// update price feed answer
// 	const { runContractFunction: updateAnswer } = useWeb3Contract({
// 		abi: abi,
// 		contractAddress: ethPriceFeed,
// 		functionName: "updateAnswer",
// 		params: {
// 			_answer: amount,
// 		},
// 	})

// 	// update price feed answer
// 	const { runContractFunction: latestRoundData } = useWeb3Contract({
// 		abi: abi,
// 		contractAddress: ethPriceFeed,
// 		functionName: "latestRoundData",
// 	})

// 	const handlePriceChangeSuccess = async (tx) => {
// 		// if deposit success wait
// 		await tx.wait(1)
// 		// show toast message
// 		toast.success("Price Updated!")
// 		// end depositing process
// 		setIsAdjusting(false)
// 	}

// 	const handleDepositError = async (error) => {
// 		// if deposit error, log error
// 		console.log(error)
// 		// show toast message
// 		toast.error(
// 			"Uh oh! The price update did not process. Check console for details."
// 		)
// 		// end deposit
// 		setIsAdjusting(false)
// 	}

// 	return (
// 		<div>
// 			{/* for toast messages */}
// 			<Toaster />
// 			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
// 				<div className="col-span-1 md:col-span-3 grid grid-cols-4 pb-6 pt-4">
// 					<h2 className="col-span-3 text-3xl font-bold w-full text-cyan-900">
// 						TEST - Change Price
// 					</h2>
// 				</div>
// 				<div className="relative bg-sky-50 m-3 shadow-lg p-4 rounded-lg text-gray-700">
// 					{latestPrice}&nbsp;
// 					{/* {adjustAnswer(latestPrice, 5)} */}
// 					<button
// 						onClick={() => {
// 							setIsAdjusting(true)
// 						}}
// 					>
// 						hello
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	)
// }
