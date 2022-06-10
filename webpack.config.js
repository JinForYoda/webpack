const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default
const styledComponentsTransformer = createStyledComponentsTransformer()
const ESLintPlugin = require('eslint-webpack-plugin')
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath')
const evalSourceMapMiddleware = require('react-dev-utils/evalSourceMapMiddleware')
const redirectServedPath = require('react-dev-utils/redirectServedPathMiddleware')
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware')
const publicUrlOrPath = getPublicUrlOrPath(
	process.env.NODE_ENV === 'development',
	require(path.resolve(__dirname, 'package.json')).homepage,
	process.env.PUBLIC_URL
)
module.exports = {
	entry: path.resolve(__dirname, 'src', 'index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.bundle.js',
		publicPath: publicUrlOrPath,
	},
	mode: process.env.NODE_ENV || 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [
			new TsconfigPathsPlugin({
				baseUrl: path.join(__dirname, 'src'),
			}),
		],
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'public'),
			publicPath: [publicUrlOrPath],
		},
		compress: true,
		port: 5051,
		devMiddleware: {
			publicPath: publicUrlOrPath.slice(0, -1),
		},
		onBeforeSetupMiddleware(devServer) {
			devServer.app.use(evalSourceMapMiddleware(devServer))
		},
		onAfterSetupMiddleware(devServer) {
			devServer.app.use(redirectServedPath(publicUrlOrPath))
			devServer.app.use(noopServiceWorkerMiddleware(publicUrlOrPath))
		},
		historyApiFallback: {
			disableDotRule: true,
			index: publicUrlOrPath,
			rewrites: [{ from: /\/webpack\/[^?]/, to: '/404.html' }],
		},
		client: {
			logging: 'none',
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader'],
			},
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({
						before: [styledComponentsTransformer],
					}),
				},
			},
			{
				test: /\.(css|scss)$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
				use: ['file-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
		new ESLintPlugin(),
	],
}
