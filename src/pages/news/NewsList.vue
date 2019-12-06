<template>
    <div>
        <iui-header :title="newslistTitle"></iui-header>
        <ul class="iui-news-list">
            <li v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id">
                    <img class="item-img" :src="item.img_url">
                    <div class="item-body">
                        <h4>{{ item.title }}</h4>
                        <p class='item-ellipsis'>
                            <span>发表时间：{{ item.add_time | dateFormat('YYYY-MM-DD HH:mm') }}</span>
                            <span>浏览：{{ item.click }}</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import {MixinMethods} from '@/components/common/mixin.js'
import IuiHeader from "@/components/common/IuiHeader"

export default{
    data(){
        return {
            newslistTitle:"新闻资讯",
            newslist:[]
        }
    },
    mixins:[MixinMethods],
    methods:{
        getNewsList(){
            this.$http.get('api/getnewslist').then(result=>{
                if (result.data.status===0) {
                    this.newslist=result.data.message
                }else{
                    this.showToastMask('获取失败')
                }
            }).catch()
        }
    },
    components:{
        IuiHeader
    },
    created(){
        this.getNewsList()
    }
}
</script>

<style lang="scss" scoped>
.iui-news-list{
    background-color: #f0f3f6;
    min-height: calc(100vh - 5.8rem);
    padding: 3.9rem .8rem 4rem;
    li{
        background-color: #fff;
        margin-bottom: 1rem;
        border-radius: .4rem;
        overflow: hidden;
        box-shadow: 0 0 0.8rem 0.2rem #ebedf0;
        a{
            display: flex;
            .item-img{
                width: 10rem;
                height: 6rem;
            }
            .item-body{
                width: 12rem;
                padding: .7rem;
                h4{
                    font-size: 1rem;
                    color: #222;
                    line-height: 1.2;
                    height: 2.4rem;
                    overflow: hidden;
                    margin-bottom: .5rem;
                }
                .item-ellipsis{
                    font-size: .5rem;
                    color: #adb6bf;
                    span{
                        display: block;
                        &:nth-child(1){
                            margin-bottom: .1rem;
                        }
                    }
                }
            }
        }
    }
}
</style>