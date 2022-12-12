const withOptimizedImages = require("next-optimized-images")

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
module.exports = withOptimizedImages({
	// your other Next.js configuration options
	nextConfig,
})
