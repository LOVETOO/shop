<template>
  <div class="login-container">
    <iui-header :title="loginType ? '登录' : '密码登陆'"></iui-header>

    <div class="login-body">
        <form class="login-form" v-if="loginType">
            登录
        </form>
        <form class="login-form" v-else>
            <section>
                <h2 class="login-appTitle">{{ appTitle }}</h2>
            </section>
            <section>
                <input type="text" placeholder="账号" v-model.lazy.trim="userAccount">
            </section>
            <section>
                <input type="password" placeholder="密码" v-model.lazy.trim="passWord">
            </section>
        </form>

        <div class="login" @click="longin()">登 录</div>
        <div class="forget"><router-link to="/forget" v-if="!loginType">忘记密码？</router-link></div>
    </div>
  </div>
</template>


<script>
import IuiHeader from "@/components/common/IuiHeader"

export default{
    data(){
        return{
            appTitle:"LOVETOO",
            loginType:false,
            userAccount:null,
            passWord:null,
            redirect:this.$route.query.redirect || '/'
        }
    },
    components:{
        IuiHeader
    },
    methods:{
        longin(){
            if (this.loginWay) {
                this.$root.showToast("待更新")
            }else{
                if (!this.userAccount) {
                    this.$root.showToast("请输入账号")
                    return
                }else if(!this.passWord){
                    this.$root.showToast("请输入密码")
                    return
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.login-input{
    width: 75%;
    border: 0;
    line-height: 7vw;
    margin: 0 auto 5vw;
    padding: .7rem 1.5rem;
    border-radius: 5rem;
    box-sizing: border-box;
    display: block;
}

.login-container{
    padding: 3rem 0 0;
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-body{
        width: 100%;
        .login-form{
            margin-top: -5rem;
            section{
                .login-appTitle{
                    font-size: 1.5rem;
                    width: 75%;
                    padding-bottom: 2rem;
                    padding-left: .2rem;
                    margin: auto;
                    font-weight: bold;
                    color: #333;
                }
                input{
                    @extend .login-input;
                    background: #f0f3f6;
                }
            }
        }
        .login{
            @extend .login-input;
            background: linear-gradient(-90deg, #f53149, #e91e63);
            text-align: center;
            color: #fff;
        }
        .forget{
            text-align: center;
        }
    }
}
</style>