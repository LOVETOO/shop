<template>
    <!-- 可能这个异步还没完成就渲染好子组件了，使用传给子组件的max会undefined；使用watch属性监听父组件传过来的max值，不管watch会被触发几次，但是最后一次肯定是一个max数值 -->
    <div class="mui-numbox" data-numbox-min='1'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
export default{
    methods:{
        countChanged(){
            this.$emit("getcount",parseInt(this.$refs.numbox.value))
        }
    },
    props:["max"],
    watch:{
        'max':function(newVal,oldVal){
        }
    }
}
</script>

<style lang="scss" scoped></style>