import splitPair from "./splitPair"
import convertRate from "./convertRate"
import generateDescription from "./generateDescription"
import { cryptoCurrencies } from "./cryptoDict"

// generate name based on price feeds, heated/cooled, and leverage (hRate/cRate)

const generateChartPair = (
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
		const quote2 = splitPair(quotePriceFeedKey, 1)
		// get leverage based on whether Pool Card is heated, and convert rate to human readable
		const leverage = isHeated ? convertRate(hRate) : convertRate(cRate)
		let chartPair
		if (
			// check if base2 is undefined
			typeof base2 === "undefined" &&
			(quote1 == "N/A" || quote1 == "")
		) {
			chartPair = base1 + "/??? "
			return chartPair.toString()
		} else if (quote1 == "N/A" || quote1 == "") {
			// if quote1 is "N/A", set chartPair to be base1/base2
			chartPair = base1 + "/" + base2
			return chartPair.toString()
		} else {
			// otherwise, set chartPair to be base1/quote1
			let simplePair = base1 + "/" + quote1
			simplePair.toString() in cryptoCurrencies
				? (chartPair = simplePair)
				: (chartPair = base1 + base2 + "/" + quote1 + quote2)
			return chartPair.toString()
		}
	} catch (error) {
		console.error(error)
		return "N/A" // return default value when the hexToUtf8 throws an error
	}
}
export default generateChartPair
