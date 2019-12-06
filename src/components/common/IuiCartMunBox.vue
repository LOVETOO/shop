<template>
    <div class="iui-numbox">
        <button class="iui-btn iui-btn-numbox-minus" @click="changeNum(-1)">-</button>
        <input class="iui-input-numbox" type="number" v-model="numbox">
        <button class="iui-btn iui-btn-numbox-plus" @click="changeNum(1)">+</button>
    </div>
</template>

<script>
export default{
    name:"IuiCartMunBox",
    data(){
        return{
            numbox:this.initcount
        }
    },
    props:{
        initcount:{
            type:Number,
            default:1
        },
        goodsid:{
            type:Number
        }
    },
    methods:{
        changeNum(num){
            let newNum = parseInt(this.numbox) + parseInt(num)
            if (newNum<1) {
                return false
            }else{
                this.numbox = newNum
            }
        }
    },
    watch:{
        initcount(newInitcount){
            this.initcount = newInitcount
        },
        numbox(newNumber){
            if ((parseInt(newNumber) || 0) < 1) {
                this.numbox=1
                return
            }
            this.$store.commit('updateGoodsInfo',{
                id:this.goodsid,
                count:newNumber
            })
        }
    },
    created(){
    }
}
</script>

<style lang="scss" scoped>
.iui-btn-numbox{
    display: inline-block;
    font-size: 1.3rem;
    width: 2rem;
    height: 2rem;
    border: none;
    color: #4a4c5b;
    background-color: #eff3f6;
}

.iui-numbox{
    margin: .5rem 0;
    display: inline-flex;
    .iui-btn-numbox-minus,.iui-btn-numbox-plus{
        @extend .iui-btn-numbox;
    }
    .iui-input-numbox {
        width: 4rem;
        height: 2rem;
        line-height: 2rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0.2rem;
        text-align: center;
        border: 0.1rem solid #eff2f6;
    }
}
</style>