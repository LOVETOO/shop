import Vue from "vue"
import Router from "vue-router"
import Home from "@/components/tabbar/Home"
import Cart from "@/components/tabbar/Cart"
import Mine from "@/components/tabbar/Mine"

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
        }
    ],
    linkActiveClass:'cube-tab_active'
})



export default router