import penguinsTrade from "/public/penguinsTrade.jpg"
import Image from "next/image"
import { ConnectButton } from "web3uikit"

const Welcome = () => {
	return (
		<div className="bg-sky-50 m-3 max-w-3xl mx-auto shadow-lg px-6 py-10 rounded-lg text-gray-700">
			<div className="flex justify-center w-full pb-3">
				<Image
					className="w-max h-max rounded-full "
					width="200px"
					height="200px"
					src={penguinsTrade}
					alt="gwin"
				/>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
						Welcome to Gwin!
					</p>
					<p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
						With Gwin, it's simple to create and trade an endless
						variety of markets. Select the Goerli testnet and
						connect your wallet to get started.
					</p>
					<div className="w-full flex justify-center mt-6">
						<button>
							<a
								className="text-[#2f7daf] font-semibold py-2.5 px-4 rounded-2xl border-2 border-sky-50 hover:border-2 hover:bg-gray-100 hover:border-[#a1bed9]"
								href="https://coltonmilbrandt.gitbook.io/gwin/"
								target="_blank"
								rel="noopener"
							>
								Read Full Docs
							</a>
						</button>
						<ConnectButton moralisAuth={false} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome
