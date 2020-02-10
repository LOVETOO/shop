<template>
    <div>
        <iui-header :title="'页面/文件找不到'"></iui-header>
        <div class="notfound-container">
            <div class="body">
                <h2>404</h2>
                <div>页面/文件找不到</div>
            </div>
        </div>
    </div>
</template>

<script>
import IuiHeader from "@/components/common/IuiHeader"

export default{
    components:{
        IuiHeader
    }
}
</script>

<style lang="scss" scoped>
.notfound-container{
    padding-top: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 2;
    .body{
        padding-top: 5rem;
    }
}
</style>