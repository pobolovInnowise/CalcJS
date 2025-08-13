// webpack.config.js
const path = require('path');

module.exports = {
    // Устанавливаем режим разработки для удобства (в продакшене используйте 'production')
    mode: 'production',

    // Точка входа: ваш главный JavaScript-файл
    entry: './client/client.js',

    // Место, куда Webpack будет сохранять собранные файлы
    output: {
        // Имя выходного файла (например, bundle.js)
        filename: 'bundle.js',
        // Путь к выходной папке (например, в папку 'dist')
        path: path.resolve(__dirname, 'dist'),
        // PublicPath, если вы используете пути к ресурсам в HTML/CSS
        publicPath: '/dist/',
    },

    // Настройки для разрешения модулей, если у вас есть относительные импорты
    resolve: {
        extensions: ['.js'], // Разрешать .js файлы
        // Если у вас есть псевдонимы для путей, добавьте их здесь
        alias: {
            '@receiver': path.resolve(__dirname, 'receiver/'),
            '@invoker': path.resolve(__dirname, 'invoker/'),
            '@commands': path.resolve(__dirname, 'commands/'),
        },
    },

    // Правила для обработки различных типов файлов
    module: {
        rules: [
            {
                test: /\.js$/, // Применяем это правило к файлам .js
                exclude: /node_modules/, // Исключаем папку node_modules
                use: {
                    loader: 'babel-loader', // Если вы используете Babel для транспиляции ES6+
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // Здесь можно добавить правила для CSS, изображений и других ресурсов
        ],
    },
};