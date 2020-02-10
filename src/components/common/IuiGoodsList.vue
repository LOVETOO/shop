<template>
    <div class="iui-goodslist-container">
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url">
            <h1 class="title">{{ item.title }}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.market_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
export default{
    props:{
        goodslist:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        goDetail(id){
            this.$router.push({name:'goodsinfo',params:{id}})
        }
    }
}
</script>

<style lang="scss" scoped>
.iui-goodslist-container{
    display:flex;
    flex-wrap:wrap;
    padding: .8rem .8rem 5rem;
    box-sizing: border-box;
    justify-content:space-between;
    background-color: #f0f3f6;
    .goods-item{
        width: 48%;
        border: none;
        background-color: #fff;
        margin-bottom: 1rem;
        min-height: 19rem;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
        img{
            width:100%;
        }
        .title{
            font-size: .9rem;
            line-height: 1.2;
            padding: .1rem .5rem;
        }
        .info{
            background-color:#e3e7ea;
            padding: .6rem .5rem;
            .price{
                .now{
                    color:#E91E63;
                    font-weight:bold;
                    font-size:16px;
                }
                .old{
                    font-size:12px;
                    margin-left:10px;
                    text-decoration:line-through;
                }
            }
            .sell{
                display:flex;
                justify-content:space-between;
                padding-top: .3rem;
                font-size: .5rem;
                color: #7c858e;
                span{
                    &:nth-child(1){
                        color: #E91E63;
                    }
                }
            }
        }
    }
}
</style>