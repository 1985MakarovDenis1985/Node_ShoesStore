// npm install postcss-loader autoprefixer css-mqpacker cssnano --save-dev


module.exports = {
    plugins: [
        require('autoprefixer'),         //// автопрефиксер
        require('css-mqpacker'),         //// сжимает медиазапросы
        require('cssnano')({             //// минификатор
            preset: [
                'default', {
                    discardComments: {    //// удаляет коментарии
                        removeAll: true,
                    }
                }
            ]
        })
    ]
}


//// npm install --save-dev mini-css-extract-plugin
//// npm i --save-dev css-loader style-loader
//// npm i sass-loader node-sass --save-dev
//// npm i postcss-loader autoprefixer css-mqpacker cssnano --save-dev


