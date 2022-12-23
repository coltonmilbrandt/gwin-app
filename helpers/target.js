import featuredSymbol from "./featuredSymbol"
import splitPair from "./splitPair"

const target = (base, quote) => {
	// returns the asset opposite of the featured asset
	const base1 = splitPair(base, 0)
	const base2 = splitPair(base, 1)
	const quote1 = splitPair(quote, 0)
	if (featuredSymbol(base, quote) == base1) {
		// if base1 is the featured asset, base2 is the target
		return base2
	} else if (featuredSymbol(base, quote) == quote1) {
		// if quote1 is the featured asset, base1 is the target
		return base1
	}
}

export default target
