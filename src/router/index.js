import { RouterMount, createRouter } from 'uni-simple-router';
// ROUTES 为vue.config.js 文件DefinePlugin生成路由
const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    encodeURI: false,
    routes: [
        ...ROUTES
        , {
        path: '*',
        // redirect: (to) => {
        //     return { name: '404' } // 匹配非定义的路由地址
        // }
    }]

});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
    router,
    RouterMount
}