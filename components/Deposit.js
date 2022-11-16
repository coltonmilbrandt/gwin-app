import Image from "next/image"
import Price from "../components/Price"

const Deposit = ({
	isOpen,
	onClose,
	tokenPic,
	name,
	hEth,
	cEth,
	userBal,
	contract,
	poolId,
	priceFeed,
}) => {
	if (isOpen == false) return null
	return (
		<>
			<div
				class="modal backdrop-blur-sm fixed bg-black bg-opacity-10 top-0 z-10 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
				id="exampleModalCenter"
				tabindex="-2"
				aria-labelledby="exampleModalCenterTitle"
				aria-modal="true"
				aria-hidden="true"
				role="dialog"
			>
				<div class="modal-dialog modal-dialog-centered relative max-w-lg pointer-events-none">
					<div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-lg outline-none text-current">
						<div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
							<h5
								class="text-xl grid grid-cols-6 font-medium leading-normal text-gray-800"
								id="exampleModalScrollableLabel"
							>
								<div class="m-auto">
									<Image
										src={tokenPic}
										class="bg-white rounded-full"
										width="50px"
										height="50px"
										alt="/"
									/>
								</div>
								<div class="col-span-5 pl-3 align-middle m-auto justify-center">
									Deposit to {name}
								</div>
							</h5>
							<button
								type="button"
								class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
								onClick={() => onClose()}
							></button>
						</div>
						<div class="modal-body relative p-4">
							{contract}
							<form>
								<div class="form-group mb-6">
									<label
										for="exampleInputEmail1"
										class="form-label inline-block mb-2 text-gray-700"
									>
										Deposit Amount
									</label>
									<input
										type="number"
										class="form-control
												block
												w-full
												px-3
												py-1.5
												text-base
												font-normal
												text-gray-700
												bg-white bg-clip-padding
												border border-solid border-gray-300
												rounded
												transition
												ease-in-out
												m-0
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInputEmail1"
										aria-describedby="emailHelp"
										placeholder="Deposit Amount (ether)"
									/>
									{/* <small
										id="emailHelp"
										class="block mt-1 text-xs text-gray-600"
									>
										We'll never share your email with anyone
										else.
									</small> */}
								</div>
								<div class="relative pt-1">
									<label
										for="customRange3"
										class="form-label"
									>
										Example range
									</label>
									<input
										type="range"
										class="
											form-range
											appearance-none
											w-full
											h-6
											p-0
											bg-transparent
											focus:outline-none focus:ring-0 focus:shadow-none
											"
										min="0"
										max="5"
										step="0.5"
										id="customRange3"
									/>
								</div>
								<div class="form-group mb-6">
									<label
										for="exampleInputPassword1"
										class="form-label inline-block mb-2 text-gray-700"
									>
										Password
									</label>
									<input
										type="password"
										class="form-control block
												w-full
												px-3
												py-1.5
												text-base
												font-normal
												text-gray-700
												bg-white bg-clip-padding
												border border-solid border-gray-300
												rounded
												transition
												ease-in-out
												m-0
												focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										id="exampleInputPassword1"
										placeholder="Password"
									/>
								</div>
								<button
									type="submit"
									class="
											px-6
											py-2.5
											bg-blue-600
											text-white
											font-medium
											text-xs
											leading-tight
											uppercase
											rounded
											shadow-md
											hover:bg-blue-700 hover:shadow-lg
											focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
											active:bg-blue-800 active:shadow-lg
											transition
											duration-150
											ease-in-out"
								>
									Submit
								</button>
							</form>
						</div>
						<div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
							<button
								type="button"
								class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
								data-bs-dismiss="modal"
								onClick={() => onClose()}
							>
								Close
							</button>
							<button
								type="button"
								class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
							>
								Deposit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Deposit
