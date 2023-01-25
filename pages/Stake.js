import { useState, useEffect, useRef } from "react"
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

	const [selectedPoolId, setselectedPoolId] = useState(null)
	const [selectedParentId, setSelectedParentId] = useState(null)
	const previousSelectedPoolId = useRef(null)
	const previousSelectedParentId = useRef(null)

	const [cooledFilteredPools, setCooledFilteredPools] = useState([])
	const [stableFilteredPools, setStableFilteredPools] = useState([])
	const [parentFilteredPools, setParentFilteredPools] = useState([])
	const [shortedFilteredPools, setShortedFilteredPools] = useState([])

	const handlePoolSelection = async (poolId, parentId) => {
		setselectedPoolId(poolId.toString())
		setSelectedParentId(parentId.toString())
		console.log(
			"ran handlePoolSelection with pool: " +
				poolId +
				" parent ID: " +
				parentId
		)
	}

	const clearPoolSelection = async () => {
		setselectedPoolId(null)
		setSelectedParentId(null)
	}

	const filterAllPools = async () => {
		let pools = await getAllPoolsWithBalances()
		if (selectedPoolId != null && typeof selectedPoolId != undefined) {
			selectedParentId == 0
				? (pools = pools.filter((pool) => pool.id == selectedPoolId))
				: (pools = pools.filter(
						(pool) => pool.parentId == selectedParentId
				  ))
		}
		console.log("pools:")
		console.log(pools)
		if (pools && typeof pools != "undefined") {
			const cooledFilter = pools
				.filter((pool) => pool.cRate > -1000000000000 && pool.cRate < 0)
				.filter((pool) => pool.parentId == 0)
			const stableFilter = pools
				.filter((pool) => pool.cRate == -1000000000000)
				.filter((pool) => pool.parentId == 0)

			const parentFilter = pools.filter((pool) => pool.parentId != 0)
			const shortFilter = pools
				.filter((pool) => pool.cRate < -1000000000000)
				.filter((pool) => pool.parentId == 0)
			setPoolsWithBalances(pools)
			setShortedFilteredPools(shortFilter)
			setCooledFilteredPools(cooledFilter)
			setStableFilteredPools(stableFilter)
			setParentFilteredPools(parentFilter)
			console.log(parentFilteredPools)
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

	///////////   Update UI   ////////////

	useEffect(() => {
		const interval = setInterval(async () => {
			if (account && typeof account != "undefined") {
				let userWalletBal = await web3.eth.getBalance(account)
				if (userWalletBal) {
					userWalletBal = web3.utils.fromWei(userWalletBal, "ether")
					userWalletBal = Number(userWalletBal)
					setUserEthWalletBal(userWalletBal)
				}
			}
			filterAllPools()
		}, 3000) // runs every 3 seconds

		return () => clearInterval(interval)
	})

	useEffect(() => {
		if (
			selectedPoolId !== previousSelectedPoolId.current ||
			selectedParentId !== previousSelectedParentId.current
		) {
			filterAllPools()
			previousSelectedPoolId.current = selectedPoolId
			previousSelectedParentId.current = selectedParentId
		}
	}, [poolsWithBalances, selectedPoolId, selectedParentId])

	return (
		<div>
			{/* for toast messages */}
			<Toaster />
			{typeof selectedPoolId != "undefined" && selectedPoolId != null ? (
				<button
					type="button"
					class="inline-block px-4 -ml-4 pt-2.5 pb-2 text-indigo-600 fill-indigo-600 hover:fill-white focus:fill-white active:fill-white hover:text-white active:text-white focus:text-white font-medium text-base leading-normal rounded-md hover:bg-[#7d71d1] hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-900 active:shadow-lg transition duration-150 ease-in-out flex align-center"
					onClick={clearPoolSelection}
				>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="fas"
						data-icon="download"
						className="w-6 h-6"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
					</svg>
					{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
					Back
				</button>
			) : null}
			{typeof poolsWithBalances != "undefined" &&
			poolsWithBalances.length > 0 ? (
				<>
					<PoolCardSection // Heated Pools
						pools={poolsWithBalances} // pass pools
						handlePoolSelection={handlePoolSelection} // function to update pool selection
						sectionName="Heated Pools"
						walletBal={userEthWalletBal}
						contract={gwin}
						isHeated={true}
						isCooled={false}
					/>
					{parentFilteredPools.length > 0 ? (
						<PoolCardSection // Parent Pools
							pools={parentFilteredPools} // pass filtered pools
							handlePoolSelection={handlePoolSelection} // function to update pool selection
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
							handlePoolSelection={handlePoolSelection} // function to update pool selection
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
							handlePoolSelection={handlePoolSelection} // function to update pool selection
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
							handlePoolSelection={handlePoolSelection} // function to update pool selection
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
