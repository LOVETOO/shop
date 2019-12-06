<template>
    <div class="shopcar-container">

        <div class="goods-list">
            <div class="iui-card goodslist" v-for="(item,i) in goodslist" :key="item.id">
                <div class="iui-card-content">
                    <div class="iui-card-content-inner">
                        <cube-switch v-model="getGoodsSeleted[item.id]" @input="selectedChanged(item.id,getGoodsSeleted[item.id])"></cube-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h2>{{ item.title }}</h2>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <iui-cart-mun-box
                                    :initcount="getGoodsCount[item.id]"
                                    :goodsid="item.id"></iui-cart-mun-box>
                                <!-- item.id用于删除store中的，i索引用于删除goodslist中的数据 -->
                                <a class="delgoods" href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="iui-card total">
                <div class="iui-card-content">
                    <div class="iui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计(不包含运费)</p>
                            <p>已勾选商品<span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>件，总价<span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>元</p>
                        </div>
                        <cube-button :inline=true @click="settleAccounts()">去结算</cube-button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import IuiCartMunBox from '@/components/common/IuiCartMunBox.vue'
import {mapGetters} from 'vuex'

export default{
    data(){
        return {
            goodslist:[]
        }
    },
    components:{
        IuiCartMunBox
    },
    computed:{
        ...mapGetters(['getGoodsSeleted','getGoodsCount'])
    },
    methods:{
        getGoodsList(){
            var idArr=[]
            this.$store.state.car.forEach(item=>idArr.push(item.id))
            if (idArr.length<=0) {return}
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                if (result.data.status===0) {
                    this.goodslist=result.data.message
                }
            })
        },
        remove(id,index){
            this.goodslist.splice(index,1)
            this.$store.commit("removeFormCar",id)
        },
        selectedChanged(id,val){
            this.$store.commit("updateGoodsSeleted",{id,selected:val})
        },
        settleAccounts(){
            this.$root.showToast("待更新")
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    min-height: calc(100vh - 3rem);
    background-color: #f0f3f6;
    .goods-list{
        .iui-card{
            background-color: #fff;
            padding: .7rem 0;
            &.goodslist{
                padding: 1rem;
                border: 1px solid #f0f3f6;

            }
            &.total{
                margin-top: 1rem;
                padding: 1rem;
            }
        }
        .iui-card-content-inner{
            display:flex;
            align-items:center;
            .cube-switch{
                width: 4rem;
            }
            img{
                margin-left: 0.3rem;
                margin-right: .7rem;
                width: 3.5rem;
                height: 3.5rem;
                display: flex;
            }
            h2{
                font-size:.9rem;
                line-height: 1.2;
                padding-bottom: .1rem;
            }
            .info{
                width: 15rem;
                display:flex;
                flex-direction:column;
                justify-content:space-between;
                .price{
                    color:#e91e63;
                    font-weight:bold;
                    padding-right: .5rem;
                }
                .delgoods{
                    padding-left: .6rem;
                    font-size: .8rem;
                }
            }
        }
    }
    .jiesuan{
        line-height: 1.5;
        color: #333;
        display:flex;
        justify-content:space-between;
        align-items:center;
        .red{
            color:#e91e63;
            font-weight:bold;
            font-size:16px;
        }
    }
}
</style>