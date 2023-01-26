import Image from "next/image"

const TradeExample = (props) => {
	const imageSrc = props.imageSrc
	const text = props.text

	return (
		// inside grid-cols-6
		<>
			<div className="flex justify-center h-7">
				<Image
					src={imageSrc}
					className="rounded-full"
					height="28px"
					width="28px"
				/>
			</div>
			<div className="col-span-5 align-middle pt-0.5">{text}</div>
		</>
	)
}

export default TradeExample
