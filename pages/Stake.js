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
import getContract from "../constants/contracts"
import Welcome from "../components/Welcome"
import Loader from "../components/Loader"

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
		setGwin(getContract(chainIdReadable))
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

	///////////   Update UI   ////////////

	useEffect(() => {
		const interval = setInterval(async () => {
			const pools = await getAllPoolsWithBalances()
			console.log("pools:")
			console.log(pools)
			if (account && typeof account != "undefined") {
				let userWalletBal = await web3.eth.getBalance(account)
				if (userWalletBal) {
					userWalletBal = web3.utils.fromWei(userWalletBal, "ether")
					userWalletBal = Number(userWalletBal)
					setUserEthWalletBal(userWalletBal)
				}
			}
			if (pools && typeof pools != "undefined") {
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
			console.log(parentFilteredPools)
		}, 3000) // runs every 3 seconds

		return () => clearInterval(interval)
	}, [getAllPoolsWithBalances])

	return (
		<div>
			{/* for toast messages */}
			<Toaster />
			{typeof poolsWithBalances != "undefined" &&
			poolsWithBalances.length > 0 ? (
				<>
					<PoolCardSection // Heated Pools
						pools={poolsWithBalances} // pass pools
						sectionName="Heated Pools"
						walletBal={userEthWalletBal}
						contract={gwin}
						isHeated={true}
						isCooled={false}
					/>
					{parentFilteredPools.length > 0 ? (
						<PoolCardSection // Parent Pools
							pools={parentFilteredPools} // pass filtered pools
							sectionName="Parent Pools" // needs to be "Parent Pools" exactly for later consolidation
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
						<PoolCardSection // Short Pools
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
				</>
			) : (
				// show if pools not yet loaded
				<div>
					{account && typeof account != undefined ? (
						// show loader if account detected
						<Loader chainId={chainIdReadable} />
					) : (
						// show welcome if account not detected
						<Welcome />
					)}
				</div>
			)}
		</div>
	)
}
