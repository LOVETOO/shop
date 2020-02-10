<template>
    <div class="goods-list">
        <iui-header :title="goodslistTitle"></iui-header>
        <iui-goods-list :goodslist="goodslist">
            <cube-button v-show="hasgoods" @click="getMore">加载更多</cube-button>
        </iui-goods-list>
    </div>
</template>

<script>
import {MixinMethods} from '@/components/common/mixin.js'
import IuiHeader from "@/components/common/IuiHeader"
import IuiGoodsList from "@/components/common/IuiGoodsList"

export default{
    data(){
        return {
            goodslistTitle:"产品列表",
            pageindex:1,
            goodslist:[],
            hasgoods:true
        }
    },
    mixins:[MixinMethods],
    components:{
        IuiHeader,
        IuiGoodsList
    },
    methods:{
        getGoodsList(){
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if (result.data.status===0) {
                    this.goodslist=this.goodslist.concat(result.data.message)
                    if (result.data.message.length<=0) {
                        this.showToastMask('没有更多商品')
                        this.hasgoods=false
                    }
                }else{
                    this.showToastMask('获取失败')
                }
            })
        },
        getMore(){
            this.pageindex++
            this.getGoodsList()
        }
    },
    created(){
        this.getGoodsList()
    }
}
</script>

<style lang="scss" scoped>
.goods-list{
    padding-top: 3rem;
}
</style>