import Vue from "vue"
import Router from "vue-router"
import History from "@/utils/history"

import Home from "@/components/tabbar/Home"
import Cart from "@/components/tabbar/Cart"
import Mine from "@/components/tabbar/Mine"

import Login from "@/pages/login/Login"
import Forget from "@/pages/login/Forget"
import NewsList from "@/pages/news/NewsList"
import NewsInfo from "@/pages/news/NewsInfo"
import GoodsList from "@/pages/goods/GoodsList"
import GoodsInfo from "@/pages/goods/GoodsInfo"
import NotFound from "@/pages/notfound/NotFound"


Vue.use(History)
Vue.use(Router)

// 扩展goBack方法
Router.prototype.transitionName=''
Router.prototype.goBack = function() {
  this.isBack = true
  this.back()
}

const router = new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[{
            path:'*',
            component:NotFound,
            meta:{
                title:'404'
            }
        },{
            path:'/',
            redirect:'/home'
        },{
            path:'/home',
            name:'home',
            component:Home
        },{
            path:'/cart',
            name:'cart',
            component:Cart,
            meta:{
                auto:false
            }
        },{
            path:'/mine',
            name:'mine',
            component:Mine,
            meta:{
                auto:true
            }
        },{
            path:'/login',
            name:'login',
            component:Login
        },{
            path:'/forget',
            name:'forget',
            component:Forget
        },{
            path:'/home/newslist',
            name:'newslist',
            component:NewsList
        },{
            path:'/home/newsinfo/:id',
            name:'newsinfo',
            component:NewsInfo
        },{
            path:'/home/goodslist',
            name:'goodslist',
            component:GoodsList
        },{
            path:'/home/goodsinfo/:id',
            name:'goodsinfo',
            component:GoodsInfo
            // 路由懒加载/异步组件（渲染并缓存）：component: () => import("./views/About.vue")
            // 路由独享守卫：beforeEnter: (to, from, next) => {}
        }
    ],
    linkActiveClass:'cube-tab_active'
})



// 判断登录---全局前置路由
router.beforeEach((to, from, next) => {
    if (to.meta.auto) {
        const token=localStorage.getItem("token")
        if (token) {
            next()
        }else{
            next({
                path:"/login",
                query:{redirect:to.path}
            })
        }
    }else{
        next()
    }
})



// 全局解析守卫---在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
// router.beforeResolve((to, from, next) => {
//     console.log("before resolve invoked")
//     next()
// })



// 进出栈以及动画---全局后置路由
router.afterEach((to, from) => {
    if (router.isBack) {
        History.pop()
        router.isBack=false
        router.transitionName="route-back"
        window.console.log(from)
    }else{
        History.push(to.path)
        router.transitionName="route-forward"
    }
})



export default router