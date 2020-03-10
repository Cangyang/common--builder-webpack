
const autoPrefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const glob = require('glob');

// 冒烟测试的脚本在test/smoke/目录下，而entry的__dirname变量为当前文件夹lib，故需要替换变量__dirname
const projectRoot = process.cwd();

const setMPA = () => {
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(projectRoot, './src/*/index.js'));
    Object.keys(entryFiles)
        .map((index) => {
            const entryFile = entryFiles[index];
            const match = entryFile.match(/src\/(.*)\/index\.js/);
            const pageName = match && match[1];
            entry[pageName] = entryFile;
            return htmlWebpackPlugins.push(
                new HtmlWebpackPlugin({
                    template: path.join(projectRoot, `src/${pageName}/index.html`),
                    filename: `${pageName}.html`,
                    chunks: ['commons', 'vendors', pageName],
                    inject: true,
                    minify: {
                        html5: true,
                        collapseWhitespace: false,
                        preserveLineBreaks: true,
                        minifyCSS: true,
                        minifyJS: false,
                        removeComments: false,
                    },
                }),
            );
        });
		return {
			entry,
			htmlWebpackPlugins,
		};
};

const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
    entry,
    output: {
        path: path.join(projectRoot, 'dist'),
        filename: '[name]-[chunkhash:8].js',
        publicPath: './',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                ],
            },
            {
                test: /\.css$/,
                use:
					[
					  'style-loader',
					  'css-loader',
					],
            },
            {
                test: /\.scss$/,
                use:
					[
					  {
					    loader: 'style-loader',
					    options: {
					      insertAt: 'top', // 样式插入到head标签
					      sinleton: true, // 将所有的style标签合并成一个
					    },
					  },
					  'css-loader',
					  'sass-loader',
					],
            },
            {
                test: /\.less$/,
                use:
					[

					  MiniCssExtractPlugin.loader,
					  'css-loader',
					  'less-loader',
					  {
					    loader: 'px2rem-loader',
					    options: {
					      remUnit: 75,
					      remPrecision: 8,
					    },
					  },
					  {
					    loader: 'postcss-loader',
					    options: {
					      plugins: () => [
					        autoPrefixer({
					          browsers: ['last 2 version', '>1%', 'ios 7'],
					        }),
					      ],
					    },
					  },
					],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name]-[hash:8].[ext]',
                    },
                },
            },
            {
                test: /\.(woff|wof2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash:8].[ext]',
                    },
                },

            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash:8].css',
        }),
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
		function errorPlugin() {
			this.hooks.done.tap('done', (stats) => {
				if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
					process.exit(1);
				}
			});
		},
    ].concat(htmlWebpackPlugins),
    stats: 'errors-only',
};
