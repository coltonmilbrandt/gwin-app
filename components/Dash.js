import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { ConnectButton } from "web3uikit"
import Image from 'next/image'
import { useMoralis } from "react-moralis"
import Stake from '../components/Stake'


export default function Dash() {
    const { isWeb3Enabled } = useMoralis()
    return (
        <div className="bg-gradient-to-br from-slate-100 to-sky-400 min-h-screen">
            <header>
                <div className="max-w-7xl mx-auto pt-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-[#565264]">Gwin Finance</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto pt-2 pb-3 sm:px-6 lg:px-8 text-gray-100">
                    <div class="grid grid-cols-1 gap-4">
                        <div className="bg-none p-4">
                            {isWeb3Enabled ? (
                                <>
                                
                                </>
                            ) : (
                                <div>No Metamask detected...</div>
                            )}
                            <Stake />
                        </div>
                    </div>
                </div>
            </main>
        </div>
   )
}