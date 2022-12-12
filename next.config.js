// next.config.js
const otherConfigSettings = {
	reactStrictMode: true,
	// swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
	trailingSlash: true,
	exportPathMap: function () {
		return {
			"/": { page: "/" },
		}
	},
	images: {
		unoptimized: true,
	},
}

module.exports = otherConfigSettings
