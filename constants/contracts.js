const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xe4d3900e47Aaa60494BA8F593Dd8c779D0fA0B3d"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0xbaD9d8Ff5f54e2772549Cc5F7DA740541B447b96"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
