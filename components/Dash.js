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
        <div>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900">Gwin Finance</h1>
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 bg-white text-gray-100">
                    <div class="grid grid-cols-1 gap-4">
                        <div className="bg-none p-4 rounded-md">
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