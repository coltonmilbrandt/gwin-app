// next.config.js
const otherConfigSettings = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	resolve: {
		extensions: ["", ".js", ".jsx"],
	},
	images: {
		loader: "akamai",
		path: "",
	},
}

module.exports = otherConfigSettings
