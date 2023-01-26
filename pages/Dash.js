import { useMoralis } from "react-moralis"
import Stake from "./Stake"
import Nav from "../components/Nav"

// this is the main container for the functional portion of the app

export default function Dash() {
	// initialize Moralis web hooks
	const { isWeb3Enabled, chainId: chainIdHex } = useMoralis()
	// get chain id
	const chainId = parseInt(chainIdHex)

	return (
		<>
			<Nav />
			<div className="bg-gradient-to-br from-gray-50 to-sky-400 min-h-screen">
				{/* <header>
					<div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
						<h1 className="text-3xl font-bold text-[#565264]">
							Gwin Protocol
						</h1>
					</div>
				</header> */}
				<main>
					<div className="max-w-7xl mx-auto pt-2 pb-3 sm:px-6 lg:px-8 text-gray-100">
						<div className="grid grid-cols-1 gap-4">
							<div className="bg-none p-4">
								{isWeb3Enabled ? (
									<div>
										{/* if chainId is not Goerli or local */}
										<div
											className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
											role="alert"
											style={{
												display:
													chainId != 5 &&
													chainId != 1337
														? "inline-flex"
														: "none",
											}}
										>
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="exclamation-triangle"
												className="w-4 h-4 mr-2 fill-current"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<path
													fill="currentColor"
													d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
												></path>
											</svg>
											Gwin uses the Goerli Test Net.
											Please switch to Goerli.
										</div>
										{/* if chain ID is local 1337 */}
										<div
											className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
											role="alert"
											style={{
												display:
													chainId != 5 &&
													chainId == 1337
														? "inline-flex"
														: "none",
											}}
										>
											<svg
												aria-hidden="true"
												focusable="false"
												data-prefix="fas"
												data-icon="exclamation-triangle"
												className="w-4 h-4 mr-2 fill-current"
												role="img"
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 576 512"
											>
												<path
													fill="currentColor"
													d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
												></path>
											</svg>
											You are currently testing Gwin on
											your local blockchain environment.
										</div>
									</div>
								) : (
									<div
										className="bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full"
										role="alert"
									>
										{/* if metamask is not connected */}
										<svg
											aria-hidden="true"
											focusable="false"
											data-prefix="fas"
											data-icon="exclamation-triangle"
											className="w-4 h-4 mr-2 fill-current"
											role="img"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 576 512"
										>
											<path
												fill="currentColor"
												d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
											></path>
										</svg>
										No Metamask detected. Please connect to
										Goerli Testnet.
									</div>
								)}
								{/* stake dashboard */}
								<Stake />
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	)
}
