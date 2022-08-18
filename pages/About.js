import { useState, useEffect } from "react"
import Nav from "../components/Nav"
import Image from "next/image"

export default function About(props) {
	return (
		<>
			<Nav />
			<main className="bg-gradient-to-br from-slate-100 to-sky-400 min-h-screen">
				<div className="max-w-7xl mx-auto pt-2 pb-3 sm:px-6 lg:px-8 text-gray-100">
					<div class="grid grid-cols-1 gap-4">
						<div className="bg-none p-4">
							<div className="grid grid-cols-1 text-gray-900 pb-4">
								<div className="bg-sky-50 m-3 shadow-lg px-6 py-8 rounded-lg text-gray-700">
									<div className="flex justify-center w-full pb-3">
										<Image
											className="w-max h-max rounded-full "
											width="200px"
											height="200px"
											src="/../public/penguinChest.png"
											alt="gwin"
										/>
									</div>
									<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
										<div class="lg:text-center">
											{/* <h2 class="text-lg text-indigo-600 font-semibold">
												Gwin Finance
											</h2> */}
											<p class="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl sm:tracking-tight">
												How to Use Gwin
											</p>
											<p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
												With Gwin Finance, it's so
												simple to stake your WETH and
												DAI to earn GWIN.
											</p>
										</div>
										<div class="mt-10">
											<dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
												<div class="relative">
													<dt>
														<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-sky-300 text-white">
															<svg
																class="h-6 w-6"
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
														<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
															Use Gwin to Stake &
															Earn
														</p>
													</dt>
													<dd class="mt-2 ml-16 text-base text-gray-500">
														Lorem ipsum, dolor sit
														amet consectetur
														adipisicing elit.
														Maiores impedit
														perferendis suscipit
														eaque, iste dolor
														cupiditate blanditiis
														ratione.
													</dd>
												</div>

												<div class="relative">
													<dt>
														<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-sky-300 text-white">
															<svg
																class="h-6 w-6"
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
														<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
															Gwin Runs on the
															Testnet
														</p>
													</dt>
													<dd class="mt-2 ml-16 text-base text-gray-500">
														Lorem ipsum, dolor sit
														amet consectetur
														adipisicing elit.
														Maiores impedit
														perferendis suscipit
														eaque, iste dolor
														cupiditate blanditiis
														ratione.
													</dd>
												</div>

												<div class="relative">
													<dt>
														<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-sky-300 text-white">
															<svg
																class="h-6 w-6"
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
														<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
															Reliable and
															Decentralized
														</p>
													</dt>
													<dd class="mt-2 ml-16 text-base text-gray-500">
														Lorem ipsum, dolor sit
														amet consectetur
														adipisicing elit.
														Maiores impedit
														perferendis suscipit
														eaque, iste dolor
														cupiditate blanditiis
														ratione.
													</dd>
												</div>

												<div class="relative">
													<dt>
														<div class="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-tl from-[#9e92ff] to-sky-300 text-white">
															<svg
																class="h-6 w-6"
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
														<p class="ml-16 text-lg leading-6 font-medium text-gray-900">
															Mobile notifications
														</p>
													</dt>
													<dd class="mt-2 ml-16 text-base text-gray-500">
														Lorem ipsum, dolor sit
														amet consectetur
														adipisicing elit.
														Maiores impedit
														perferendis suscipit
														eaque, iste dolor
														cupiditate blanditiis
														ratione.
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
