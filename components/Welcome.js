import penguinsTrade from "/public/penguinsTrade.jpg"
import Image from "next/image"
import { ConnectButton } from "web3uikit"

const Welcome = () => {
	return (
		<div className="bg-sky-50 m-3 max-w-2xl mx-auto shadow-lg px-6 py-10 rounded-lg text-gray-700">
			<div className="flex justify-center w-full pb-3">
				<Image
					className="w-max h-max rounded-full"
					width="200px"
					height="200px"
					src={penguinsTrade}
					alt="gwin"
				/>
			</div>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-cyan-900 sm:text-5xl sm:tracking-tight">
						Welcome Gwinners
					</p>
					<p className="inline-block text-lg leading-8 font-normal tracking-tight text-cyan-800 sm:text-xl sm:tracking-tight">
						create and trade{" "}
						<svg
							className="w-8 h-8 inline-block fill-cyan-900"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 640 512"
						>
							<path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" />
						</svg>{" "}
						markets
						{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
					</p>
					<p className="mt-4 max-w-2xl text-lg text-gray-500 mx-auto">
						Select the Goerli testnet and&nbsp;
						<b>connect your wallet</b> to get started.
					</p>
					<div className="w-full flex justify-center mt-6">
						<ConnectButton moralisAuth={false} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Welcome
