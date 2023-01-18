import Head from "next/head"
import Image from "next/image"
import curveImg from "/public/curve-simple.png"

// this is the landing page of the app

export default function Landing() {
	return (
		<div className="bg-gradient-to-bl from-sky-50 to-white min-h-screen">
			<Head>
				<title>Trading Site</title>
			</Head>
			<div
				className="bg-cover bg-center h-72 w-full"
				style={{
					backgroundImage: `url(/penguin-banner.jpg)`,
				}}
			></div>
			<h1 class="text-5xl md:text-6xl xl:text-7xl text-center mt-24 font-bold tracking-tight">
				<span className="inline-block leading-8 font-semibold tracking-tight text-indigo-600 sm:tracking-tight">
					<span className="text-gray-900">Gwin</span> Create and Trade{" "}
					<svg
						className="w-20 h-20 inline-block fill-indigo-600"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 640 512"
					>
						<path d="M0 241.1C0 161 65 96 145.1 96c38.5 0 75.4 15.3 102.6 42.5L320 210.7l72.2-72.2C419.5 111.3 456.4 96 494.9 96C575 96 640 161 640 241.1v29.7C640 351 575 416 494.9 416c-38.5 0-75.4-15.3-102.6-42.5L320 301.3l-72.2 72.2C220.5 400.7 183.6 416 145.1 416C65 416 0 351 0 270.9V241.1zM274.7 256l-72.2-72.2c-15.2-15.2-35.9-23.8-57.4-23.8C100.3 160 64 196.3 64 241.1v29.7c0 44.8 36.3 81.1 81.1 81.1c21.5 0 42.2-8.5 57.4-23.8L274.7 256zm90.5 0l72.2 72.2c15.2 15.2 35.9 23.8 57.4 23.8c44.8 0 81.1-36.3 81.1-81.1V241.1c0-44.8-36.3-81.1-81.1-81.1c-21.5 0-42.2 8.5-57.4 23.8L365.3 256z" />
					</svg>{" "}
					Markets
					{/* <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --> */}
				</span>
			</h1>
			<h3 class="text-gray-600 text-2xl md:text-3xl xl:text-4xl text-center mt-2 font-base tracking-tight">
				Anything from stabilized BTC Hashrate to 10x APE
			</h3>
			<section className="py-14 px-24 mt-14">
				<div className="row grid-cols-2 grid">
					<div>
						<div class="rounded-lg shadow-lg block bg-white">
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
					<div className="py-16 pl-20 text-gray-600">
						<h3 class="text-sky-500 font-bold text-xl md:text-2xl xl:text-3xl mt-2 font-base tracking-tight">
							Markets made simple
						</h3>
						<h3 class="text-gray-600 text-base md:text-lg xl:text-lg font-bold tracking-tight">
							Market making and trading in one curve
						</h3>
						<ul className="list-disc list-outside pl-4 pt-2 text-lg space-y-3">
							<li>
								Trade an endless variety of markets and leverage
							</li>
							<li>Deposit to trade, withdraw at any time</li>
							<li>
								Arbitrage by depositing to underweight pools
							</li>
							<li>Make markets with USD-stabilized position</li>
						</ul>
					</div>
				</div>
			</section>
			<section>
				<h1 class="text-center text-3xl font-semibold capitalize text-gray-800 lg:text-4xl">
					Features
				</h1>

				<div class="mx-auto mt-6 flex justify-center">
					<span class="inline-block h-1 w-40 rounded-full bg-sky-500"></span>
					<span class="mx-1 inline-block h-1 w-3 rounded-full bg-sky-500"></span>
					<span class="inline-block h-1 w-1 rounded-full bg-sky-500"></span>
				</div>

				<div class="mx-auto mt-16 flex max-w-4xl items-start">
					<div class="flex flex-wrap text-sky-600">
						<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div class="flex">
								<div class="shrink-0">
									<div class="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											class="w-5 h-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 512 512"
										>
											<path
												fill="currentColor"
												d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
											></path>
										</svg>
									</div>
								</div>
								<div class="grow ml-4">
									<p class="font-bold mb-1">
										Auto Settling Pools
									</p>
									<p class="text-gray-500">
										When you trade, the underlying pools
										automatically settle as optimally as
										possible, even with low-liquidity.
									</p>
								</div>
							</div>
						</div>

						<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div class="flex">
								<div class="shrink-0">
									<div class="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											class="w-5 h-5 text-white"
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
								<div class="grow ml-4">
									<p class="font-bold mb-1">
										Easy to Launch Markets
									</p>
									<p class="text-gray-500">
										Use 100+ price feeds to launch and trade
										any market you can imagine, i.e. stable
										gold, shorted BTC hash, or 10x APE.
									</p>
								</div>
							</div>
						</div>

						<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div class="flex">
								<div class="shrink-0">
									<div class="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											class="w-5 h-5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 640 512"
										>
											<path
												fill="currentColor"
												d="M624 352h-16V243.9c0-12.7-5.1-24.9-14.1-33.9L494 110.1c-9-9-21.2-14.1-33.9-14.1H416V48c0-26.5-21.5-48-48-48H112C85.5 0 64 21.5 64 48v48H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h272c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H40c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h208c4.4 0 8 3.6 8 8v16c0 4.4-3.6 8-8 8H64v128c0 53 43 96 96 96s96-43 96-96h128c0 53 43 96 96 96s96-43 96-96h48c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zM160 464c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm320 0c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-208H416V144h44.1l99.9 99.9V256z"
											></path>
										</svg>
									</div>
								</div>
								<div class="grow ml-4">
									<p class="font-bold mb-1">Risk Arbitrage</p>
									<p class="text-gray-500">
										Market makers are attracted by natural
										risk arbitrage incentives. Deposits to
										underweight pools have better risk
										profiles.
									</p>
								</div>
							</div>
						</div>

						<div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 mb-12 px-3">
							<div class="flex">
								<div class="shrink-0">
									<div class="p-4 bg-indigo-600 rounded-md shadow-lg">
										<svg
											class="w-5 h-5 text-white"
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
								<div class="grow ml-4">
									<p class="font-bold mb-1">
										Blockchain Native Resilience
									</p>
									<p class="text-gray-500">
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

				{/* <div class="mt-8 flex flex-col items-center justify-center">
							<img
								class="h-14 w-14 rounded-full object-cover"
								src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
								alt=""
							/>

							<div class="mt-4 text-center">
								<h1 class="font-semibold text-gray-800 dark:text-white">
									Mia Brown
								</h1>
								<span class="text-sm text-gray-500 dark:text-gray-400">
									Marketer
								</span>
							</div>
						</div> */}
			</section>
			<section class="mb-32 text-gray-800 text-center p-16">
				<h2 class="text-3xl font-bold mb-20">Why is it so great?</h2>

				<div class="grid lg:gap-x-12 lg:grid-cols-3">
					<div class="mb-12 lg:mb-0">
						<div class="rounded-lg shadow-lg h-full block bg-white">
							<div class="flex justify-center">
								<div class="p-4 bg-indigo-600 rounded-full shadow-lg inline-block -mt-8">
									<svg
										class="w-8 h-8 text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M192 208c0-17.67-14.33-32-32-32h-16c-35.35 0-64 28.65-64 64v48c0 35.35 28.65 64 64 64h16c17.67 0 32-14.33 32-32V208zm176 144c35.35 0 64-28.65 64-64v-48c0-35.35-28.65-64-64-64h-16c-17.67 0-32 14.33-32 32v112c0 17.67 14.33 32 32 32h16zM256 0C113.18 0 4.58 118.83 0 256v16c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-16c0-114.69 93.31-208 208-208s208 93.31 208 208h-.12c.08 2.43.12 165.72.12 165.72 0 23.35-18.93 42.28-42.28 42.28H320c0-26.51-21.49-48-48-48h-32c-26.51 0-48 21.49-48 48s21.49 48 48 48h181.72c49.86 0 90.28-40.42 90.28-90.28V256C507.42 118.83 398.82 0 256 0z"
										></path>
									</svg>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-semibold mb-4">
									Support 24/7
								</h5>
								<p>
									Laudantium totam quas cumque pariatur at
									doloremque hic quos quia eius. Reiciendis
									optio minus mollitia rerum labore facilis
									inventore voluptatem ad, quae quia sint.
									Ullam.
								</p>
							</div>
						</div>
					</div>

					<div class="mb-12 lg:mb-0">
						<div class="rounded-lg shadow-lg h-full block bg-white">
							<div class="flex justify-center">
								<div class="p-4 bg-indigo-600 rounded-full shadow-lg inline-block -mt-8">
									<svg
										class="w-8 h-8 text-white"
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
							<div class="p-6">
								<h5 class="text-lg font-semibold mb-4">
									Safe and solid
								</h5>
								<p>
									Eum nostrum fugit numquam, voluptates veniam
									neque quibusdam ullam aspernatur odio
									soluta, quisquam dolore animi mollitia a
									omnis praesentium, expedita nobis!
								</p>
							</div>
						</div>
					</div>

					<div class="">
						<div class="rounded-lg shadow-lg h-full block bg-white">
							<div class="flex justify-center">
								<div class="p-4 bg-indigo-600 rounded-full shadow-lg inline-block -mt-8">
									<svg
										class="w-8 h-8 text-white"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 512 512"
									>
										<path
											fill="currentColor"
											d="M505.12019,19.09375c-1.18945-5.53125-6.65819-11-12.207-12.1875C460.716,0,435.507,0,410.40747,0,307.17523,0,245.26909,55.20312,199.05238,128H94.83772c-16.34763.01562-35.55658,11.875-42.88664,26.48438L2.51562,253.29688A28.4,28.4,0,0,0,0,264a24.00867,24.00867,0,0,0,24.00582,24H127.81618l-22.47457,22.46875c-11.36521,11.36133-12.99607,32.25781,0,45.25L156.24582,406.625c11.15623,11.1875,32.15619,13.15625,45.27726,0l22.47457-22.46875V488a24.00867,24.00867,0,0,0,24.00581,24,28.55934,28.55934,0,0,0,10.707-2.51562l98.72834-49.39063c14.62888-7.29687,26.50776-26.5,26.50776-42.85937V312.79688c72.59753-46.3125,128.03493-108.40626,128.03493-211.09376C512.07526,76.5,512.07526,51.29688,505.12019,19.09375ZM384.04033,168A40,40,0,1,1,424.05,128,40.02322,40.02322,0,0,1,384.04033,168Z"
										/>
									</svg>
								</div>
							</div>
							<div class="p-6">
								<h5 class="text-lg font-semibold mb-4">
									Extremely fast
								</h5>
								<p>
									Enim cupiditate, minus nulla dolor cumque
									iure eveniet facere ullam beatae hic
									voluptatibus dolores exercitationem? Facilis
									debitis aspernatur amet nisi?
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
