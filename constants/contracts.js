const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0x8eC29864Eedea60d0825DEFd3f2dCDe711D0ab52"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
