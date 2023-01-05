import penguinsTrade from "/public/penguinsTrade.jpg"
import Image from "next/image"

const Welcome = () => {
	return (
		<div className="bg-sky-50 m-3 shadow-lg px-6 py-8 rounded-lg text-gray-700">
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
						variety of markets. Select the Goerli Testnet and
						connect your wallet to get started.
					</p>
					<button className="mt-6">
						<a
							className="text-white font-semi-bold py-3 px-5 rounded-md bg-gradient-to-br hover:bg-gradient-to-tl from-[#8e81f3] to-sky-400"
							href="https://coltonmilbrandt.gitbook.io/gwin/"
							target="_blank"
							rel="noopener"
						>
							Read Full Docs
						</a>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Welcome
