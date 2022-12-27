import getHeat from "./getHeat"
import convertRate from "./convertRate"

// generate description from leverage, and pool heat level

const generateDescription = (leverage, isHeated, isCooled) => {
	let description
	// get leverage
	const heat = getHeat(leverage)
	// convert leverage to human readable (i.e. 10x)
	const inX = convertRate(leverage)
	if (isHeated == true) {
		description = inX + " Long"
	} else if (isCooled == true) {
		switch (heat) {
			case "iced":
				description = "stabilized"
				break
			case "cooled":
				description = inX + " Cooled"
				break
			case "shorted":
				description = inX + " Short"
				break
		}
	}
	return description
}

export default generateDescription
