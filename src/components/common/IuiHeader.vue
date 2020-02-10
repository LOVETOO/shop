<template>
  <div id="iui_header">
    <header class="clear">
        <div class="left head-back" v-show="isHome() && $routerHistory.canBack()" @click="back">
            <i class="cubeic-back"></i>
            <span>返回</span>
        </div>
        <h1 class="head-title">{{ title }}</h1>
        <div class="head-extend center">
          <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </header>
  </div>
</template>

<script>
export default {
    data(){
        return{}
    },
    props: {
        title:{
            type:String,
            default:''
        }
    },
    methods: {
        back(){
            this.$router.goBack()
        },
        isHome(){
            return this.$route.path != '/home'
        }
    }
}
</script>


<style lang="scss" scoped>
#iui_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3rem;
    z-index: 999;
    background-color: #f53149;
    color: #fff;
    header {
        height: 100%;
        .head-back{
            float: left;
            height: 100%;
            display: inline-flex;
            align-items: center;
            i{
                font-size: 1.2rem;
                padding-left: .8rem;
                padding-right: .3rem;
                display: inline-flex;
                align-items: center;
                height: 100%;
            }
        }
        .head-title{
            text-align: center;
            height: 100%;
            max-width: 55%;
            margin: auto;
            line-height: 3;
        }
    }
}
</style>
