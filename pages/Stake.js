import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"
import Balances from "../components/Balances"
import Pool from "../components/Pool"
import web3 from "web3"

export default function Stake() {
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	const chainId = parseInt(chainIdHex)
	const chainName = chainDict[chainId]

	const contractsInfo = require("../constants/contractInfo.json")

	const [gwin, setGwin] = useState({
		address: "0x76DDAE3A81C4dBAa2a307f4545EB4EFC961A1a07",
		abi: [0],
	})
	const [daiToken, setDaiToken] = useState({
		address: "0x0000000000000000000000000000000000000000",
		abi: [0],
		price_address: "0x0000000000000000000000000000000000000000",
	})
	const [gwinToken, setGwinToken] = useState({
		address: "0x0000000000000000000000000000000000000000",
		abi: [0],
	})
	const [wethToken, setWethToken] = useState({
		address: "0x0000000000000000000000000000000000000000",
		abi: [0],
		price_address: "0x0000000000000000000000000000000000000000",
	})
	const [token, setToken] = useState({
		address: "0x0000000000000000000000000000000000000000",
		abi: [0],
	})

	const [ethUsdPrice, setEthUsdPrice] = useState(0)
	const [walletEthBal, setWalletEthBal] = useState(0)
	const [hEth2xPoolBal, sethEth2xPoolBal] = useState(0)
	const [cEth2xPoolBal, setCEth2xPoolBal] = useState(0)
	const [hEthUser2xPoolBal, setUserHEth2xPoolBal] = useState(0)
	const [cEthUser2xPoolBal, setUserCEth2xPoolBal] = useState(0)
	const [hEth5xPoolBal, sethEth5xPoolBal] = useState(0)
	const [cEth5xPoolBal, setCEth5xPoolBal] = useState(0)
	const [hEthUser5xPoolBal, setUserHEth5xPoolBal] = useState(0)
	const [cEthUser5xPoolBal, setUserCEth5xPoolBal] = useState(0)
	const [hEth10xPoolBal, sethEth10xPoolBal] = useState(0)
	const [cEth10xPoolBal, setCEth10xPoolBal] = useState(0)
	const [hEthUser10xPoolBal, setUserHEth10xPoolBal] = useState(0)
	const [cEthUser10xPoolBal, setUserCEth10xPoolBal] = useState(0)
	const [parentZeroCETHPoolBal, setParentZeroCETHPoolBal] = useState(0)

	const [tokenAmount, setTokenAmount] = useState(0)
	const [isUnstaking, setIsUnstaking] = useState(false)
	const [isStaking, setIsStaking] = useState(false)

	const [count, setCount] = useState(0)
	const [isLoaded, setIsLoaded] = useState(0)

	const setContracts = () => {
		if (chainName) {
			console.log(chainName)
			setGwin(
				contractsInfo[0]["networks"][chainName]["contracts"]["gwin"]
			)
		}
	}

	///////////   Contract Functions   ////////////

	// const {
	// 	runContractFunction: approveToken,
	// 	data: enterTxResponse,
	// 	isLoading,
	// 	isFetching,
	// } = useWeb3Contract({
	// 	abi: token.abi,
	// 	contractAddress: token.address,
	// 	functionName: "approve",
	// 	params: {
	// 		spender: tokenFarm.address,
	// 		amount: Moralis.Units.ETH(tokenAmount),
	// 	},
	// })

	// const { runContractFunction: stakeTokens } = useWeb3Contract({
	// 	abi: tokenFarm.abi,
	// 	contractAddress: tokenFarm.address,
	// 	functionName: "stakeTokens",
	// 	params: {
	// 		_amount: Moralis.Units.ETH(tokenAmount),
	// 		_token: token.address,
	// 	},
	// })

	///////////   View Functions   ////////////

	// getUserTotalValue()
	// const { runContractFunction: getUserTotalValue } = useWeb3Contract({
	// 	abi: abi,
	// 	contractAddress: "0x48efFEBe8879A7024654dda2d90F1EF56b12f135",
	// 	functionName: "getUserTotalValue",
	// 	params: {
	// 		_user: "0x3789F5efFb5022DEF4Fbc14d325e946c7B422eE3",
	// 	},
	// })

	const { runContractFunction: getEthUsdPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getPoolHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolHEthBalance",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getPoolCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolCEthBalance",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getUserHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveHEthBalance",
		params: {
			_poolId: 0,
			_user: account,
		},
	})

	const { runContractFunction: getParentPoolCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "getParentUserCEthBalance",
		params: {
			_poolId: 0,
			_user: account,
		},
	})

	const { runContractFunction: getPoolFiveHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolHEthBalance",
		params: {
			_poolId: 1,
		},
	})

	const { runContractFunction: getPoolFiveCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolCEthBalance",
		params: {
			_poolId: 1,
		},
	})

	const { runContractFunction: getUserFiveHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveHEthBalance",
		params: {
			_poolId: 1,
			_user: account,
		},
	})

	const { runContractFunction: getParentPoolFiveCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "getParentUserCEthBalance",
		params: {
			_poolId: 1,
			_user: account,
		},
	})

	const { runContractFunction: getPoolTenHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolHEthBalance",
		params: {
			_poolId: 2,
		},
	})

	const { runContractFunction: getPoolTenCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveProtocolCEthBalance",
		params: {
			_poolId: 2,
		},
	})

	const { runContractFunction: getUserTenHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "retrieveHEthBalance",
		params: {
			_poolId: 2,
			_user: account,
		},
	})

	const { runContractFunction: getParentPoolTenCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
		functionName: "getParentUserCEthBalance",
		params: {
			_poolId: 2,
			_user: account,
		},
	})

	const { runContractFunction: getParentOnePoolCEthBalance } =
		useWeb3Contract({
			abi: abi,
			contractAddress: "0x5119Ea4a43C2AdAe6dBA5DB8b45668610D20Ab7A",
			functionName: "getParentPoolCEthBalance",
			params: {
				_poolId: 0,
				_user: account,
			},
		})

	const getContractValue = async () => {
		let ethUsd = await getEthUsdPrice()
		if (ethUsd) {
			setEthUsdPrice(await updateUIValues(ethUsd))
		}
		let twoEthHEthBal = await getPoolHEthBal()
		if (twoEthHEthBal) {
			sethEth2xPoolBal(await handleBalanceValue(twoEthHEthBal))
		}
		let twoEthCEthBal = await getPoolCEthBal()
		if (twoEthCEthBal) {
			setCEth2xPoolBal(await handleBalanceValue(twoEthCEthBal))
		}
		let twoEthUserHEthBal = await getUserHEthBal()
		if (twoEthUserHEthBal) {
			setUserHEth2xPoolBal(await handleBalanceValue(twoEthUserHEthBal))
		}
		let twoEthUserCEthBal = await getParentPoolCEthBal()
		if (twoEthUserCEthBal) {
			setUserCEth2xPoolBal(await handleBalanceValue(twoEthUserCEthBal))
		}
		let fiveEthHEthBal = await getPoolFiveHEthBal()
		if (fiveEthHEthBal) {
			sethEth5xPoolBal(await handleBalanceValue(fiveEthHEthBal))
		}
		let fiveEthCEthBal = await getPoolFiveCEthBal()
		if (fiveEthCEthBal) {
			setCEth5xPoolBal(await handleBalanceValue(fiveEthCEthBal))
		}
		let fiveEthUserHEthBal = await getUserFiveHEthBal()
		if (fiveEthUserHEthBal) {
			setUserHEth5xPoolBal(await handleBalanceValue(fiveEthUserHEthBal))
		}
		let fiveEthUserCEthBal = await getParentPoolFiveCEthBal()
		if (fiveEthUserCEthBal) {
			setUserCEth5xPoolBal(await handleBalanceValue(fiveEthUserCEthBal))
		}
		let tenEthHEthBal = await getPoolTenHEthBal()
		if (tenEthHEthBal) {
			sethEth10xPoolBal(await handleBalanceValue(tenEthHEthBal))
		}
		let tenEthCEthBal = await getPoolTenCEthBal()
		if (tenEthCEthBal) {
			setCEth10xPoolBal(await handleBalanceValue(tenEthCEthBal))
		}
		let tenEthUserHEthBal = await getUserTenHEthBal()
		if (tenEthUserHEthBal) {
			setUserHEth10xPoolBal(await handleBalanceValue(tenEthUserHEthBal))
		}
		let tenEthUserCEthBal = await getParentPoolTenCEthBal()
		if (tenEthUserCEthBal) {
			setUserCEth10xPoolBal(await handleBalanceValue(tenEthUserCEthBal))
		}
		let getParentZeroCEthBal = await getParentOnePoolCEthBalance()
		if (getParentZeroCEthBal) {
			setParentZeroCETHPoolBal(
				await handleBalanceValue(getParentZeroCEthBal)
			)
		}
		let getEthBal = await web3.eth.getBalance(account)
		console.log("eth bal")
		console.log(getEthBal)
		if (getEthBal) {
			setWalletEthBal(await handleBalanceValue(getEthBal))
		}
	}

	//////   Wallet Balance Functions   //////

	// const { runContractFunction: getBalanceOfGwinToken } = useWeb3Contract({
	// 	abi: gwinToken.abi,
	// 	contractAddress: gwinToken.address,
	// 	functionName: "balanceOf",
	// 	params: {
	// 		account: account,
	// 	},
	// })

	//////   Staked Balance Functions   //////

	// const { runContractFunction: getStakedDai } = useWeb3Contract({
	// 	abi: tokenFarm.abi,
	// 	contractAddress: tokenFarm.address,
	// 	functionName: "getUserSingleTokenStakedValue",
	// 	params: {
	// 		_user: account,
	// 		_token: daiToken.address,
	// 	},
	// })

	///////////   Toast Messsage Updates   ////////////

	const handleStakeSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Successfully Staked!")
		await updateUIValues()
		await getContractValue()
		setIsStaking(false)
		resetValues()
	}

	const handleStakeError = async (error) => {
		console.log(error)
		toast.error(
			"Uh oh! Tx was approved but could not stake. Check console for error."
		)
		setIsStaking(false)
		resetValues()
	}

	const handleSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Token approved for staking!")
		await stakeTokens({
			onSuccess: handleStakeSuccess,
			onError: (error) => handleStakeError(error, tx),
		})
	}

	const handleUnstakeSuccess = async (tx) => {
		await tx.wait(1)
		toast.success("Tokens successfully unstaked!")
		getContractValue()
	}

	const handleError = async (error) => {
		console.log(error)
		toast.error("Uh oh! Tx could not be approved. Check console for error.")
	}

	///////////   Helpful Functions   ////////////

	// const resetValues = () => {
	// 	setWethValue("")
	// 	setGwinValue("")
	// 	setDaiValue("")
	// }

	///////////   Update UI   ////////////

	const updateUIValues = async (tokenVal) => {
		console.log("token test: ")
		console.log(tokenVal)
		if (tokenVal) {
			var tokenValue = tokenVal
			console.log("token: ")
			console.log(tokenValue)
			tokenValue = parseInt(tokenValue._hex)
			var tokenValue = tokenValue / Math.pow(10, 8)
			console.log(tokenValue)
			return tokenValue
		}
	}

	const handleBalanceValue = async (balVal) => {
		console.log("token test: ")
		console.log(balVal)
		if (balVal) {
			var adjBalVal = balVal
			console.log("token: ")
			console.log(adjBalVal)
			adjBalVal = parseInt(adjBalVal._hex)
			adjBalVal = adjBalVal / Math.pow(10, 18)
			adjBalVal = adjBalVal.toFixed(5)
			console.log(adjBalVal)
			return adjBalVal
		}
	}

	useEffect(() => {
		if (isWeb3Enabled) {
			async function updateUI() {
				try {
					setCount(count++)
					console.log("count: " + count)
					await setContracts()
					await getContractValue()
					setIsLoaded(isLoaded++)
				} catch (err) {
					console.error(err)
				}
			}
			if (isWeb3Enabled) {
				updateUI()
			}
		}
	}, [isWeb3Enabled])

	useEffect(() => {
		if (gwinToken.address != "0x0000000000000000000000000000000000000000") {
			async function updateBalances() {
				try {
					setTimeout(async function () {
						await getContractValue()
					}, 2000)
				} catch (err) {
					console.error(err)
				}
			}
			if (
				gwinToken.address !=
				"0x0000000000000000000000000000000000000000"
			) {
				updateBalances()
			}
		}
	}, [isWeb3Enabled, chainName, chainId, gwinToken, isUnstaking])

	useEffect(() => {
		async function handleUnstaking() {
			if (isUnstaking == true) {
				try {
					await unstakeTokens({
						onSuccess: handleUnstakeSuccess,
						onError: (error) => handleError(error),
					})
					setIsUnstaking(false)
				} catch (err) {
					console.error(err)
				}
			} else {
				setIsUnstaking(false)
			}
		}
		if (isUnstaking == true) {
			handleUnstaking()
		}
	}, [isUnstaking])

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

	return (
		<div>
			<Toaster />
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				{walletEthBal}
				<Pool // 2x
					tokenPic="/../public/eth.png"
					name="ETH/USD 2x Pool"
					hEth={hEth2xPoolBal}
					cEth={cEth2xPoolBal}
					userBal={hEthUser2xPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
				/>
				<Pool // 5x
					tokenPic="/../public/eth.png"
					name="ETH/USD 5x Pool"
					hEth={hEth5xPoolBal}
					cEth={cEth5xPoolBal}
					userBal={hEthUser5xPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
				/>
				<Pool // 10x
					tokenPic="/../public/eth.png"
					name="ETH/USD 10x Pool"
					hEth={hEth10xPoolBal}
					cEth={cEth10xPoolBal}
					userBal={hEthUser10xPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
				/>
				<Pool // Cooled
					tokenPic="/../public/eth.png"
					name="ETH/USD Cooled Stable Pool"
					hEth=""
					cEth={parentZeroCETHPoolBal}
					userBal={cEthUser2xPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
				/>
			</div>
		</div>
	)
}
