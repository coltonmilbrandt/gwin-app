const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xE0a70f05F5DA82BeeAb7E264d7a7f8bB19A265C9"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0x7c0c736F930Da3050259e5c4881A12ac5bd33dCc"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
