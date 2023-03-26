/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	experimental: {
		appDir: true,
	},
	env: {
		DATA_API_KEY: process.env.DATA_API_KEY,
		CURRENCY_URL: process.env.CURRENCY_URL
	},
	reactStrictMode: true,
  	swcMinify: true,
	async headers() {
		return [
			{
			source: '/(.*)',
			headers: [
				{
				key: 'X-Frame-Options',
				value: 'DENY',
				},
				{
				key: 'Content-Security-Policy',
				value:
					"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://api.apilayer.com/;",
				},
				{
				key: 'X-Content-Type-Options',
				value: 'nosniff',
				},
			],
			},
		];
	}, 
}

module.exports = nextConfig
