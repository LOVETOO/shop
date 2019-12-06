<template>
    <div class="goodsinfo-container">
        <iui-header :title="goodsinfoTitle"></iui-header>

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
                    <p>购买数量：<iui-mun-box @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></iui-mun-box></p>
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
        </div>

        <div class="iui-card other">
            <div class="other-nav">
                <span
                :class="{'goodsNavActive' : goodsOtherIndex==index}"
                v-for="(item,index) in goodsNav"
                :key="index"
                @click="goodsNavToggle(index,item.view)">{{ item.type }}</span>
            </div>
            <div class="other-body">
                <div v-show="curView=='dec' ? true : false" class="goods-dec-content" v-html="goodsdec.content"></div>
                <iui-comment :id="id" v-show="curView=='com' ? true : false"></iui-comment>
            </div>
        </div>

    </div>
</template>

<script>
import IuiSlideFull from '@/components/common/IuiSlideFull.vue'
import IuiMunBox from '@/components/common/IuiMunBox.vue'
import IuiComment from '@/components/common/IuiComment.vue'
import IuiHeader from "@/components/common/IuiHeader"

export default{
    data(){
        return {
            goodsinfoTitle:"LOVETOO",
            id:this.$route.params.id,
            lunbotu:[],
            goodsinfo:{},
            ballFlag:false,
            selectedCount:1,
            goodsdec:'',
            goodsOtherIndex:0,
            curView:"dec",
            goodsNav:[
                {type:"商品详情",view:"dec"},
                {type:"商品评论",view:"com"}
            ]
            }
    },
    components:{
        IuiSlideFull,
        IuiMunBox,
        IuiComment,
        IuiHeader
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
            window.console.log('父组件拿到的数量是'+this.selectedCount)
        },
        getGoodsDesc(){
            this.$http.get('api/goods/getdesc/'+this.id).then(result=>{
                if (result.data.status===0) {
                    this.goodsdec=result.data.message[0]
                }
            })
        },
        goodsNavToggle(index,view){
            this.goodsOtherIndex=index
            this.curView=view
        }
    },
    created(){
        this.getLunbotu()
        this.getGoodsInfo()
        this.getGoodsDesc()
    }
}
</script>

<style lang="scss">
.iui-buy-info-style{
    padding: 1rem;
    margin: 0 0 .8rem;
}

.goodsinfo-container{
    padding: 3rem 0 3.5rem;
    min-height: calc(100vh - 3rem);
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
        &.other{
            @extend .iui-buy-info-style;
            .other-nav{
                padding-bottom: 1rem;
                border-bottom: 1px solid #f0f3f6;
                span{
                    font-size: 1.2rem;
                    padding: 0.4rem;
                    margin-right: .4rem;
                    display: inline-block;
                    &.goodsNavActive{
                        color: #fff;
                        background-color: #4a4c5b;
                    }
                }
            }
            .other-body{
                .goods-dec-content{
                    padding-top: 1rem;
                    color: #333;
                    line-height: 1.5;
                    p{
                        margin:0;
                        img{
                            width:100%;
                            height:auto;
                            display:block;
                        }
                    }
                }
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