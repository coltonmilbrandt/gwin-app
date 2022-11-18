import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"
import Balances from "../components/Balances"
import Pool from "../components/Pool"
import Web3 from "web3"

export default function Stake() {
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	const chainId = parseInt(chainIdHex)
	const chainName = chainDict[chainId]

	let web3

	if (
		typeof window !== "undefined" &&
		typeof window.ethereum !== "undefined"
	) {
		// we are in the browser and metamask is running
		window.ethereum.request({ method: "eth_requestAccounts" })
		web3 = new Web3(window.ethereum)
	}

	const contractsInfo = require("../constants/contractInfo.json")

	const [gwin, setGwin] = useState({
		address: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		abi: abi,
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
	const [userEthWalletBal, setUserEthWalletBal] = useState(0)
	const [hEth2xPoolBal, sethEth2xPoolBal] = useState(0)
	const [cEth2xPoolBal, setCEth2xPoolBal] = useState(0)
	const [hEthUser2xPoolBal, setUserHEth2xPoolBal] = useState(0)
	const [cEthUser2xPoolBal, setUserCEth2xPoolBal] = useState(0)
	const [hEth5xPoolBal, sethEth5xPoolBal] = useState(0)
	const [cEth5xPoolBal, setCEth5xPoolBal] = useState(0)
	const [hEthUser5xPoolBal, setUserHEth5xPoolBal] = useState(0)
	const [hEth10xPoolBal, sethEth10xPoolBal] = useState(0)
	const [cEth10xPoolBal, setCEth10xPoolBal] = useState(0)
	const [hEthUser10xPoolBal, setUserHEth10xPoolBal] = useState(0)
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

	///////////   View Functions   ////////////

	const { runContractFunction: getEthUsdPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getTwoPoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getUserHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 0,
			_user: account,
		},
	})

	const { runContractFunction: getParentPoolCEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "getParentUserCEthBalance",
		params: {
			_poolId: 0,
			_user: account,
		},
	})

	const { runContractFunction: getFivePoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 1,
		},
	})

	const { runContractFunction: getUserFiveHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 1,
			_user: account,
		},
	})

	const { runContractFunction: getTenPoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 2,
		},
	})

	const { runContractFunction: getUserTenHEthBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 2,
			_user: account,
		},
	})

	const { runContractFunction: getParentOnePoolCEthBalance } =
		useWeb3Contract({
			abi: abi,
			contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
			functionName: "previewParentUserCEthBalance",
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
		let twoBals = await getTwoPoolBals()
		let twoBalsHEth = twoBals[0]
		let twoBalsCEth = twoBals[1]
		sethEth2xPoolBal(await handleBalanceValue(twoBalsHEth))
		setCEth2xPoolBal(await handleBalanceValue(twoBalsCEth))
		let twoEthUserHEthBal = await getUserHEthBal()
		if (twoEthUserHEthBal) {
			setUserHEth2xPoolBal(await handleBalanceValue(twoEthUserHEthBal))
		}
		let twoEthUserCEthBal = await getParentPoolCEthBal()
		if (twoEthUserCEthBal) {
			setUserCEth2xPoolBal(await handleBalanceValue(twoEthUserCEthBal))
		}
		let fiveBals = await getFivePoolBals()
		let fiveBalsHEth = fiveBals[0]
		let fiveBalsCEth = fiveBals[1]
		sethEth5xPoolBal(await handleBalanceValue(fiveBalsHEth))
		setCEth5xPoolBal(await handleBalanceValue(fiveBalsCEth))
		let fiveEthUserHEthBal = await getUserFiveHEthBal()
		if (fiveEthUserHEthBal) {
			setUserHEth5xPoolBal(await handleBalanceValue(fiveEthUserHEthBal))
		}
		let tenBals = await getTenPoolBals()
		let tenBalsHEth = tenBals[0]
		let tenBalsCEth = tenBals[1]
		sethEth10xPoolBal(await handleBalanceValue(tenBalsHEth))
		setCEth10xPoolBal(await handleBalanceValue(tenBalsCEth))
		let tenEthUserHEthBal = await getUserTenHEthBal()
		if (tenEthUserHEthBal) {
			setUserHEth10xPoolBal(await handleBalanceValue(tenEthUserHEthBal))
		}
		let getParentZeroCEthBal = await getParentOnePoolCEthBalance()
		if (getParentZeroCEthBal) {
			setParentZeroCETHPoolBal(
				await handleBalanceValue(getParentZeroCEthBal)
			)
		}
		let userWalletBal = await web3.eth.getBalance(account)
		if (userWalletBal) {
			userWalletBal = web3.utils.fromWei(userWalletBal, "ether")
			userWalletBal = Number(userWalletBal)
			setUserEthWalletBal(userWalletBal)
			console.log(userEthWalletBal)
		}
	}

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
				<Pool // 2x
					tokenPic="/../public/hEth2.png"
					name="ETH/USD 2x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth2xPoolBal}
					cEth={cEth2xPoolBal}
					userBal={hEthUser2xPoolBal}
					contract={gwin.address}
					poolId="0"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
				/>
				<Pool // 5x
					tokenPic="/../public/hEth5.png"
					name="ETH/USD 5x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth5xPoolBal}
					cEth={cEth5xPoolBal}
					userBal={hEthUser5xPoolBal}
					contract={gwin.address}
					poolId="1"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
				/>
				<Pool // 10x
					tokenPic="/../public/hEth10.png"
					name="ETH/USD 10x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth10xPoolBal}
					cEth={cEth10xPoolBal}
					userBal={hEthUser10xPoolBal}
					contract={gwin.address}
					poolId="2"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
				/>
				<Pool // Cooled
					tokenPic="/../public/eth.png"
					name="ETH/USD Cooled Stable Pool"
					isHeated="false"
					isCooled="true"
					hEth=""
					cEth={(
						Number(cEth2xPoolBal) +
						Number(cEth5xPoolBal) +
						Number(cEth10xPoolBal)
					).toFixed(5)}
					userBal={parentZeroCETHPoolBal}
					contract={gwin.address}
					poolId="0"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
				/>
			</div>
		</div>
	)
}
