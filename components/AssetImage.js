import Image from "next/image"
import ethPic from "/public/eth.png"
import hEthTwoPic from "/public/hEth2.png"
import hEthFivePic from "/public/hEth5.png"
import hEthTenPic from "/public/hEth10.png"
import cEthPic from "/public/cooledEth.png"
import goldPic from "/public/gold.png"
import btcPic from "/public/Bitcoin.png"
import yenPic from "/public/yen.png"
import bearPic from "/public/bear.png"
import heatedFrame from "/public/heatedFrame.png"

const symbolImages = {
	BTC: btcPic,
	XAU: goldPic,
	JPY: yenPic,
}

const threshold1 = 0
const threshold2 = 2999999999999
const threshold3 = 5999999999999

const heatLevel = (leverage) => {
	if (leverage == -1000000000000) {
		return "none"
	} else if (leverage < 0) {
		return "cooled"
	} else if (leverage > 0) {
		return "heated"
	}
}

const selectSymbol = (symbol, leverage) => {
	if (leverage >= 0) {
		if (symbol == "ETH") {
			if (leverage > threshold3) {
				return hEthTenPic
			} else if (leverage > threshold2) {
				return hEthFivePic
			} else if (leverage > threshold1) {
				return hEthTwoPic
			} else {
				return ethPic
			}
		}
		if (symbol in symbolImages) {
			return symbolImages[symbol]
		} else {
			return btcPic
		}
	} else {
		return cEthPic
	}
}

const symbolImage = ({ symbol, target, leverage, width, height }) => {
	return (
		<div
			className="relative"
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
		>
			<Image
				className="bg-white rounded-full"
				src={selectSymbol(symbol, leverage)}
				width={width}
				height={height}
				alt="/symbol"
			/>
			<div className="absolute flex content-center bottom-0 right-0 w-1/3 h-1/3 bg-orange-300 rounded-full">
				<Image
					className="bg-white rounded-full"
					src={selectSymbol(target, leverage)}
					width={width}
					height={height}
					alt="/symbol"
				/>
			</div>
		</div>
	)
}

export default symbolImage
