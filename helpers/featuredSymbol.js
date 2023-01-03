import splitPair from "./splitPair"
import getHeat from "./getHeat"

const featuredSymbol = (base, quote, leverage) => {
	const heat = getHeat(leverage)
	// returns the featured asset
	const base1 = splitPair(base, 0)
	const base2 = splitPair(base, 1)
	const quote1 = splitPair(quote, 0)
	if (quote1 && quote1 != "") {
		// if quote1 exists, it is the featured asset
		return quote1
	}
	// if quote1 doesn't exist, base1 is the featured asset
	switch (getHeat(leverage)) {
		case "iced":
			return base2
			break
		case "shorted":
			return base1
			break
		case "cooled":
			return base1
			break
		case "heated":
			return base1
		default:
			// return default value as fallback
			return base1
	}
}

export default featuredSymbol
