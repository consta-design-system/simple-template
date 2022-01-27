const {resolve} = require('path');
const webpack = require('webpack');

const WebpackAssetsManifest = require('webpack-assets-manifest');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {SubresourceIntegrityPlugin} = require('webpack-subresource-integrity');
const open = require('open');
const mocker = require('mocker-api');

const api = require('./__mocks__/api');

const {container} = webpack;

const config = {
    devServer: {
        // Сборочная директория
        contentBase: resolve(__dirname, 'dist'),

        // Горячая перезагрузка
        hot: true,

        // Хост
        host: 'localhost',

        // Порт
        port: 3001,

        // Разршешить динамические пути в URL
        historyApiFallback: true,

        // Создавать сборочную директорию
        writeToDisk: true,

        // Заголовки бандлов
        headers: api._proxy.header,

        // Мокер запросов
        before(app) {
            mocker(app, api);
        },

        // Открыть новую или использовать уже существующую вкладку
        // Стандратная опция так делать не умеет
        after: async () => {
            const {host, port} = config.devServer;

            await open(`http://${host}:${port}`);
        }
    },

    // Тип сборки
    target: 'web',

    // Режим сборки
    mode: 'none',

    // Входная точка
    entry: resolve(__dirname, 'src', 'index'),

    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },

    output: {
        // Имя файла со сборкой
        filename: '[name].[contenthash].js',

        // Путь куда складывать артефакты сборки
        path: resolve(__dirname, 'dist'),

        // Хост, который будет добавлен к имени файла
        // ВНИМАНИЕ: Не меняйте значение, иначе получите ошибку ChunkLoadError у загружаемого модуля и
        // неправильный путь к основной сборке
        publicPath: '/',

        // chunkFilename: " [name]/[id].[chunkhash].chunk.js"
        crossOriginLoading: 'anonymous', // use-credentials
    },

    experiments: {
        topLevelAwait: true
    },

/*
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
*/

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    plugins: [
        new SubresourceIntegrityPlugin({
            hashFuncNames: ['sha512']
        }),

        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'src', 'index.html')
        }),

        // Создание assets-manifest.json
        new WebpackAssetsManifest({
            // Хост, который будет добавлен к имени бандла
            publicPath: '/',

            // Имя результирующего файла с артефактами сборки
            output: 'assets-manifest.json',

            // Используется браузерами для проверки целостности файлов на случай их подмены
            integrity: true,

            // Алгоритм хеширования
            integrityHashes: ['sha512']
        }),

        // Показывает прогресс сборки
        new webpack.ProgressPlugin(),

        // Очищает сборочную директорию без перезапуска сервера.
        // Стандартная опция clean так делать не умеет.
        new CleanWebpackPlugin({
            verbose: true
        })
    ]
};

module.exports = config;
