<template>
  <div class="forget-container">
    <iui-header :title="'重置密码'"></iui-header>
  </div>
</template>


<script>
import IuiHeader from "@/components/common/IuiHeader"

export default{
    data(){
        return{
        }
    },
    components:{
        IuiHeader
    }
}
</script>

<style lang="scss" scoped>
.forget-container{
    padding: 3rem 0 0;
    min-height: 100vh;
    box-sizing: border-box;
}
</style>