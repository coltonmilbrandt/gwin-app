import Head from "next/head"
import Image from "next/image"
import curveImg from "/public/curve-simple.png"
import tokensImg from "/public/tokens.jpg"
import bitcoinImg from "/public/Bitcoin.png"
import maticImg from "/public/matic-token.jpeg"
import adaImg from "/public/ada-token.jpeg"
import goldImg from "/public/gold.png"
import oilImg from "/public/oil-token.jpeg"
import teslaImg from "/public/tesla-token.jpeg"
import appleImg from "/public/apple-token.jpeg"
import ethImg from "/public/eth.png"
import dollarImg from "/public/dollar.png"
import aboutTwoImg from "/public/about-shape-2.svg"
import aboutOneImg from "/public/about-shape-1.svg"
import TradeExample from "../components/landing/TradeExample"

// this is the landing page of the app

export default function Landing() {
	return (
		<div className="bg-gradient-to-bl from-sky-50 to-white min-h-screen pb-32">
			<Head>
				<title>Trading Site</title>
			</Head>
			<div
				className="bg-cover bg-center h-72 w-full"
				style={{
					backgroundImage: `url(/penguin-banner.jpg)`,
				}}
			></div>
			<div className="p-4 lg:p-0">
				<h1 className="text-4xl lg:text-5xl xl:text-7xl text-center mt-8 lg:mt-24 font-bold tracking-tight">
					<span className="inline-block leading-8 font-semibold tracking-tight text-indigo-600 sm:tracking-tight">
						<span className="text-gray-900">Gwin</span> Create and
						Trade{" "}
						<svg
							className="w-12 h-12 lg:w-20 lg:h-20 inline-block fill-indigo-600"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 640 512"
						>
							<path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" />
						</svg>{" "}
						Markets
						{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
					</span>
				</h1>
				<h3 className="text-gray-500 text-2xl md:text-3xl xl:text-4xl text-center mt-2 lg:mt-0 font-base tracking-tight">
					Anything from stabilized BTC Hashrate to 10x APE
				</h3>
				<div className="w-full flex text-center mt-6">
					<a href="/Dash" className="m-auto">
						<div class="flex space-x-2 justify-center">
							<div>
								<button
									type="button"
									class="inline-block px-6 pt-2.5 pb-2 bg-indigo-500 text-white font-medium text-sm leading-normal rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex align-center"
								>
									<svg
										aria-hidden="true"
										focusable="false"
										data-prefix="fas"
										data-icon="download"
										class="w-5 h-5 mr-2 fill-white"
										role="img"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z" />
									</svg>
									Launch App
								</button>
							</div>
						</div>
					</a>
				</div>
			</div>
			<section className="py-4 lg:py-8 px-8 lg:px-24 mt-14 relative">
				<div class="about-shape-2">
					<Image src={aboutTwoImg} width="1000px" height="1000px" />
				</div>
				<div className="row grid-cols-2 grid max-w-7xl m-auto">
					<div className="col-span-2 max-w-lg lg:max-w-xl lg:col-span-1 m-auto">
						<div className="rounded-lg shadow-lg block bg-white">
							<Image
								src={curveImg}
								className="rounded-lg"
								height="378px"
								width="630px"
							/>
						</div>
						<p className="text-center text-gray-400 text-sm mt-2">
							Efficient markets +/- 25% of price, then market
							making incentives kick in to rebalance.
						</p>
					</div>
					<div className="col-span-2 max-w-lg lg:max-w-3xl lg:col-span-1 m-auto py-16 lg:pl-20 text-gray-600">
						<h3 className="text-indigo-500 text-2xl md:text-3xl xl:text-3xl mt-2 font-base tracking-tight">
							So Many Ways to Gwin
						</h3>
						<h3 className="mt-2 text-gray-600 text-base md:text-lg xl:text-lg font-bold tracking-tight">
							Market making and trading in one curve
						</h3>
						<ul className="list-disc mt-2.5 list-outside pl-4 pt-2 text-lg space-y-3 font-light">
							<li>
								<b className="text-sky-600 font-bold">Trade</b>
								&nbsp;an endless variety of markets and leverage
							</li>
							<li>
								<b className="text-sky-600 font-bold">
									Deposit
								</b>
								&nbsp;to trade, withdraw at any time
							</li>
							<li>
								<b className="text-sky-600 font-bold">
									Arbitrage
								</b>
								&nbsp;by depositing to underweight pools
							</li>
							<li>
								<b className="text-sky-600 font-bold">
									Make markets
								</b>
								&nbsp;with USD-stabilized position
							</li>
						</ul>
					</div>
				</div>
			</section>
			<section className="px-8 lg:px-24 mt-16 relative">
				<div class="about-shape-1">
					<Image src={aboutOneImg} width="1000px" height="1000px" />
				</div>
				<div className="grid grid-cols-2 max-w-7xl m-auto">
					<div className="col-span-2 max-w-lg lg:max-w-3xl lg:col-span-1 order-2 lg:order-1 m-auto py-16 pr-8 text-gray-600">
						<h3 className="text-indigo-500 text-2xl md:text-3xl xl:text-3xl mt-2 font-base tracking-tight">
							Choose Your Market
						</h3>
						<h3 className="mt-2 text-gray-600 text-base md:text-lg xl:text-lg font-bold tracking-tight">
							100+ reliable price feeds available on mainnet
							including:
						</h3>
						<ul className="list-disc mt-2.5 font-light list-outside pl-4 pt-2 text-lg space-y-3">
							<li>
								<b className="text-sky-600 font-bold">Crypto</b>
								&nbsp; Bitcoin, Polygon, Cardano
							</li>
							<li>
								<b className="text-sky-600 font-bold">
									Commodities
								</b>
								&nbsp; Gold, Oil, and Silver
							</li>
							<li>
								<b className="text-sky-600 font-bold">
									Equities
								</b>
								&nbsp; Tesla, Apple, and Google
							</li>
							<li>
								<b className="text-sky-600 font-bold">Data</b>
								&nbsp; CPI, Hashrate, Gas Price
							</li>
						</ul>
					</div>
					<div className="col-span-2 order-1 lg:order-2 w-lg max-w-lg lg:max-w-xl lg:col-span-1 m-auto">
						<div className="m-auto pt-1.5 rounded-lg shadow-lg block bg-white w-full">
							<Image
								src={tokensImg}
								className="rounded-lg w-full h-auto"
								height="768px"
								width="1024px"
							/>
						</div>
					</div>
				</div>
			</section>
			<section className="mt-16 text-gray-800 text-center p-8 lg:p-16">
				<h2 className="text-2xl md:text-3xl text-indigo-600 mb-20">
					Choose Your Trade
				</h2>

				<div className="grid gap-x-6 lg:gap-x-12 grid-cols-1 spa md:grid-cols-2 lg:grid-cols-3 max-w-7xl m-auto">
					<div className="mb-12 lg:mb-0">
						<div className="rounded-lg shadow-lg h-full block bg-white">
							<div className="flex justify-center">
								<div className="p-4 bg-orange-300 rounded-full shadow-lg inline-block -mt-8">
									<svg
										className="w-8 h-8 pl-1.5 text-orange-100 fill-orange-100"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path d="M153.6 29.9l16-21.3C173.6 3.2 180 0 186.7 0C198.4 0 208 9.6 208 21.3V43.5c0 13.1 5.4 25.7 14.9 34.7L307.6 159C356.4 205.6 384 270.2 384 337.7C384 434 306 512 209.7 512H192C86 512 0 426 0 320v-3.8c0-48.8 19.4-95.6 53.9-130.1l3.5-3.5c4.2-4.2 10-6.6 16-6.6C85.9 176 96 186.1 96 198.6V288c0 35.3 28.7 64 64 64s64-28.7 64-64v-3.9c0-18-7.2-35.3-19.9-48l-38.6-38.6c-24-24-37.5-56.7-37.5-90.7c0-27.7 9-54.8 25.6-76.9z" />
									</svg>
								</div>
							</div>
							<div className="p-6">
								<h5 className="text-xl font-semibold mb-4">
									Heat it up
								</h5>
								<p>Go long with up to 10x leverage.</p>
							</div>
							<div className="grid grid-cols-6 text-left px-6 pb-6 space-y-3">
								<div className="col-span-6 pb-1 font-bold text-orange-400 text-center">
									Examples:
								</div>
								<TradeExample
									imageSrc={ethImg}
									text="10x Long ETH"
								/>
								<TradeExample
									imageSrc={goldImg}
									text="2x Long Gold"
								/>
								<TradeExample
									imageSrc={maticImg}
									text="5x Long MATIC"
								/>
								<TradeExample
									imageSrc={bitcoinImg}
									text="3x Long Bitcoin"
								/>
								<TradeExample
									imageSrc={adaImg}
									text="1.5x Long Cardano"
								/>
							</div>
						</div>
					</div>

					<div className="mb-12 lg:mb-0">
						<div className="rounded-lg shadow-lg h-full block bg-white">
							<div className="flex justify-center">
								<div className="p-4 bg-sky-300 rounded-full shadow-lg inline-block -mt-8">
									<svg
										className="w-8 h-8 text-white fill-sky-100"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 448 512"
									>
										<path d="M224 0c17.7 0 32 14.3 32 32V62.1l15-15c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-49 49v70.3l61.4-35.8 17.7-66.1c3.4-12.8 16.6-20.4 29.4-17s20.4 16.6 17 29.4l-5.2 19.3 23.6-13.8c15.3-8.9 34.9-3.7 43.8 11.5s3.7 34.9-11.5 43.8l-25.3 14.8 21.7 5.8c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17l-67.7-18.1L287.5 256l60.9 35.5 67.7-18.1c12.8-3.4 26 4.2 29.4 17s-4.2 26-17 29.4l-21.7 5.8 25.3 14.8c15.3 8.9 20.4 28.5 11.5 43.8s-28.5 20.4-43.8 11.5l-23.6-13.8 5.2 19.3c3.4 12.8-4.2 26-17 29.4s-26-4.2-29.4-17l-17.7-66.1L256 311.7v70.3l49 49c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-15-15V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V449.9l-15 15c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l49-49V311.7l-61.4 35.8-17.7 66.1c-3.4 12.8-16.6 20.4-29.4 17s-20.4-16.6-17-29.4l5.2-19.3L48.1 395.6c-15.3 8.9-34.9 3.7-43.8-11.5s-3.7-34.9 11.5-43.8l25.3-14.8-21.7-5.8c-12.8-3.4-20.4-16.6-17-29.4s16.6-20.4 29.4-17l67.7 18.1L160.5 256 99.6 220.5 31.9 238.6c-12.8 3.4-26-4.2-29.4-17s4.2-26 17-29.4l21.7-5.8L15.9 171.6C.6 162.7-4.5 143.1 4.4 127.9s28.5-20.4 43.8-11.5l23.6 13.8-5.2-19.3c-3.4-12.8 4.2-26 17-29.4s26 4.2 29.4 17l17.7 66.1L192 200.3V129.9L143 81c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l15 15V32c0-17.7 14.3-32 32-32z" />
									</svg>
								</div>
							</div>
							<div className="p-6">
								<h5 className="text-xl font-semibold mb-4">
									Cool it down
								</h5>
								<p>Reduce pair exposure up to 100%.</p>
							</div>
							<div className="grid grid-cols-6 text-left px-6 pb-6 space-y-3">
								<div className="col-span-6 pb-1 font-bold text-sky-500 text-center">
									Examples:
								</div>
								<TradeExample
									imageSrc={dollarImg}
									text="Emulated US Dollar"
								/>
								<TradeExample
									imageSrc={appleImg}
									text="Emulated Apple Stock"
								/>
								<TradeExample
									imageSrc={oilImg}
									text="Emulated Barrel of Oil"
								/>
								<TradeExample
									imageSrc={bitcoinImg}
									text="Stable Bitcoin Hashrate"
								/>
								<TradeExample
									imageSrc={ethImg}
									text="Reduce ETH exposure 50%"
								/>
							</div>
						</div>
					</div>

					<div className="">
						<div className="rounded-lg shadow-lg h-full block bg-white">
							<div className="flex justify-center">
								<div className="p-4 bg-red-300 rounded-full shadow-lg inline-block -mt-8">
									<svg
										className="w-8 h-8 text-red-100 fill-red-100"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 576 512"
									>
										<path d="M384 352c-17.7 0-32 14.3-32 32s14.3 32 32 32H544c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v82.7L342.6 137.4c-12.5-12.5-32.8-12.5-45.3 0L192 242.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0L320 205.3 466.7 352H384z" />
									</svg>
								</div>
							</div>
							<div className="p-6">
								<h5 className="text-xl font-semibold mb-4">
									Short it
								</h5>
								<p>Bet on a move to the downside.</p>
							</div>
							<div className="grid grid-cols-6 text-left px-6 pb-6 space-y-3">
								<div className="col-span-6 pb-1 font-bold text-red-400 text-center">
									Examples:
								</div>
								<TradeExample
									imageSrc={teslaImg}
									text="5x Short Tesla Stock"
								/>
								<TradeExample
									imageSrc={ethImg}
									text="Short Ethereum Gas Price"
								/>
								<TradeExample
									imageSrc={bitcoinImg}
									text="10x Short Bitcoin Hashrate"
								/>
								<TradeExample
									imageSrc={goldImg}
									text="3x Short Gold"
								/>
								<TradeExample
									imageSrc={dollarImg}
									text="2x Short Consumer Price Index"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="mt-16 relative">
				<div class="about-shape-2">
					<Image src={aboutTwoImg} width="1000px" height="1000px" />
				</div>
				<h1 className="text-center text-3xl font-semibold capitalize text-gray-800 lg:text-4xl">
					Features
				</h1>

				<div className="mx-auto mt-6 flex justify-center">
					<span className="inline-block h-1 w-40 rounded-full bg-sky-500"></span>
					<span className="mx-1 inline-block h-1 w-3 rounded-full bg-sky-500"></span>
					<span className="inline-block h-1 w-1 rounded-full bg-sky-500"></span>
				</div>

				<div className="mx-auto mt-16 flex max-w-4xl items-start">
					<div className="flex flex-wrap text-sky-600">
						<div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div className="flex">
								<div className="shrink-0">
									<div className="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											className="w-5 h-5 text-white fill-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 640 512"
										>
											<path d="M384 32H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H398.4c-5.2 25.8-22.9 47.1-46.4 57.3V448H512c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 128c-17.7 0-32-14.3-32-32s14.3-32 32-32H288V153.3c-23.5-10.3-41.2-31.6-46.4-57.3H128c-17.7 0-32-14.3-32-32s14.3-32 32-32H256c14.6-19.4 37.8-32 64-32s49.4 12.6 64 32zM125.8 177.3L51.1 320H204.9L130.2 177.3c-.4-.8-1.3-1.3-2.2-1.3s-1.7 .5-2.2 1.3zM128 128c18.8 0 36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C210.9 402.6 178.2 416 128 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L83.3 155c8.7-16.6 25.9-27 44.7-27zm384 48c-.9 0-1.7 .5-2.2 1.3L435.1 320H588.9L514.2 177.3c-.4-.8-1.3-1.3-2.2-1.3zm-44.7-21c8.7-16.6 25.9-27 44.7-27s36 10.4 44.7 27l77.8 148.5c3.1 5.8 6.1 14 5.5 23.8c-.7 12.1-4.8 35.2-24.8 55.1C594.9 402.6 562.2 416 512 416s-82.9-13.4-103.2-33.5c-20-20-24.2-43-24.8-55.1c-.6-9.8 2.5-18 5.5-23.8L467.3 155z" />
										</svg>
										{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
									</div>
								</div>
								<div className="grow ml-4">
									<p className="font-bold mb-1">
										Auto Settling Pools
									</p>
									<p className="text-gray-500">
										When you trade, the underlying pools
										automatically settle as optimally as
										possible, even with low-liquidity.
									</p>
								</div>
							</div>
						</div>

						<div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div className="flex">
								<div className="shrink-0">
									<div className="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											className="w-5 h-5 text-white fill-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											<path d="M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z" />
										</svg>
										{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
									</div>
								</div>
								<div className="grow ml-4">
									<p className="font-bold mb-1">
										Easy to Launch Markets
									</p>
									<p className="text-gray-500">
										Use 100+ price feeds to launch and trade
										any market you can imagine, i.e. stable
										gold, shorted BTC hash, or 10x APE.
									</p>
								</div>
							</div>
						</div>

						<div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div className="flex">
								<div className="shrink-0">
									<div className="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											className="w-5 h-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 576 512"
										>
											<path
												fill="currentColor"
												d="M271.06,144.3l54.27,14.3a8.59,8.59,0,0,1,6.63,8.1c0,4.6-4.09,8.4-9.12,8.4h-35.6a30,30,0,0,1-11.19-2.2c-5.24-2.2-11.28-1.7-15.3,2l-19,17.5a11.68,11.68,0,0,0-2.25,2.66,11.42,11.42,0,0,0,3.88,15.74,83.77,83.77,0,0,0,34.51,11.5V240c0,8.8,7.83,16,17.37,16h17.37c9.55,0,17.38-7.2,17.38-16V222.4c32.93-3.6,57.84-31,53.5-63-3.15-23-22.46-41.3-46.56-47.7L282.68,97.4a8.59,8.59,0,0,1-6.63-8.1c0-4.6,4.09-8.4,9.12-8.4h35.6A30,30,0,0,1,332,83.1c5.23,2.2,11.28,1.7,15.3-2l19-17.5A11.31,11.31,0,0,0,368.47,61a11.43,11.43,0,0,0-3.84-15.78,83.82,83.82,0,0,0-34.52-11.5V16c0-8.8-7.82-16-17.37-16H295.37C285.82,0,278,7.2,278,16V33.6c-32.89,3.6-57.85,31-53.51,63C227.63,119.6,247,137.9,271.06,144.3ZM565.27,328.1c-11.8-10.7-30.2-10-42.6,0L430.27,402a63.64,63.64,0,0,1-40,14H272a16,16,0,0,1,0-32h78.29c15.9,0,30.71-10.9,33.25-26.6a31.2,31.2,0,0,0,.46-5.46A32,32,0,0,0,352,320H192a117.66,117.66,0,0,0-74.1,26.29L71.4,384H16A16,16,0,0,0,0,400v96a16,16,0,0,0,16,16H372.77a64,64,0,0,0,40-14L564,377a32,32,0,0,0,1.28-48.9Z"
											></path>
										</svg>
									</div>
								</div>
								<div className="grow ml-4">
									<p className="font-bold mb-1">
										Risk Arbitrage
									</p>
									<p className="text-gray-500">
										Market makers are attracted by natural
										risk arbitrage incentives. Deposits to
										underweight pools have better risk
										profiles.
									</p>
								</div>
							</div>
						</div>

						<div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div className="flex">
								<div className="shrink-0">
									<div className="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											className="w-5 h-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											<path
												fill="currentColor"
												d="M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
											></path>
										</svg>
									</div>
								</div>
								<div className="grow ml-4">
									<p className="font-bold mb-1">
										Blockchain Native Resilience
									</p>
									<p className="text-gray-500">
										Gwin is protected from market
										manipulation, and eliminates systematic
										risk through automated settlements and
										sensible engineering.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="mt-8 flex flex-col items-center justify-center">
							<img
								className="h-14 w-14 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
								alt=""
							/>

							<div className="mt-4 text-center">
								<h1 className="font-semibold text-gray-800 dark:text-white">
									Mia Brown
								</h1>
								<span className="text-sm text-gray-500 dark:text-gray-400">
									Marketer
								</span>
							</div>
						</div> */}
			</section>
		</div>
	)
}
