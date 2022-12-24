import web3 from "web3"

// splits a trading pair according to your selection

const splitPair = function (pair, element) {
	// only proceed if pair is a hex value and is not equal to "0x0"
	if (web3.utils.isHex(pair) && pair != "0x0") {
		try {
			if (pair !== "") {
				// convert the hex value to a string and split it into parts
				const str = web3.utils.hexToUtf8(pair)
				const parts = str.split("/")
				const result = parts[element]
				return result
			} else {
				return "N/A"
			}
		} catch (error) {
			console.error(error)
			return "N/A" // return default value when the hexToUtf8 throws an error
		}
	} else {
		if (typeof pair === "string") {
			let strParts = pair.split("/")
			return strParts[element]
		}
		return "N/A"
	}
}

export default splitPair
