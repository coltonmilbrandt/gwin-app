const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xE0a70f05F5DA82BeeAb7E264d7a7f8bB19A265C9"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0xF0bE150D48F5876e1337193059e3d7E3174974eE"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
