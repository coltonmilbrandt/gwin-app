import { ConnectButton } from "web3uikit"
import Image from "next/image"
import gwinPic from "/public/gwin-rect.webp"

export default function Header() {
	return (
		<nav className="p-5 border-b2 flex flex-row">
			<Image src={gwinPic} width="100px" height="100px" alt="/" />
			<h1 className="py-4 px-4 font-bold text-3xl">Gwin DeFi</h1>
			<div className="flex justify-between items-center w-full h-full px2 2xl:px-16"></div>
			<div className="ml-auto py-2 px-4">
				<ConnectButton moralisAuth={false} />
			</div>
		</nav>
	)
}
