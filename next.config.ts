import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['images.unsplash.com'],
	},
};

module.exports = nextConfig;
