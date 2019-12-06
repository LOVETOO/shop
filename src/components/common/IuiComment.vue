<template>
    <div class="cmt-container">
        <h3>发布评论</h3>
        <textarea placeholder="请输入评论内容（最多120字）" maxlength="120" v-model="msg"></textarea>

        <cube-button @click="postComment">发布评论</cube-button>

        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comments" :key="item.add_time">
                <div class="cmt-title">
                    <p>{{ i+1 }}楼 - {{ item.user_name }}</p>
                    <p>评论时间：{{ item.add_time | dateFormat }}</p>
                </div>
                <div class="cmt-body">{{ item.content==='undefined' ? '没有评论':item.content }}</div>
            </div>
        </div>

        <cube-button @click="getMore">加载更多</cube-button>
    </div>
</template>

<script>
import {MixinMethods} from '@/components/common/mixin.js'

export default{
    // 组件内递归调用自己
    // 使用 keep-alive时可以使用include和exclude指定需要缓存和不需要缓存的组件
    // 调试时更好定位
    name:"IuiComment",
    data(){
        return {
            pageIndex:1,
            comments:[],
            msg:''
        }
    },
    mixins:[MixinMethods],
    methods:{
        getComments(){
            this.$http.get("api/getcomments/"+this.id+"?pageindex="+this.pageIndex).then(result=>{
                if(result.data.status===0){
                    this.comments=this.comments.concat(result.data.message)// 拼接
                    // $root表示当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。该属性只读
                    // this.$root.showToast('获取评论成功')
                }else{
                    this.showToastMask('获取评论失败')
                }
            })
        },
        getMore(){
            this.pageIndex++
            this.getComments()
        },
        postComment(){
            if (this.msg.trim().length===0) {
                return this.showToastMask("评论内容不能为空")
            }
            let data = new URLSearchParams()
            data.append('content',this.msg.trim())
            this.$http.post('api/postcomment/'+this.$route.params.id,data)
            .then(result=>{
                if (result.data.status===0) {
                    var cmt={
                        user_name:'匿名用户',
                        add_time:Date.now(),
                        content:this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg=''
                }else{
                    this.showToastMask('评论失败')
                }
            })
        }
    },
    props:["id"],
    created(){
        this.getComments()
    }
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 1.3rem;
        padding-top: 3rem;
        padding-bottom: .5rem;
    }
    textarea{
        height: 5rem;
        width: 100%;
        resize: none;
        padding: .5rem;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        border: none;
        margin-bottom: .5rem;
        background-color: #f5f6f7;
        border-radius: .3rem;
        font-size: 1rem;
        font-family: initial;
        &:focus{
            border: none;
        }
    }
    .cmt-list{
        margin: 2rem 0 .5rem;
        .cmt-item{
            background: #f5f6f7;
            padding: 1rem 1rem .5rem;
            margin-bottom: .6rem;
            .cmt-title{
                font-size: .8rem;
                line-height: 1.3;
                p:nth-child(2){
                    color: #babcca;
                }
            }
            .cmt-body{
                line-height: 1.5;
                text-indent: 2rem;
                padding: .3rem 0 0;
            }
        }
    }
}
</style>