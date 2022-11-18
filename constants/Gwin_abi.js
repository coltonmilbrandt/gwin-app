module.exports = {
	abi: [
		{
			inputs: [
				{
					internalType: "address",
					name: "_gwinTokenAddress",
					type: "address",
				},
				{ internalType: "address", name: "_link", type: "address" },
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "address",
					name: "previousOwner",
					type: "address",
				},
				{
					indexed: true,
					internalType: "address",
					name: "newOwner",
					type: "address",
				},
			],
			name: "OwnershipTransferred",
			type: "event",
		},
		{
			inputs: [
				{ internalType: "address", name: "_token", type: "address" },
			],
			name: "addAllowedTokens",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "aggregatorKeys",
			outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
			name: "aggregators",
			outputs: [
				{
					internalType: "contract AggregatorV3Interface",
					name: "",
					type: "address",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "allowedTokens",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
			name: "currencyKeyDecimals",
			outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "bool", name: "_isCooled", type: "bool" },
				{ internalType: "bool", name: "_isHeated", type: "bool" },
				{ internalType: "uint256", name: "_cAmount", type: "uint256" },
				{ internalType: "uint256", name: "_hAmount", type: "uint256" },
			],
			name: "depositToTranche",
			outputs: [],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "address", name: "", type: "address" },
			],
			name: "ethStakedBalance",
			outputs: [
				{ internalType: "uint256", name: "cBal", type: "uint256" },
				{ internalType: "uint256", name: "cPercent", type: "uint256" },
				{ internalType: "uint256", name: "hBal", type: "uint256" },
				{ internalType: "uint256", name: "hPercent", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "address", name: "", type: "address" },
			],
			name: "ethStakedWithParent",
			outputs: [
				{ internalType: "uint256", name: "cBal", type: "uint256" },
				{ internalType: "uint256", name: "cPercent", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			name: "ethStakers",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "address", name: "_base", type: "address" },
				{ internalType: "address", name: "_quote", type: "address" },
				{ internalType: "uint8", name: "_decimals", type: "uint8" },
			],
			name: "getDerivedPrice",
			outputs: [{ internalType: "int256", name: "", type: "int256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_price", type: "uint256" },
			],
			name: "getEstCEthInParentPool",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "getParentPoolCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "getParentPoolHEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "getParentUserCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "getParentUserCEthPercent",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{
					internalType: "uint256",
					name: "_currentUsdPrice",
					type: "uint256",
				},
			],
			name: "getProfit",
			outputs: [{ internalType: "int256", name: "", type: "int256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_address", type: "address" },
				{ internalType: "bool", name: "_isCooled", type: "bool" },
				{ internalType: "bool", name: "_isAll", type: "bool" },
			],
			name: "getRangeOfReturns",
			outputs: [{ internalType: "int256[]", name: "", type: "int256[]" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "gwinToken",
			outputs: [
				{ internalType: "contract IERC20", name: "", type: "address" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint8", name: "_type", type: "uint8" },
				{ internalType: "uint8", name: "_parentId", type: "uint8" },
				{
					internalType: "address",
					name: "_basePriceFeedAddress",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "_baseCurrencyKey",
					type: "bytes32",
				},
				{
					internalType: "address",
					name: "_quotePriceFeedAddress",
					type: "address",
				},
				{
					internalType: "bytes32",
					name: "_quoteCurrencyKey",
					type: "bytes32",
				},
				{ internalType: "int256", name: "_cRate", type: "int256" },
				{ internalType: "int256", name: "_hRate", type: "int256" },
			],
			name: "initializePool",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "payable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "address", name: "", type: "address" },
			],
			name: "isUniqueEthStaker",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "owner",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "parentPoolBal",
			outputs: [
				{ internalType: "uint256", name: "cEthBal", type: "uint256" },
				{ internalType: "uint256", name: "hEthBal", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "parentPoolChildren",
			outputs: [
				{ internalType: "uint256", name: "parentId", type: "uint256" },
				{
					internalType: "uint256",
					name: "lastSettledUsdPrice",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "currentUsdPrice",
					type: "uint256",
				},
				{
					internalType: "bytes32",
					name: "basePriceFeedKey",
					type: "bytes32",
				},
				{
					internalType: "bytes32",
					name: "quotePriceFeedKey",
					type: "bytes32",
				},
				{ internalType: "uint256", name: "hEthBal", type: "uint256" },
				{ internalType: "uint256", name: "cEthBal", type: "uint256" },
				{ internalType: "int256", name: "hRate", type: "int256" },
				{ internalType: "int256", name: "cRate", type: "int256" },
				{ internalType: "uint8", name: "poolType", type: "uint8" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "parentPoolId",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "pool",
			outputs: [
				{ internalType: "uint256", name: "parentId", type: "uint256" },
				{
					internalType: "uint256",
					name: "lastSettledUsdPrice",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "currentUsdPrice",
					type: "uint256",
				},
				{
					internalType: "bytes32",
					name: "basePriceFeedKey",
					type: "bytes32",
				},
				{
					internalType: "bytes32",
					name: "quotePriceFeedKey",
					type: "bytes32",
				},
				{ internalType: "uint256", name: "hEthBal", type: "uint256" },
				{ internalType: "uint256", name: "cEthBal", type: "uint256" },
				{ internalType: "int256", name: "hRate", type: "int256" },
				{ internalType: "int256", name: "cRate", type: "int256" },
				{ internalType: "uint8", name: "poolType", type: "uint8" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "poolIds",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewParentUserCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_price", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewParentUserCEthBalanceAtPrice",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "previewPoolBalances",
			outputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_price", type: "uint256" },
			],
			name: "previewPoolBalancesAtPrice",
			outputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "previewUserBalance",
			outputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewUserCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_price", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewUserCEthBalanceAtPrice",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewUserHEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_price", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "previewUserHEthBalanceAtPrice",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "renounceOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "uint256", name: "_index", type: "uint256" },
			],
			name: "retrieveAddressAtIndex",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "retrieveCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "retrieveCEthPercentBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "retrieveCurrentPrice",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "retrieveEthInContract",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "retrieveHEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "address", name: "_user", type: "address" },
			],
			name: "retrieveHEthPercentBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "retrieveProtocolCEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "retrieveProtocolEthPrice",
			outputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
			],
			name: "retrieveProtocolHEthBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{
					internalType: "uint256",
					name: "_simAssetUsd",
					type: "uint256",
				},
			],
			name: "simulateInteract",
			outputs: [
				{ internalType: "uint256", name: "", type: "uint256" },
				{ internalType: "uint256", name: "", type: "uint256" },
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_amount", type: "uint256" },
				{ internalType: "address", name: "_token", type: "address" },
			],
			name: "stakeTokens",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			name: "stakers",
			outputs: [{ internalType: "address", name: "", type: "address" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "address", name: "", type: "address" },
				{ internalType: "address", name: "", type: "address" },
			],
			name: "stakingBalance",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "address", name: "_token", type: "address" },
			],
			name: "tokenIsAllowed",
			outputs: [{ internalType: "bool", name: "", type: "bool" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "address", name: "newOwner", type: "address" },
			],
			name: "transferOwnership",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [{ internalType: "address", name: "", type: "address" }],
			name: "uniquePositions",
			outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{ internalType: "uint256", name: "_poolId", type: "uint256" },
				{ internalType: "bool", name: "_isCooled", type: "bool" },
				{ internalType: "bool", name: "_isHeated", type: "bool" },
				{ internalType: "uint256", name: "_cAmount", type: "uint256" },
				{ internalType: "uint256", name: "_hAmount", type: "uint256" },
				{ internalType: "bool", name: "_isAll", type: "bool" },
			],
			name: "withdrawFromTranche",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
	],
}
