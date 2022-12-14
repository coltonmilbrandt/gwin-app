/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import { ConnectButton } from "web3uikit"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
// Use HashRouter instead to
import propTypes from "prop-types"
import gwinPic from "/public/gwin-rect.webp"

let navLinks = [
	{ name: "Dashboard", path: "/", current: true },
	{
		name: "About",
		path: "/About",
		current: false,
	},
	{
		name: "Get Tokens",
		path: "/Tokens",
		current: false,
	},
]

const user = {
	name: "Tom Cook",
	email: "tom@example.com",
}
const navigation = [
	{ name: "Dashboard", href: "/", current: true },
	{ name: "About", href: "/About", current: false },
	{ name: "Get Tokens", href: "/Tokens", current: false },
]

function setCurrent() {
	console.log("ranCurrent")
}

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

export default function Example() {
	return (
		<>
			{/*
        This example requires updating your template:

        ```
        <html className="h-full bg-gray-100">
        <body className="h-full">
        ```
      */}
			<div className="min-h-full">
				<Disclosure
					as="nav"
					className="bg-gradient-to-tr from-slate-100 to-sky-400"
				>
					{({ open }) => (
						<>
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								<div className="flex items-center justify-between h-16">
									<div className="flex items-center">
										<div className="flex flex-shrink-0 justify-center items-center">
											<Image
												className="h-8 w-8 rounded-full"
												width="45%"
												height="45%"
												src={gwinPic}
												alt="gwin"
											/>
										</div>
										<div className="hidden md:block">
											<div className="ml-10 flex items-baseline space-x-4">
												{navLinks.map((item) => (
													<a
														key={item.name}
														href={item.path}
														className={classNames(
															// item.current
															// 	? "bg-[#565264] text-white"
															// 	:
															"text-gray-900 hover:bg-[#9e92ff] hover:text-white",
															"px-3 py-2 rounded-md text-sm font-medium"
														)}
														aria-current={
															item.current
																? "page"
																: undefined
														}
														disabled={item.current}
													>
														{item.name}
													</a>
												))}
											</div>
										</div>
									</div>
									{/* Used to have hidden as part of this className */}
									<div className="md:block">
										<div className="ml-4 flex items-center md:ml-6">
											<ConnectButton
												moralisAuth={false}
											/>
										</div>
									</div>
									<div className="-mr-2 flex md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="bg-[#7d71d1] inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
											<span className="sr-only">
												Open main menu
											</span>
											{open ? (
												<XIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<MenuIcon
													className="block h-6 w-6 text-white"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>

							<Disclosure.Panel className="md:hidden bg-white bg-opacity-80 rounded-b-lg">
								<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												"block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-200 hover:text-indigo-800"
											)}
											aria-current={
												item.current
													? "page"
													: undefined
											}
											onClick={async () => {
												item.current = true
											}}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</>
	)
}
