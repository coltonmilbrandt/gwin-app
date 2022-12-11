/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
}

module.exports = nextConfig
