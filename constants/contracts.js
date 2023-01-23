const getContract = (chainIdReadable) => {
	console.log("ran chain check")
	if (chainIdReadable == 5) {
		// set Goerli contract
		return "0xaB4367b852B4d24e5baf69c0d857Fa7232bD88F3"
	} else if (chainIdReadable == 1337) {
		// set local contract
		return "0xE51114E9A403a15a7DC65A8713Bd31d1a68a2273"
		// don't forget to IMPORT NEW WALLET for balances
	}
}

export default getContract
