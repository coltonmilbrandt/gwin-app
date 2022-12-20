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
import hEthTwoPic from "/public/hEth2.png"
import hEthFivePic from "/public/hEth5.png"
import hEthTenPic from "/public/hEth10.png"
import cEthPic from "/public/cooledEth.png"
import goldPic from "/public/gold.png"
import btcPic from "/public/Bitcoin.png"
import yenPic from "/public/yen.png"

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

	const [gwin, setGwin] = useState(
		"0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d"
	)
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

	const [poolsWithBalances, setPoolsWithBalances] = useState([])

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

	// ETH XAU
	const [ethXauPrice, setEthXauPrice] = useState(0)
	const [xauHEth, setXauHEth] = useState(0)
	const [xauCEth, setXauCEth] = useState(0)
	const [userXauHEth, setUserXauHEth] = useState(0)
	const [userXauCEth, setUserXauCEth] = useState(0)

	// ETH BTC
	const [ethBtcPrice, setEthBtcPrice] = useState(0)
	const [btcHEth, setBtcHEth] = useState(0)
	const [btcCEth, setBtcCEth] = useState(0)
	const [userBtcHEth, setUserBtcHEth] = useState(0)
	const [userBtcCEth, setUserBtcCEth] = useState(0)

	// ETH JPY
	const [ethJpyPrice, setEthJpyPrice] = useState(0)
	const [jpyHEth, setJpyHEth] = useState(0)
	const [jpyCEth, setJpyCEth] = useState(0)
	const [userJpyHEth, setUserJpyHEth] = useState(0)
	const [userJpyCEth, setUserJpyCEth] = useState(0)

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

	/// ETH ///

	const { runContractFunction: getEthUsdPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: gwin,
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 0,
		},
	})

	const { runContractFunction: getAllPoolsWithBalances } = useWeb3Contract({
		abi: abi,
		contractAddress: gwin,
		functionName: "getAllPoolsWithBalances",
		params: {
			_user: account,
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

	/// XAU ///

	const { runContractFunction: getEthXauPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 3,
		},
	})

	const { runContractFunction: getXauPoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 3,
		},
	})

	const { runContractFunction: getUserXauHBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 3,
			_user: account,
		},
	})

	const { runContractFunction: getUserXauCBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserCEthBalance",
		params: {
			_poolId: 3,
			_user: account,
		},
	})

	// ETH BTC

	const { runContractFunction: getEthBtcPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 5,
		},
	})

	const { runContractFunction: getBtcPoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 5,
		},
	})

	const { runContractFunction: getUserBtcHBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 5,
			_user: account,
		},
	})

	const { runContractFunction: getUserBtcCBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 5,
			_user: account,
		},
	})

	// ETH JPY

	const { runContractFunction: getEthJpyPrice } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "retrieveCurrentPrice",
		params: {
			_poolId: 6,
		},
	})

	const { runContractFunction: getJpyPoolBals } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewPoolBalances",
		params: {
			_poolId: 6,
		},
	})

	const { runContractFunction: getUserJpyHBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 6,
			_user: account,
		},
	})

	const { runContractFunction: getUserJpyCBal } = useWeb3Contract({
		abi: abi,
		contractAddress: "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d",
		functionName: "previewUserHEthBalance",
		params: {
			_poolId: 6,
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

		// ETH XAU
		let ethXau = await getEthXauPrice()
		if (ethUsd) {
			setEthXauPrice(await updateUIValues(ethXau))
		}
		let xauBals = await getXauPoolBals()
		let hXau = xauBals[0]
		let cXau = xauBals[1]
		setXauHEth(await handleBalanceValue(hXau))
		setXauCEth(await handleBalanceValue(cXau))
		let userHXau = await getUserXauHBal()
		if (userHXau) {
			setUserXauHEth(await handleBalanceValue(userHXau))
		}
		let userCXau = await getUserXauCBal()
		if (userCXau) {
			setUserXauCEth(await handleBalanceValue(userCXau))
		}

		// ETH BTC
		let ethBtc = await getEthBtcPrice()
		if (ethUsd) {
			setEthBtcPrice(await updateUIValues(ethBtc))
		}
		let btcBals = await getBtcPoolBals()
		let hBtc = btcBals[0]
		let cBtc = btcBals[1]
		setBtcHEth(await handleBalanceValue(hBtc))
		setBtcCEth(await handleBalanceValue(cBtc))
		let userHBtc = await getUserBtcHBal()
		if (userHBtc) {
			setUserBtcHEth(await handleBalanceValue(userHBtc))
		}
		let userCBtc = await getUserBtcCBal()
		if (userCBtc) {
			setUserBtcCEth(await handleBalanceValue(userCBtc))
		}

		// ETH JPY
		let ethJpy = await getEthJpyPrice()
		if (ethUsd) {
			setEthJpyPrice(await updateUIValues(ethJpy))
		}
		let jpyBals = await getJpyPoolBals()
		let hJpy = jpyBals[0]
		let cJpy = jpyBals[1]
		setJpyHEth(await handleBalanceValue(hJpy))
		setJpyCEth(await handleBalanceValue(cJpy))
		let userHJpy = await getUserJpyHBal()
		if (userHJpy) {
			setUserJpyHEth(await handleBalanceValue(userHJpy))
		}
		let userCJpy = await getUserJpyCBal()
		if (userCJpy) {
			setUserJpyCEth(await handleBalanceValue(userCJpy))
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
		async function getPools() {
			const pools = await getAllPoolsWithBalances()
			setPoolsWithBalances(pools)
		}
		getPools()
	}, [])

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

	useEffect(() => {
		if (chainId === 5) {
			setGwin("0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d")
		} else if (chainId === 1337) {
			setGwin("0xdC0F3E6999e355a9E64CC52D793F5D252C6DFb72")
		}
	})

	return (
		<div>
			<Toaster />
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				<div>
					{poolsWithBalances
						? poolsWithBalances.map((pool) => (
								<h2 key={pool.id}>
									{parseInt(pool.lastSettledUsdPrice)}
								</h2>
						  ))
						: null}
				</div>
				<Pool // 2x
					tokenPic={hEthTwoPic}
					name="ETH/USD - 2x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth2xPoolBal}
					cEth={cEth2xPoolBal}
					userBal={hEthUser2xPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
					symbol="ETH"
				/>
				<Pool // 5x
					tokenPic={hEthFivePic}
					name="ETH/USD - 5x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth5xPoolBal}
					cEth={cEth5xPoolBal}
					userBal={hEthUser5xPoolBal}
					contract={gwin}
					poolId="1"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
					symbol="ETH"
				/>
				<Pool // 10x
					tokenPic={hEthTenPic}
					name="ETH/USD - 10x Pool"
					isHeated="true"
					isCooled="false"
					hEth={hEth10xPoolBal}
					cEth={cEth10xPoolBal}
					userBal={hEthUser10xPoolBal}
					contract={gwin}
					poolId="2"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
					symbol="ETH"
				/>
				<Pool // Cooled
					tokenPic={cEthPic}
					name="ETH/USD - Cooled USD"
					isHeated="false"
					isCooled="true"
					hEth=""
					cEth={(
						Number(cEth2xPoolBal) +
						Number(cEth5xPoolBal) +
						Number(cEth10xPoolBal)
					).toFixed(5)}
					userBal={parentZeroCETHPoolBal}
					contract={gwin}
					poolId="0"
					priceFeed={ethUsdPrice}
					walletBal={userEthWalletBal}
					symbol="ETH"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				<div className="col-span-1 md:col-span-3 pb-6 pt-4">
					<h2 className="text-3xl font-bold w-full text-cyan-900">
						Emulated Assets
					</h2>
					<h5 className="text-xl w-full text-cyan-800">
						Created on chain by fire and ice
					</h5>
				</div>
				<Pool // XAU Stable
					tokenPic={goldPic}
					name="ETH/XAU - 1oz Gold"
					isHeated="false"
					isCooled="true"
					hEth={xauHEth}
					cEth={xauCEth}
					userBal={userXauCEth}
					contract={gwin}
					poolId="2"
					priceFeed={ethXauPrice}
					walletBal={userEthWalletBal}
					symbol="XAU"
				/>
				<Pool // BTC Stable
					tokenPic={btcPic}
					name="ETH/BTC - Cooled Bitcoin"
					isHeated="false"
					isCooled="true"
					hEth={btcHEth}
					cEth={btcCEth}
					userBal={userBtcCEth}
					contract={gwin}
					poolId="6"
					priceFeed={ethBtcPrice}
					walletBal={userEthWalletBal}
					symbol="BTC"
				/>
				<Pool // JPY Stable
					tokenPic={yenPic}
					name="ETH/JPY - Cooled Yen"
					isHeated="false"
					isCooled="true"
					hEth={jpyHEth}
					cEth={jpyCEth}
					userBal={userJpyCEth}
					contract={gwin}
					poolId="6"
					priceFeed={ethJpyPrice}
					walletBal={userEthWalletBal}
					symbol="JPY"
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				<div className="col-span-1 md:col-span-3 pb-6 pt-4">
					<h2 className="text-3xl font-bold w-full text-cyan-900">
						Shorted Emulated Assets
					</h2>
				</div>
				<Pool // XAU Short
					tokenPic={goldPic}
					name="ETH/XAU - 1oz Gold"
					isHeated="true"
					isCooled="false"
					hEth={xauHEth}
					cEth={xauCEth}
					userBal={userXauHEth}
					contract={gwin}
					poolId="2"
					priceFeed={ethXauPrice}
					walletBal={userEthWalletBal}
					symbol="XAU"
				/>
				<Pool // BTC Short
					tokenPic={btcPic}
					name="ETH/BTC - Bitcoin"
					isHeated="true"
					isCooled="false"
					hEth={btcHEth}
					cEth={btcCEth}
					userBal={userBtcHEth}
					contract={gwin}
					poolId="6"
					priceFeed={ethBtcPrice}
					walletBal={userEthWalletBal}
					symbol="BTC"
				/>
				<Pool // JPY Short
					tokenPic={yenPic}
					name="ETH/JPY - Yen"
					isHeated="true"
					isCooled="false"
					hEth={jpyHEth}
					cEth={jpyCEth}
					userBal={userJpyHEth}
					contract={gwin}
					poolId="6"
					priceFeed={ethJpyPrice}
					walletBal={userEthWalletBal}
					symbol="JPY"
				/>
			</div>
		</div>
	)
}
