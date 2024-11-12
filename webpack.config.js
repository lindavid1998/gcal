// webpack.config.js
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	plugins: [new Dotenv()],
};
