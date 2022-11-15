import Image from "next/image"
import Price from "../components/Price"

const Deposit = ({ isOpen, onClose }) => {
	if (isOpen == false) return null
	return (
		<>
			<div
				class="modal backdrop-blur-sm fixed top-0 z-10 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto"
				id="exampleModalCenter"
				tabindex="-2"
				aria-labelledby="exampleModalCenterTitle"
				aria-modal="true"
				aria-hidden="true"
				role="dialog"
			>
				<div class="modal-dialog modal-dialagoe relative max-w-xl pointer-events-none">
					<div class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
						<div class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
							<h5
								class="text-xl font-medium leading-normal text-gray-800"
								id="exampleModalScrollableLabel"
							>
								Modal title
							</h5>
							<button
								type="button"
								class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div class="modal-body relative p-4">
							<p>This is a vertically centered modal.</p>
						</div>
						<div class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
							<button
								type="button"
								class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
								data-bs-dismiss="modal"
								onClick={() => onClose()}
							>
								Close
							</button>
							<button
								type="button"
								class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
							>
								Save changes
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Deposit
