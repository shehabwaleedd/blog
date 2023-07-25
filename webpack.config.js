const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;
...
plugins: [
    new CriticalPlugin({
        src: 'index.html',
        inline: true,
        minify: true,
        dest: 'index.html'
    })
]

... 