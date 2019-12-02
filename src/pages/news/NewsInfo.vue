<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发布时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>浏览：{{ newsinfo.click }}</span>
        </p>
        <div class="content" v-html="newsinfo.content"></div>

        <comment-box :id="this.id"></comment-box>
    </div>
</template>

<script>
import comment from '@/components/common/IuiComment.vue'

export default{
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    methods:{
        getNewsInfo(){
            this.$http.get('api/getnew/' + this.id).then(result=>{
                if (result.data.status===0) {
                    this.newsinfo=result.data.message[0]
                }
            })
        }
    },
    components:{
        'comment-box':comment
    },
    created(){
        this.getNewsInfo()
    }
}
</script>

<style lang="scss">
.newsinfo-container{
    padding:1rem;
    .title{
        font-size: 1.4rem;
        color: #222;
        line-height: 1.3;
        padding-bottom: 1rem;
    }
    .subtitle{
        font-size: .8rem;
        color: #adb6bf;
        padding-bottom: 1rem;
        display:flex;
        justify-content:space-between;
    }
    .content{
        line-height: 1.6;
        color: #333;
        img{
            width:100%;
        }
    }
}
</style>