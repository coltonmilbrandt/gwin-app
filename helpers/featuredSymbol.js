import splitPair from "./splitPair"

const featuredSymbol = (base, quote) => {
	// returns the featured asset
	const base1 = splitPair(base, 0)
	const quote1 = splitPair(quote, 0)
	if (quote1 && quote1 != "") {
		// if quote1 exists, it is the featured asset
		return quote1
	}
	// if quote1 doesn't exist, base1 is the featured asset
	return base1
}

export default featuredSymbol
