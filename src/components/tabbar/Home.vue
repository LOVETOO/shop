<template>
  <div>
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
    
  </div>
</template>

<script>
import IuiSlide from "@/components/common/IuiSlide"
import IuiHeader from "@/components/common/IuiHeader"
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
                    url:'#',
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
        IuiHeader
    }
}
</script>

<style lang="scss">
.iui-home-slide{
    padding: 4rem 0 .5rem;
}

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
</style>