import { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Image from "next/image"
import penguinChestPic from "/public/penguinChest.png"

export default function About(props) {
	return (
		<>
			<Nav />
			<main className="bg-gradient-to-br from-slate-100 to-sky-400 min-h-screen">
				<div className="max-w-7xl mx-auto pt-2 pb-3 sm:px-6 lg:px-8 text-gray-100">
					<div className="grid grid-cols-1 gap-4">
						<div className="bg-none p-4">
							<div className="grid grid-cols-1 text-gray-900 pb-4">
								<div className="bg-sky-50 m-3 shadow-lg px-6 py-8 rounded-lg text-gray-700">
									<div className="flex justify-center w-full pb-3">
										<Image
											className="w-max h-max rounded-full "
											width="200px"
											height="200px"
											src={penguinChestPic}
											alt="gwin"
										/>
									</div>
									<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
										<div className="lg:text-center">
											{/* <h2 className="text-lg text-indigo-600 font-semibold">
												Gwin Finance
											</h2> */}
											<p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
												About Using Gwin
											</p>
											<p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
												With Gwin Finance, it's simple
												to create stable value and
												manage your risk on the Ethereum
												Blockchain.
											</p>
										</div>
										<div className="mt-10">
											<dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
												<div className="relative">
													<dt>
														<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-[#95e4d7] text-white">
															<svg
																className="h-6 w-6"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																aria-hidden="true"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M13 10V3L4 14h7v7l9-11h-7z"
																/>
															</svg>
														</div>
														<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
															Absurdly Simple,
															Incredibly Powerful
														</p>
													</dt>
													<dd className="mt-2 ml-16 text-base text-gray-500">
														Gwin is a simple
														alternative to other
														complex options.{" "}
														<br></br>- No order
														book,
														<br></br>- No specific
														counter party <br></br>-
														And no contract length{" "}
														<br></br>
														<br></br>Get in, get
														out, and Gwin!
													</dd>
												</div>

												<div className="relative">
													<dt>
														<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-[#95e4d7] text-white">
															<svg
																className="h-6 w-6"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																aria-hidden="true"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
																/>
															</svg>
														</div>
														<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
															Designed to
															Self-Sustain
														</p>
													</dt>
													<dd className="mt-2 ml-16 text-base text-gray-500">
														Gwin targets return
														rates rather than
														cementing them. This
														allows the protocol to
														adjust expected returns
														more favorably for
														underweight pools to
														incentivize users to
														serve the overweight
														pool interest, and it
														further encourages users
														to achieve the necessary
														balance via withdrawals
														from the profiting
														pools. Or help balance
														pools via risk
														arbitrage!
													</dd>
												</div>

												<div className="relative">
													<dt>
														<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-[#95e4d7] text-white">
															<svg
																className="h-6 w-6"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																aria-hidden="true"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
																/>
															</svg>
														</div>
														<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
															Decentralized
															Finance at its Best
														</p>
													</dt>
													<dd className="mt-2 ml-16 text-base text-gray-500">
														Gwin is the secure DeFi
														that we all need.
														<br></br>
														<br></br>- Funds are
														settled in an automated,
														unbiased manner.
														<br></br>- Pools can be
														operated with any amount
														of funds.
														<br></br>- Pools are
														balanced by natural
														incentives.
														<br></br>- Bribed LPs
														not needed, only users
														seeking legit value.
														<br></br>- No need for
														funds to be locked up.
														<br></br>- Free flowing
														funds actually serve to
														balance the pools.
														<br></br>- Stable,
														on-chain funds create
														endless possibilities
														for true DeFi.
													</dd>
												</div>

												<div className="relative">
													<dt>
														<div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-[#95e4d7] text-white">
															<svg
																className="h-6 w-6"
																xmlns="http://www.w3.org/2000/svg"
																fill="none"
																viewBox="0 0 24 24"
																stroke-width="2"
																stroke="currentColor"
																aria-hidden="true"
															>
																<path
																	stroke-linecap="round"
																	stroke-linejoin="round"
																	d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
																/>
															</svg>
														</div>
														<p className="ml-16 text-lg leading-6 font-medium text-gray-900">
															Stable, On-Chain
															Value
														</p>
													</dt>
													<dd className="mt-2 ml-16 text-base text-gray-500">
														The cooled pools serve
														the heated pools. They
														are designed to be as
														stable in value as the
														Blockchain can
														reasonably allow,
														essentially selling off
														all profit potential in
														exchange for price
														stability. So by
														depositing to a cooled
														pool on Gwin, you get
														stable, on-chain value,
														and the future fees
														generated from heated
														users will be deposited
														directly into the shared
														cooled pool. Voila!
														Stable, yield-generating
														value that actually
														serves a true utility.
													</dd>
												</div>
											</dl>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	)
}
