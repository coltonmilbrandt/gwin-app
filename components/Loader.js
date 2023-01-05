const Loader = (chainIdReadable) => {
	const chainIdDict = {
		5: "Goerli",
		4: "Rinkeby",
		42: "Kovan",
		1337: "LocalHost",
		1: "Mainnet",
	}

	console.log(chainIdReadable)

	let chainName =
		chainIdReadable && typeof chainIdReadable != "undefined"
			? chainIdDict[chainIdReadable.chainId]
			: null

	return (
		<div className="absolute top-1/2 left-1/2 -translate-x-20 justify-center items-center">
			<div className="w-40 text-center bg-sky-200 bg-opacity-50 rounded-xl p-6">
				<div
					className="text-white spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full"
					role="status"
				>
					<span className="visually-hidden">Loading...</span>
				</div>
				<p className="mt-2 font-semibold">
					Connecting to {chainName}...
				</p>
			</div>
		</div>
	)
}

export default Loader
