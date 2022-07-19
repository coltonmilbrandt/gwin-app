 import { ConnectButton } from "web3uikit"

 export default function Header() {
    return (
        <nav className="p-5 border-b2 flex flex-row">
            <h1 className="py-4 px-4 font-bold text-3xl">Gwin DeFi</h1>
            <div className="ml-auto py-2 px-4">
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
 }