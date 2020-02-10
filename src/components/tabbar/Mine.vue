<template>
  <div class="mine-container">
    <iui-header :title="'我的'"></iui-header>
    <div class="userinfo-box">
        <div class="userinfo-main">
            <div class="avatar">
                <img :src="avatar">
            </div>
            <div class="userinfo">
                <div class="name">{{ userinfo.name }}</div>
                <div class="lv">LV: {{ userinfo.lv }}</div>
            </div>
        </div>
    </div>
    <div class="mine-unit-box">
        <div class="mine-unit">
            <div class="wrap">
                <router-link :to="item.path" class="item" v-for="(item,index) in hobbyWrap" :key="index">
                    <div class="cover">
                        <img :src="item.img">
                    </div>
                    <div class="desc">{{ item.desc }}</div>
                </router-link>
            </div>
        </div>
        <div class="mine-unit">
            <div class="logout" @click="logout()">退出登录</div>
        </div>
    </div>
  </div>
</template>

<script>
import IuiHeader from "@/components/common/IuiHeader"
import avatar from "@/images/avatar.jpg"
import icon5 from "@/images/icon5.png"

export default{
    data(){
        return{
            avatar:avatar,
            userinfo:{
                name:'--',
                age:'--'
            },
            hobbyWrap:[{
                path:'',
                img:icon5,
                desc:'我的收藏'
            },{
                path:'',
                img:icon5,
                desc:'我的订单'
            },{
                path:'',
                img:icon5,
                desc:'我的足迹'
            }]
        }
    },
    components:{
        IuiHeader
    },
    methods:{
        logout(){
            this.$createDialog({
                type: 'confirm',
                title: '确定退出登录吗？',
                confirmBtn: {
                    text: '确定',
                    active: true,
                    disabled: false,
                    href: 'javascript:;'
                },
                cancelBtn: {
                    text: '取消',
                    active: false,
                    disabled: false,
                    href: 'javascript:;'
                },
                onConfirm: () => {
                    if(this.$store.dispatch('logout')){
                        this.$root.showToast('退出成功')
                        setTimeout(()=>{this.$router.push('/login')},1000)
                    }else{
                        this.$root.showToast('退出失败')
                    }
                },
                onCancel: () => {return}
            }).show()
        },
        getUserInfo(){
            this.$http.get('http://localhost:8080/api/userinfo').then(result=>{
                if (result.data.code===1) {
                    this.userinfo=result.data.data
                }
            }).catch(error => {
                let txt=error.message || error.response.data.message || "获取账号信息失败"
                this.$root.showToast(txt)
            })
        }
    },
    created(){
        this.getUserInfo()
    }
}
</script>

<style lang="scss" scoped>
.mine-container{
    padding-top: 3rem;
    background-color: #f0f3f6;
    box-sizing: border-box;
    min-height: 100vh;
    .userinfo-box{
        color: #fff;
        padding: 1rem 1rem 3rem;
        background: linear-gradient(180deg, #f53149, #e91e63);
        .userinfo-main{
            display: flex;
            .avatar{
                img{
                    width: 3.5rem;
                    border-radius: 100%;
                    margin-right: 1rem;
                }
            }
            .userinfo{
                .name{
                    font-size: 1.3rem;
                    padding: .1rem 0;
                    line-height: 2rem;
                }
                .lv{
                    font-size: .8rem;
                    padding: .2rem .3rem;
                    display: inline-block;
                    border-radius: .2rem;
                    background-color: rgba(255, 255, 255, 0.26);
                }
            }
        }
    }
    .mine-unit-box{
        .mine-unit{
            margin: 0 1rem .7rem;
            background-color: #fff;
            border-radius: .5rem;
            &:nth-child(1){
                margin-top: -1rem;
            }
            .wrap{
                display: flex;
                justify-content: space-around;
                align-items: center;
                .item{
                    padding: 1rem 0;
                    text-align: center;
                    img{
                        width: 2rem;
                        margin-bottom: .5rem;
                    }
                    .desc{
                        color: #333;
                        font-size: .9rem;
                    }
                }
            }
            .logout{
                color: #ec235b;
                padding: 1rem;
                text-align: center;
                letter-spacing: .1rem;
                &:active{
                    opacity: .7;
                    background-color: rgba(240, 243, 246, 0.3);
                }
            }
        }
    }
}
</style>