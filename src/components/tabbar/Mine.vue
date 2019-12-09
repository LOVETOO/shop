<template>
  <div>
    <h1>我的</h1>
    <div @click="logout()">退出登录</div>
  </div>
</template>

<script>
export default{
    data(){
        return{}
    },
    methods:{
        logout(){
            if(this.$store.dispatch('logout')){
                this.$root.showToast('退出成功')
                setTimeout(()=>{this.$router.push('/login')},1000)
            }else{
                this.$root.showToast('退出失败')
            }
        }
    }
}
</script>

<style>
    
</style>