const icePoint = -1000000000000

const getHeat = (leverage) => {
	// use 'leverage' to determine heat
	if (leverage == icePoint) {
		// asset target is stable
		return "iced"
	} else if (leverage < 0 && leverage > icePoint) {
		// asset target is not totally stabilized, but cooled
		return "cooled"
	} else if (leverage > 0) {
		// asset target is long
		return "heated"
	} else if (leverage < icePoint) {
		// asset target is shorted
		return "shorted"
	} else {
		// fallback
		return "none"
	}
}

export default getHeat
