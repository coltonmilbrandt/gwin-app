import Image from 'next/image'

export default function Balances(props) {
    const name = props.name
    const wallet = props.wallet
    const staked = props.staked
    const price = props.price
    const tokenPic = props.tokenPic
    return (
        <div className="grid grid-cols-3 bg-sky-50 m-3 shadow-md p-4 rounded-sm text-gray-600">
            <div className="flex flex-col items-center justify-center pr-4">
                <Image src={tokenPic} class="bg-white rounded-full" width='50px' height='50px' alt={name} />
            </div>
            <div className="col-span-2">
                <div><b>Wallet:</b> {wallet}</div>
                <div><b>Staked:</b> {staked}</div>
                <div><b>Price:</b> {price}</div>
            </div>
        </div>
    )
}