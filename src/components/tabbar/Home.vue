<template>
  <div class="home-container">
    <iui-header :title="headerTitle"></iui-header>
    <div class="iui-home-slide">
        <iui-slide :items="SlideItems"></iui-slide>
    </div>
    <div class="iui-home-slides">
        <cube-slide ref="slide" :data="slides" :loop=false :autoPlay=false>
          <cube-slide-item v-for="(item, index) in slides" :key="index">
            <ul>
                <router-link :to="slidesItems.url" v-for="(slidesItems,slidesIndexs) in item.slidesItems" :key="slidesIndexs">
                  <img :src="slidesItems.image">
                  <span>{{ slidesItems.dec }}</span>
                </router-link>
            </ul>
          </cube-slide-item>
        </cube-slide>
    </div>

    <div class="recommend-box">
        <h2 class="recommend-title">好物推荐</h2>
        <div class="recommend-list">
            <iui-goods-list :goodslist="goodslist"></iui-goods-list>
        </div>
    </div>
    
  </div>
</template>

<script>
import IuiSlide from "@/components/common/IuiSlide"
import IuiHeader from "@/components/common/IuiHeader"
import IuiGoodsList from "@/components/common/IuiGoodsList"
import slider1 from '@/images/slider1.png'
import slider2 from '@/images/slider2.png'
import slider3 from '@/images/slider3.png'

import icon1 from '@/images/icon1.png'
import icon2 from '@/images/icon2.png'
import icon3 from '@/images/icon3.png'
import icon4 from '@/images/icon4.png'
import icon5 from '@/images/icon5.png'

export default{
    data(){
        return{
            goodslist:[],
            headerTitle:"LOVETOO",
            SlideItems:[
            {
                url:'/',
                image:slider1
            },{
                url:'/',
                image:slider2
            },{
                url:'/',
                image:slider3
            }],
            slides:[
            {
                slidesItems:[
                {
                    url:'/home/newslist',
                    image:icon1,
                    dec:'新闻资讯'
                },{
                    url:'/home/goodslist',
                    image:icon2,
                    dec:'商品购买'
                },{
                    url:'/login',
                    image:icon3,
                    dec:'物流查询'
                },{
                    url:'#',
                    image:icon4,
                    dec:'超市'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                }]
            },{
                slidesItems:[
                {
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                },{
                    url:'#',
                    image:icon5,
                    dec:'其他'
                }]
            }]
        }
    },
    components:{
        IuiSlide,
        IuiHeader,
        IuiGoodsList
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex=1').then(result=>{
                if (result.data.status===0) {
                    this.goodslist=this.goodslist.concat(result.data.message).splice(2,4)
                    if (result.data.message.length<=0) {
                        this.$root.showToast('没有更多商品')
                        this.hasgoods=false
                    }
                }else{
                    this.$root.showToast('获取失败')
                }
            })
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="scss">
.iui-home-slide{
    padding: 4rem 0 .5rem;
}

.home-container{
    .iui-home-slides{
        height: 11rem;
        .cube-slide{
            border-radius: 0.6rem;
            .cube-slide-group{
                .cube-slide-item{
                    ul{
                        display: flex;
                        flex-wrap: wrap;
                        a{
                            width: 20%;
                            text-align: center;
                            img{
                                height: auto;
                                width: 2.7rem;
                                margin-top: .8rem;
                            }
                            span{
                                display: block;
                                font-size: .8rem;
                                color: #000;
                                margin-top: .3rem;
                            }
                        }
                    }
                }
            }
            .cube-slide-dots{
                span{
                    margin: 0 0.1rem;
                    width: .3rem;
                    height: .3rem;
                    background-color: #ccc;
                    border-radius: 5rem;
                    &.active{
                        width: 1rem;
                        background-color: #e86b69;
                    }
                }
            }
        }
    }
    .recommend-box{
        padding-top: 1.5rem;
        .recommend-title{
            background-color: #f0f3f6;
            padding: 1.5rem .8rem .8rem;
            font-size: 1.3rem;
            text-align: center;
            letter-spacing: .1rem;
            font-weight: bold;
            position: relative;
            z-index: 2;
            &:after{
                content: '';
                position: absolute;
                left: calc(50% - 2rem);
                top: 1.9rem;
                width: 5rem;
                height: 1.3rem;
                background: linear-gradient(-90deg, #f53149, #e91e63);
                border-radius: .5rem;
                z-index: -1;
                opacity: .8;
            }
        }
    }
}
</style>