import web3 from "web3"

// converts hex value into a string

const convertHex = function (hexVal, decimals) {
	// only proceed if pair is a hex value and is not equal to "0x0"
	try {
		// convert the hex value to a string
		const val = web3.utils.hexToNumber(hexVal)
		if (decimals && decimals != 0) {
			val = val / 10 ** decimals
		}
		return val
	} catch (error) {
		console.error(error)
		return 0 // return default value
	}
}

export default convertHex
