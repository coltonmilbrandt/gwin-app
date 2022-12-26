import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import toast, { Toaster } from "react-hot-toast"
import PoolCard from "../components/PoolCard"
import CreatePool from "../components/CreatePool"
import Web3 from "web3"

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
			setGwin("0x9562cbbEF48728A6ff8Dcfb1E45073F5349B3C51")
			// don't forget to IMPORT NEW WALLET for balances
		}
	})

	// hooks
	const [ethUsdPrice, setEthUsdPrice] = useState(0)
	const [userEthWalletBal, setUserEthWalletBal] = useState(0)
	const [poolsWithBalances, setPoolsWithBalances] = useState([])
	const [isUnstaking, setIsUnstaking] = useState(false)
	const [isStaking, setIsStaking] = useState(false)
	const [isCreatePoolOpen, setIsCreatePoolOpen] = useState(false)

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
			const pools = await getAllPoolsWithBalances()
			let userWalletBal = await web3.eth.getBalance(account)
			if (userWalletBal) {
				userWalletBal = web3.utils.fromWei(userWalletBal, "ether")
				userWalletBal = Number(userWalletBal)
				setUserEthWalletBal(userWalletBal)
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
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				{/* list heated pools */}
				{poolsWithBalances.length > 0 ? (
					poolsWithBalances.map((pool) => (
						<PoolCard
							key={pool.id}
							pool={pool}
							walletBal={userEthWalletBal}
							contract={gwin}
							isHeated={true}
							isCooled={false}
						/>
					))
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
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
				<div className="col-span-1 md:col-span-3 grid grid-cols-4 pb-6 pt-4">
					<h2 className="col-span-3 text-3xl font-bold w-full text-cyan-900">
						Shorted Assets
					</h2>
					<div className="col-span-1 relative flex justify-end">
						{/* button to add a pool */}
						<a
							className="inline-block text-xl fill-white font-bold text-white hover:text-sky-800 hover:fill-sky-800 active:text-sky-900 active:fill-sky-900 cursor-pointer"
							onClick={() => setIsCreatePoolOpen(true)}
						>
							Add Pool&nbsp;&nbsp;
							<svg
								className="w-8 h-8 inline-block"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
							>
								<path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM232 344V280H168c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H280v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
							</svg>
						</a>
					</div>
				</div>
				{/* list cooled, stable, and shorted pools */}
				{poolsWithBalances.length > 0 ? (
					poolsWithBalances.map((pool) => (
						<PoolCard
							key={pool.id}
							pool={pool}
							walletBal={userEthWalletBal}
							contract={gwin}
							isHeated={false}
							isCooled={true}
						/>
					))
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
				{/* create pool modal */}
				<CreatePool
					isOpen={isCreatePoolOpen}
					onClose={() => setIsCreatePoolOpen(false)}
					userWalletBal={userEthWalletBal}
					contract={gwin}
				/>
			</div>
		</div>
	)
}
