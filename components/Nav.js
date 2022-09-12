/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react"
import { Disclosure, Menu, Transition } from "@headlessui/react"
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import { ConnectButton } from "web3uikit"
import Image from "next/image"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import propTypes from "prop-types"

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
	imageUrl:
		"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
}
const navigation = [
	{ name: "Dashboard", href: "/dash", current: true },
	{ name: "About", href: "/About", current: false },
	{ name: "Get Tokens", href: "/About", current: false },
]
const userNavigation = [
	{ name: "Your Profile", href: "#" },
	{ name: "Settings", href: "#" },
	{ name: "Sign out", href: "#" },
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
        <html class="h-full bg-gray-100">
        <body class="h-full">
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
												src="/../public/gwin-rect.webp"
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

							<Disclosure.Panel className="md:hidden">
								<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
									{navigation.map((item) => (
										<Disclosure.Button
											key={item.name}
											as="a"
											href={item.href}
											className={classNames(
												item.current
													? "bg-gray-900 text-white"
													: "text-gray-300 hover:bg-gray-700 hover:text-white",
												"block px-3 py-2 rounded-md text-base font-medium"
											)}
											aria-current={
												item.current
													? "page"
													: undefined
											}
										>
											{item.name}
										</Disclosure.Button>
									))}
								</div>
								<div className="pt-4 pb-3 border-t border-gray-700">
									<div className="flex items-center px-5">
										<div className="flex-shrink-0">
											<img
												className="h-10 w-10 rounded-full"
												src={user.imageUrl}
												alt=""
											/>
										</div>
										<div className="ml-3">
											<div className="text-base font-medium leading-none text-white">
												{user.name}
											</div>
											<div className="text-sm font-medium leading-none text-gray-400">
												{user.email}
											</div>
										</div>
										<button
											type="button"
											className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
										>
											<span className="sr-only">
												View notifications
											</span>
											<BellIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>
									<div className="mt-3 px-2 space-y-1">
										{userNavigation.map((item) => (
											<Disclosure.Button
												key={item.name}
												as="a"
												href={item.href}
												className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
											>
												{item.name}
											</Disclosure.Button>
										))}
									</div>
								</div>
							</Disclosure.Panel>
						</>
					)}
				</Disclosure>
			</div>
		</>
	)
}
