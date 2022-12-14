import Image from "next/image"
import ethPic from "/public/eth.png"
import hEthTwoPic from "/public/hEth2.png"
import hEthFivePic from "/public/hEth5.png"
import hEthTenPic from "/public/hEth10.png"
import cEthPic from "/public/cooledEth.png"
import goldPic from "/public/gold.png"
import btcPic from "/public/Bitcoin.png"
import yenPic from "/public/yen.png"
import dollarPic from "/public/dollar.png"
import defaultPic from "/public/default.png"

// This component returns the featured symbol and target images

// dictionary of symbol images mapped to tickers
const symbolImages = {
	ETH: ethPic,
	BTC: btcPic,
	XAU: goldPic,
	JPY: yenPic,
	USD: dollarPic,
}

// threshold representing a mildly leveraged long
const threshold1 = 0
// threshold representing a very leveraged long
const threshold2 = 2999999999999
// threshold representing an extremely leveraged long
const threshold3 = 5999999999999

const determineTarget = (symbol, target, leverage) => {
	// selects the target symbol based on the featured asset (symbol) and leverage
	if (target === undefined) {
		// return default value as fallback
		return defaultPic
	} else {
		if (target in symbolImages) {
			return symbolImages[target]
		}
	}
}

const selectSymbol = (symbol, target, leverage) => {
	// selects the main symbol based on the featured asset (symbol) and leverage
	if (leverage >= 0) {
		// if leverage is positive i.e. heated
		if (symbol == "ETH") {
			// special leveraged ETH symbols
			if (leverage > threshold3) {
				return hEthTenPic
			} else if (leverage > threshold2) {
				return hEthFivePic
			} else if (leverage > threshold1) {
				return hEthTwoPic
			} else {
				// return default ETH value as fallback
				return defaultPic
			}
		} else {
			// if heated but not ETH
			if (symbol === undefined) {
				// return default value as fallback
				return defaultPic
			} else {
				// heated, defined, and not ETH
				if (symbol !== undefined && symbol in symbolImages) {
					return symbolImages[symbol]
				}
			}
		}
	} else {
		// if leverage is negative, i.e. cooled
		if (symbol === undefined) {
			// return default value as fallback
			return defaultPic
		} else {
			if (symbol in symbolImages) {
				return symbolImages[symbol]
			}
		}
	}
}

const symbolImage = ({ symbol, target, leverage, width, height }) => {
	// returns a featured image in a set width/height with a smaller image showing its pair
	return (
		<div
			className="relative"
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}
		>
			<Image
				// featured Image
				className="bg-white rounded-full"
				src={selectSymbol(symbol, target, leverage)}
				width={width}
				height={height}
				alt="/symbol"
			/>
			<div className="absolute flex content-center bottom-0 right-0 w-1/3 h-1/3 bg-orange-300 rounded-full">
				<Image
					// paired Image
					className="bg-white rounded-full"
					src={determineTarget(symbol, target, leverage)}
					width={width}
					height={height}
					alt="/symbol"
				/>
			</div>
		</div>
	)
}

export default symbolImage
