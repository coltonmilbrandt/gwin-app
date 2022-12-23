// convert rate int into human readable (f.e. "5x")

const convertRate = function (rate) {
	let convertedRate
	if (rate && rate != "0x0") {
		try {
			// convert int to readable value (f.e. "5x")
			convertedRate = parseInt(rate) / 10 ** 12 + 1
			convertedRate = Math.abs(convertedRate)
			convertedRate = convertedRate.toString() + "x"
			return convertedRate
		} catch (error) {
			console.error(error)
			return "N/A" // return default value when error thrown
		}
	}
}
export default convertRate
