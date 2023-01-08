import splitPair from "./splitPair"
import convertRate from "./convertRate"
import generateDescription from "./generateDescription"

// generate name based on price feeds, heated/cooled, and leverage (hRate/cRate)

const generatePoolName = (
	basePriceFeedKey,
	quotePriceFeedKey,
	isHeated,
	isCooled,
	hRate,
	cRate
) => {
	try {
		// split basePriceFeedKey into base1 and base2
		const base1 = splitPair(basePriceFeedKey, 0)
		const base2 = splitPair(basePriceFeedKey, 1)
		// split quotePriceFeedKey into quote1
		const quote1 = splitPair(quotePriceFeedKey, 0)
		// get leverage based on whether Pool Card is heated, and convert rate to human readable
		const leverage = isHeated ? convertRate(hRate) : convertRate(cRate)
		let poolName
		if (
			// check if base2 is undefined
			typeof base2 === "undefined" &&
			(quote1 == "N/A" || quote1 == "")
		) {
			poolName = base1 + "/??? "
			return poolName
		} else if (quote1 == "N/A" || quote1 == "") {
			// if quote1 is "N/A", set poolName to be base1/base2
			poolName = base1 + "/" + base2
			return poolName
		} else {
			// otherwise, set poolName to be base1/quote1
			poolName = base1 + "/" + quote1
			return poolName
		}
	} catch (error) {
		console.error(error)
		return "N/A" // return default value when the hexToUtf8 throws an error
	}
}
export default generatePoolName
