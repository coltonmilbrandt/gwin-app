import Web3 from "web3"

const parentPoolFilter = (pools, isHeated, isCooled) => {
	const web3 = new Web3()

	// Filter Parent Pools to single displayed pool
	// Initialize an object to store parentIds
	const parentIds = {}

	// Iterate over the 'pools' array
	for (const pool of pools) {
		// If the pool has a parentId that is not 0 and the 'isCooled' flag is true,
		// add the parentId to the 'parentIds' object
		if (pool.parentId && pool.parentId != 0 && isCooled == true) {
			parentIds[pool.parentId] = true
		}
	}

	// Initialize an array to store the updated pools
	const updatedPools = []

	// Iterate over the parentIds in the 'parentIds' object
	for (const parentId in parentIds) {
		// Find the first pool with this parentId
		let firstPoolWithParentId
		for (const pool of pools) {
			if (pool.parentId == parentId) {
				firstPoolWithParentId = { ...pool }
				break
			}
		}

		// Initialize variables to store the sum of cBalancePreview and hBalancePreview for all pools with this parentId
		let cBalancePreviewSum = web3.utils.toBN(0)
		let hBalancePreviewSum = web3.utils.toBN(0)

		// Sum the cBalancePreview and hBalancePreview for all pools with this parentId
		for (const pool of pools) {
			if (pool.parentId == parentId) {
				cBalancePreviewSum = cBalancePreviewSum.add(
					web3.utils.toBN(pool.cBalancePreview)
				)
				hBalancePreviewSum = hBalancePreviewSum.add(
					web3.utils.toBN(pool.hBalancePreview)
				)
			}
		}

		// Add the first pool with this parentId to the updatedPools array, with the cBalancePreview and hBalancePreview
		// set to the sum of all pools with this parentId
		updatedPools.push({
			...firstPoolWithParentId,
			cBalancePreview: cBalancePreviewSum,
			hBalancePreview: hBalancePreviewSum,
		})
	}

	return [updatedPools, parentIds]
}

export default parentPoolFilter
