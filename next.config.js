/** @type {import('next').NextConfig} */

const withOptimizedImages = require("next-optimized-images")

module.exports = withOptimizedImages({
	// your other Next.js configuration options
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
})
