import Vue from "vue"
import Router from "vue-router"

import Home from "@/components/tabbar/Home"
import Cart from "@/components/tabbar/Cart"
import Mine from "@/components/tabbar/Mine"

import NewsList from "@/pages/news/NewsList"
import NewsInfo from "@/pages/news/NewsInfo"
import GoodsList from "@/pages/goods/GoodsList"
import GoodsInfo from "@/pages/goods/GoodsInfo"


Vue.use(Router)

Router.prototype.goBack=function(){
    this.isBack=false
}

const router = new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            redirect:'/home'
        },
        {
            path:'/home',
            name:'home',
            component:Home
        },
        {
            path:'/cart',
            name:'cart',
            component:Cart
        },
        {
            path:'/mine',
            name:'mine',
            component:Mine
        },
        {
            path:'/home/newslist',
            name:'newslist',
            component:NewsList
        },
        {
            path:'/home/newsinfo/:id',
            name:'newsinfo',
            component:NewsInfo
        },
        {
            path:'/home/goodslist',
            name:'goodslist',
            component:GoodsList
        },
        {
            path:'/home/goodsinfo/:id',
            name:'goodsinfo',
            component:GoodsInfo
        }
    ],
    linkActiveClass:'cube-tab_active'
})



export default router