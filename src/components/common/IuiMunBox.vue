<template>
    <!-- 可能这个异步还没完成就渲染好子组件了，使用传给子组件的max会undefined；使用watch属性监听父组件传过来的max值，不管watch会被触发几次，但是最后一次肯定是一个max数值 -->
    <div class="iui-numbox">
        <button class="iui-btn iui-btn-numbox-minus" @click="changeNum(-1)">-</button>
        <input class="iui-input-numbox" type="number" v-model="numbox">
        <button class="iui-btn iui-btn-numbox-plus" @click="changeNum(1)">+</button>
    </div>
</template>

<script>
export default{
    name:"IuiMunBox",
    data(){
        return{
            numbox:1
        }
    },
    methods:{
        changeNum(num){
            let newNum = parseInt(this.numbox) + parseInt(num)
            if (newNum<1 || newNum>(parseInt(this.max) || 0)) {
                return false
            }else{
                this.numbox = newNum
            }
        }
    },
    props:{
        max:{
            type:Number,
            default:1
        }
    },
    watch:{
        max(newMax){
            this.max = newMax
        },
        numbox(newNumber){
            if (newNumber>this.max) {
                this.numbox=this.max
                return
            }
            this.$emit("getcount",parseInt(newNumber) || 0)
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
        width: 5rem;
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