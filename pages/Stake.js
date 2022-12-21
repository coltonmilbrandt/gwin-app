import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import Image from "next/image"
import toast, { Toaster } from "react-hot-toast"
import Balances from "../components/Balances"
import PoolCard from "../components/PoolCard"
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
	const chainIdReadable = parseInt(chainIdHex)
	const chainName = chainDict[chainIdReadable]
	console.log("ChainId" + chainIdReadable)

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
		"0x0aceEE4f17bB2bb65c69B01c66BBa51Ce6DfB1cA"
	)

	const [ethUsdPrice, setEthUsdPrice] = useState(0)
	const [userEthWalletBal, setUserEthWalletBal] = useState(0)
	const [poolsWithBalances, setPoolsWithBalances] = useState([])
	const [isUnstaking, setIsUnstaking] = useState(false)
	const [isStaking, setIsStaking] = useState(false)

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
			_user: "0x4a62Ad2bc1022dE1426ee1Cdb97e605C9b893Ce2",
		},
	})

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
		const interval = setInterval(async () => {
			const pools = await getAllPoolsWithBalances()
			setPoolsWithBalances(pools)
			console.log("ranGetPools !!")
			console.log(pools) // @here console log returns correct value
			console.log(chainIdReadable)
			console.log(gwin)
			console.log(account)
		}, 5000) // runs every 5 seconds

		return () => clearInterval(interval)
	}, [getAllPoolsWithBalances])

	useEffect(() => {
		console.log("useEffect log")
		console.log(poolsWithBalances)
	}, [poolsWithBalances])

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
		console.log("ran chain check")
		if (chainIdReadable == 5) {
			setGwin("0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d")
		} else if (chainIdReadable == 1337) {
			setGwin("0x0aceEE4f17bB2bb65c69B01c66BBa51Ce6DfB1cA")
		}
	})

	return (
		<div>
			<Toaster />
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				{poolsWithBalances
					? poolsWithBalances.map((pool) => (
							<PoolCard
								key={pool.id}
								pool={pool}
								walletBal={userEthWalletBal}
								contract={gwin}
								isHeated={true}
								isCooled={false}
								tokenPic={hEthTwoPic}
							/>
					  ))
					: null}
			</div>
		</div>
	)
}
