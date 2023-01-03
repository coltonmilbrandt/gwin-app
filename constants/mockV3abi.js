module.exports = {
	abi: [
		{
			inputs: [
				{
					internalType: "uint8",
					name: "_decimals",
					type: "uint8",
				},
				{
					internalType: "int256",
					name: "_initialAnswer",
					type: "int256",
				},
			],
			stateMutability: "nonpayable",
			type: "constructor",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "int256",
					name: "current",
					type: "int256",
				},
				{
					indexed: true,
					internalType: "uint256",
					name: "roundId",
					type: "uint256",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "updatedAt",
					type: "uint256",
				},
			],
			name: "AnswerUpdated",
			type: "event",
		},
		{
			anonymous: false,
			inputs: [
				{
					indexed: true,
					internalType: "uint256",
					name: "roundId",
					type: "uint256",
				},
				{
					indexed: true,
					internalType: "address",
					name: "startedBy",
					type: "address",
				},
				{
					indexed: false,
					internalType: "uint256",
					name: "startedAt",
					type: "uint256",
				},
			],
			name: "NewRound",
			type: "event",
		},
		{
			inputs: [],
			name: "decimals",
			outputs: [
				{
					internalType: "uint8",
					name: "",
					type: "uint8",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "description",
			outputs: [
				{
					internalType: "string",
					name: "",
					type: "string",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "getAnswer",
			outputs: [
				{
					internalType: "int256",
					name: "",
					type: "int256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint80",
					name: "_roundId",
					type: "uint80",
				},
			],
			name: "getRoundData",
			outputs: [
				{
					internalType: "uint80",
					name: "roundId",
					type: "uint80",
				},
				{
					internalType: "int256",
					name: "answer",
					type: "int256",
				},
				{
					internalType: "uint256",
					name: "startedAt",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "updatedAt",
					type: "uint256",
				},
				{
					internalType: "uint80",
					name: "answeredInRound",
					type: "uint80",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			name: "getTimestamp",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "latestAnswer",
			outputs: [
				{
					internalType: "int256",
					name: "",
					type: "int256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "latestRound",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "latestRoundData",
			outputs: [
				{
					internalType: "uint80",
					name: "roundId",
					type: "uint80",
				},
				{
					internalType: "int256",
					name: "answer",
					type: "int256",
				},
				{
					internalType: "uint256",
					name: "startedAt",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "updatedAt",
					type: "uint256",
				},
				{
					internalType: "uint80",
					name: "answeredInRound",
					type: "uint80",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [],
			name: "latestTimestamp",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "int256",
					name: "_answer",
					type: "int256",
				},
			],
			name: "updateAnswer",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [
				{
					internalType: "uint80",
					name: "_roundId",
					type: "uint80",
				},
				{
					internalType: "int256",
					name: "_answer",
					type: "int256",
				},
				{
					internalType: "uint256",
					name: "_timestamp",
					type: "uint256",
				},
				{
					internalType: "uint256",
					name: "_startedAt",
					type: "uint256",
				},
			],
			name: "updateRoundData",
			outputs: [],
			stateMutability: "nonpayable",
			type: "function",
		},
		{
			inputs: [],
			name: "version",
			outputs: [
				{
					internalType: "uint256",
					name: "",
					type: "uint256",
				},
			],
			stateMutability: "view",
			type: "function",
		},
	],
}
