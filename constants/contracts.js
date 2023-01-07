const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xdE5e8013F70b038442892FA28273bC39e2b2AA78"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0x094b6FeFBC61Ec518Da947b32ed5Bf7bf432Fa5b"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
