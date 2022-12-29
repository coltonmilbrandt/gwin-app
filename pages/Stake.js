import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import toast, { Toaster } from "react-hot-toast"
import PoolCard from "../components/PoolCard"
import CreatePool from "../components/CreatePool"
import Web3 from "web3"
import PoolCardSection from "../components/PoolCardSection"
import PriceChange from "../components/PriceChange"

// this is the main portion of the functional app, contains pools

export default function Stake() {
	// initialize Moralis web hooks
	const {
		isWeb3Enabled,
		account,
		chainId: chainIdHex,
		Moralis,
	} = useMoralis()
	// get chain ID and convert
	const chainIdReadable = parseInt(chainIdHex)
	const chainName = chainDict[chainIdReadable]
	console.log("ChainId" + chainIdReadable)

	// define web3
	let web3

	// initialize web3
	if (
		typeof window !== "undefined" &&
		typeof window.ethereum !== "undefined"
	) {
		// we are in the browser and metamask is running
		window.ethereum.request({ method: "eth_requestAccounts" })
		web3 = new Web3(window.ethereum)
	}

	// get contract info
	const contractsInfo = require("../constants/contractInfo.json")

	// initialize gwin address
	const [gwin, setGwin] = useState("")

	// get gwin address
	useEffect(() => {
		console.log("ran chain check")
		if (chainIdReadable == 5) {
			// set Goerli contract
			setGwin("0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d")
		} else if (chainIdReadable == 1337) {
			// set local contract
			setGwin("0x718a6FE2C74c5735CC683E3eF454D467733BA2B4")
			// don't forget to IMPORT NEW WALLET for balances
		}
	})

	// hooks
	const [ethUsdPrice, setEthUsdPrice] = useState(0)
	const [userEthWalletBal, setUserEthWalletBal] = useState(0)
	const [poolsWithBalances, setPoolsWithBalances] = useState([])
	const [isUnstaking, setIsUnstaking] = useState(false)
	const [isStaking, setIsStaking] = useState(false)

	const [cooledFilteredPools, setCooledFilteredPools] = useState([])
	const [stableFilteredPools, setStableFilteredPools] = useState([])
	const [parentFilteredPools, setParentFilteredPools] = useState([])
	const [shortedFilteredPools, setShortedFilteredPools] = useState([])

	// sets contracts
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

	// get all pools with balances
	const { runContractFunction: getAllPoolsWithBalances } = useWeb3Contract({
		abi: abi,
		contractAddress: gwin,
		functionName: "getAllPoolsWithBalances",
		params: {
			_user: account,
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
			console.log("Pool Call Details")
			console.log(abi)
			console.log(gwin)
			console.log(account)
			const pools = await getAllPoolsWithBalances()
			console.log("pools:")
			console.log(pools)
			let userWalletBal = await web3.eth.getBalance(account)
			if (userWalletBal) {
				userWalletBal = web3.utils.fromWei(userWalletBal, "ether")
				userWalletBal = Number(userWalletBal)
				setUserEthWalletBal(userWalletBal)
			}
			if (pools && typeof pools != "undefined") {
				// filters
				const cooledFilter = pools
					.filter(
						(pool) => pool.cRate > -1000000000000 && pool.cRate < 0
					)
					.filter((pool) => pool.parentId == 0)
				const stableFilter = pools
					.filter((pool) => pool.cRate == -1000000000000)
					.filter((pool) => pool.parentId == 0)

				const parentFilter = pools.filter((pool) => pool.parentId != 0)
				const shortFilter = pools
					.filter((pool) => pool.cRate < -1000000000000)
					.filter((pool) => pool.parentId == 0)
				setShortedFilteredPools(shortFilter)
				setCooledFilteredPools(cooledFilter)
				setStableFilteredPools(stableFilter)
				setParentFilteredPools(parentFilter)
				console.log(parentFilteredPools)
			}
			setPoolsWithBalances(pools)
			console.log("ranGetPools !!")
			console.log(pools)
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

	return (
		<div>
			{/* for toast messages */}
			<Toaster />
			{typeof poolsWithBalances != "undefined" &&
			poolsWithBalances.length > 0 ? (
				<PoolCardSection // Heated Pools
					pools={poolsWithBalances} // pass pools
					sectionName="Heated Pools"
					walletBal={userEthWalletBal}
					contract={gwin}
					isHeated={true}
					isCooled={false}
				/>
			) : (
				// show loader if pools not yet loaded
				<div className="absolute top-1/2 left-1/2 justify-center items-center">
					<div
						className="text-white spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full"
						role="status"
					>
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
			{parentFilteredPools.length > 0 ? (
				<PoolCardSection // Parent Pools
					pools={parentFilteredPools} // pass filtered pools
					sectionName="Parent Pools" // needs to be "Parent Pools" for later consolidation
					walletBal={userEthWalletBal}
					contract={gwin}
					isHeated={false}
					isCooled={true}
				/>
			) : null}
			{stableFilteredPools.length > 0 ? (
				<PoolCardSection // Stable Pools
					pools={stableFilteredPools} // pass filtered pools
					sectionName="Stable Pools"
					walletBal={userEthWalletBal}
					contract={gwin}
					isHeated={false}
					isCooled={true}
				/>
			) : null}
			{shortedFilteredPools.length > 0 ? (
				<PoolCardSection // Cooled Pools
					pools={shortedFilteredPools} // pass filtered pools
					sectionName="Short Pools"
					walletBal={userEthWalletBal}
					contract={gwin}
					isHeated={false}
					isCooled={true}
				/>
			) : null}
			{cooledFilteredPools.length > 0 ? (
				<PoolCardSection // Cooled Pools
					pools={cooledFilteredPools} // pass filtered pools
					sectionName="Cooled Pools"
					walletBal={userEthWalletBal}
					contract={gwin}
					isHeated={false}
					isCooled={true}
				/>
			) : null}
			{/* {chainIdReadable == 1337 ? <PriceChange /> : null} */}
		</div>
	)
}
