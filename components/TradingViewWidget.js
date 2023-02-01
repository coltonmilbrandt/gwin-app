// TradingViewWidget.js

import React, { useEffect, useState, useRef } from "react"
import { cryptoCurrencies } from "../helpers/cryptoDict"

let tvScriptLoadingPromise

export default function TradingViewWidget(selectedPair) {
	const onLoadScriptRef = useRef()
	const [internalPair, setInternalPair] = useState(null)

	useEffect(() => {
		if (
			typeof internalPair != undefined ||
			internalPair.pair != selectedPair.pair
		) {
			console.log("compare")
			console.log(internalPair)
			console.log(selectedPair)
			setInternalPair(selectedPair)
		}
	}, [selectedPair])

	useEffect(() => {
		onLoadScriptRef.current = createWidget

		if (!tvScriptLoadingPromise) {
			tvScriptLoadingPromise = new Promise((resolve) => {
				const script = document.createElement("script")
				script.id = "tradingview-widget-loading-script"
				script.src = "https://s3.tradingview.com/tv.js"
				script.type = "text/javascript"
				script.onload = resolve

				document.head.appendChild(script)
			})
		}

		tvScriptLoadingPromise.then(
			() => onLoadScriptRef.current && onLoadScriptRef.current()
		)

		return () => (onLoadScriptRef.current = null)

		function createWidget() {
			if (
				document.getElementById("tradingview_f75ba") &&
				"TradingView" in window
			) {
				let pair = selectedPair.pair
				console.log(pair)
				if (pair in cryptoCurrencies) {
					pair = cryptoCurrencies[pair]
				}
				console.log(pair)
				new window.TradingView.widget({
					autosize: true,
					width: "100%",
					height: "100%",
					symbol: pair,
					interval: "D",
					timezone: "Etc/UTC",
					theme: "light",
					style: "1",
					locale: "en",
					toolbar_bg: "#f1f3f6",
					enable_publishing: false,
					hide_side_toolbar: false,
					allow_symbol_change: true,
					save_image: false,
					studies: ["MASimple@tv-basicstudies"],
					show_popup_button: true,
					popup_width: "1000",
					popup_height: "650",
					container_id: "tradingview_f75ba",
				})
			}
		}
	}, [internalPair])

	return (
		<div className="tradingview-widget-container">
			<div id="tradingview_f75ba" />
			<div className="tradingview-widget-copyright">
				<a
					href="https://www.tradingview.com/symbols/BTCUSD/?exchange=COINBASE"
					rel="noopener"
					target="_blank"
				>
					<span className="blue-text">{selectedPair.pair} chart</span>
				</a>{" "}
				by TradingView
			</div>
		</div>
	)
}
