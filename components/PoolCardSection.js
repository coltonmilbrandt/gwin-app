import { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract, useERC20Balances } from "react-moralis"
import React from "react"
import { abi } from "../constants/Gwin_abi"
import { chainDict } from "../constants/chainDict"
import toast, { Toaster } from "react-hot-toast"
import PoolCard from "../components/PoolCard"
import CreatePool from "../components/CreatePool"
import Web3 from "web3"
import parentPoolFilter from "../helpers/parentPoolFilter"

// returns a section of Pool Cards filtered by type
const PoolCardSection = ({
	pools,
	handlePoolSelection,
	sectionName,
	walletBal,
	contract,
	isHeated,
	isCooled,
}) => {
	const [updatedPools, parentIds] = parentPoolFilter(
		pools,
		isHeated,
		isCooled
	)

	const [isCreatePoolOpen, setIsCreatePoolOpen] = useState(false)

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 text-gray-900 pb-4">
			<div className="col-span-1 md:col-span-3 grid grid-cols-4 pb-6 pt-4">
				<h2 className="col-span-3 text-3xl font-bold w-full text-cyan-900">
					{sectionName}
				</h2>
				<div className="col-span-1 relative flex justify-end">
					{/* button to add a pool
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
					</a> */}
				</div>
			</div>
			{/* list relevant pools */}
			{pools.length > 0
				? pools
						.filter((pool) => !parentIds[pool.parentId])
						.map((pool) => (
							<PoolCard
								key={pool.id}
								pool={pool}
								walletBal={walletBal}
								contract={contract}
								isHeated={isHeated}
								isCooled={isCooled}
								handlePoolSelection={handlePoolSelection}
							/>
						))
				: null}
			{updatedPools.length > 0
				? updatedPools.map((pool) => (
						<PoolCard
							key={pool.parentId}
							pool={pool}
							walletBal={walletBal}
							contract={contract}
							isHeated={isHeated}
							isCooled={isCooled}
							handlePoolSelection={handlePoolSelection}
						/>
				  ))
				: null}
			{/* create pool modal */}
			<CreatePool
				isOpen={isCreatePoolOpen}
				onClose={() => setIsCreatePoolOpen(false)}
				userWalletBal={walletBal}
				contract={contract}
			/>
		</div>
	)
}

export default PoolCardSection
