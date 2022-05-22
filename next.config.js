/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com', 'cdn.shopify.com', 's7d2.scene7.com'],
	},
};

module.exports = nextConfig;
