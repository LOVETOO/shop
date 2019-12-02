<template>
    <div class="goodsinfo-container">

        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <div class="iui-card slider">
            <div class="iui-card-content">
                <div class="iui-card-content-inner">
                    <iui-slide-full :items="lunbotu"></iui-slide-full>
                </div>
            </div>
        </div>

        <div class="iui-card buy">
            <div class="iui-card-header">{{ goodsinfo.title }}</div>
            <div class="iui-card-content">
                <div class="iui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <!-- <p>购买数量：<iui-mun-box @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></iui-mun-box></p> -->
                    <p class="buybtn">
                        <cube-button :inline=true>立即购买</cube-button>
                        <cube-button :inline=true @click="addToShopCar">加入购物车</cube-button>
                    </p>
                </div>
            </div>
        </div>

        <div class="iui-card info">
            <div class="iui-card-header">商品参数</div>
            <div class="iui-card-content">
                <div class="iui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="iui-card-footer">
                <cube-button @click="goDesc(id)">图文介绍</cube-button>
                <cube-button @click="goComment(id)">商品评论</cube-button>
            </div>
        </div>

    </div>
</template>

<script>
import IuiSlideFull from '@/components/common/IuiSlideFull.vue'
// import IuiMunBox from '@/components/common/IuiMunBox.vue'

export default{
    data(){
        return {
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballFlag:false,
            selectedCount:1
        }
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if (result.data.status===0) {
                    result.data.message.forEach(item=>{
                        item.img=item.src
                    })
                    this.lunbotu=result.data.message
                }else{
                    this.$root.showToast('获取失败')
                }
            })
        },
        getGoodsInfo(){
            // 可能这个异步还没完成就渲染好子组件了，使用传给子组件的max会undefined
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if (result.data.status===0) {
                    this.goodsinfo=result.data.message[0]
                }
            })
        },
        goDesc(id){
            this.$router.push({name:'goodsdesc',params:{id}})
        },
        goComment(id){
            this.$router.push({name:'goodscomment',params:{id}})
        },
        addToShopCar(){
            this.ballFlag=!this.ballFlag
            // 拼接store
            var goodsinfo={
                id:this.id,
                count:this.selectedCount,
                price:this.goodsinfo.sell_price,
                selected:true
            }
            this.$store.commit("addToCar",goodsinfo)
        },
        beforeEnter(el){
            el.style.transform="translate(0,0)"
        },
        enter(el,done){
            el.offsetWidth

            const ballPosition=this.$refs.ball.getBoundingClientRect()
            const badgePosition=document.getElementById("badge").getBoundingClientRect()
            const xDist=badgePosition.left-ballPosition.left
            const yDist=badgePosition.top-ballPosition.top

            el.style.transform=`translate(${xDist}px, ${yDist}px)`
            el.style.transition="all .5s cubic-bezier(.4,-0.3,1,.68)"
            done()
        },
        afterEnter(){
            this.ballFlag=!this.ballFlag
        },
        getSelectedCount(count){
            this.selectedCount=count
            this.$root.showToast('父组件拿到的数量是'+this.selectedCount)
        }
    },
    components:{
        IuiSlideFull,
        // IuiMunBox
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
    }
}
</script>

<style lang="scss" scoped>
.iui-buy-info-style{
    padding: 1rem;
    margin: 0 .8rem .8rem;
}

.goodsinfo-container{
    padding: 0 0 2rem;
    min-height: calc(100vh - 5.8rem);
    background-color: #f0f3f6;
    .iui-card {
        background-color: #fff;
        &.slider{
            margin-bottom: .8rem;
        }
        &.buy{
            @extend .iui-buy-info-style;
            .iui-card-header {
                font-size: 1.2rem;
                font-weight: bold;
                line-height: 1.2;
            }
            .iui-card-content{
                .iui-card-content-inner{
                    .price{
                        padding: .8rem 0;
                        color: #858a90;
                        del{
                            padding-right: 1rem;
                        }
                    }
                    .buybtn{
                        .cube-btn{
                            &:nth-child(1){
                                margin-right: .5rem;
                            }
                        }
                    }
                }
            }
        }
        &.info{
            @extend .iui-buy-info-style;
            .iui-card-header {
                font-size: 1.2rem;
                padding-bottom: .7rem;
            }
            .iui-card-content {
                line-height: 1.5;
                color: #858a90;
                font-size: .9rem;
            }
        }
    }
    .now_price{
        color:#E91E63;
        font-weight:bold;
    }
    .iui-card-footer{
        display:block;
        button{
            margin: .8rem 0;
        }
    }
    .ball{
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #e91e63;
        position: absolute;
        z-index: 99999;
        top: 30rem;
        left: 10rem;
    }
}
</style>