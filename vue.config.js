const { defineConfig } = require('@vue/cli-service');
const path = require('path'); // 根路径
const resolve = (dir) => path.join(__dirname, dir);
// uni-read-pages 读取pages.json文件中的pages作为路由
const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages({
    //  includes 路由需要识别的参数
     includes:['path','name']
})
module.exports = defineConfig({
    transpileDependencies:['@dcloudio/uni-ui'],
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    },
    // configureWebpack: (config) => {
    //     const alias = config.resolve.alias;
    //     alias['@'] = resolve("/");
    //   },
    chainWebpack: (config) => {
		config.resolve.alias
			.set('components', resolve('src/components'))
			.set('@', resolve('src'))
			.set('static', resolve('src/static'))
	},
})