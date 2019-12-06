<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="iui-app-view"></router-view>
    </transition>

    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" 
                :icon="item.icon" :label="item.value" :key="index">
        <div>{{item.label}}</div>
        <span id="badge" v-if="item.value=='/cart'">{{getAllCount}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      transitionName: 'route-forward',
      selectLabel: "/",
      tabs: [
        {
          label: "首页",
          value: "/home",
          icon: "cubeic-home"
        },
        {
          label: "购物车",
          value: "/cart",
          icon: "cubeic-mall"
        },
        {
          label: "我的",
          value: "/mine",
          icon: "cubeic-person"
        }
      ]
    };
  },
  created() {
    this.selectLabel = this.$route.path
  },
  watch: {
    $route(route) {
      this.selectLabel = route.path
      this.transitionName = this.$router.transitionName
    }
  },
  computed: {
    ...mapGetters(["getAllCount"])
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    }
  },
  // 不能调用this,该路由调用时，组件并未被初始化，其他可以；在渲染该组件的对应路由被 confirm 前调用
  // beforeRouteEnter(to, from, next){
  //     next(vm => {
  //       // 通过 `vm` 访问组件实例
  //     })
  // },
  // 在当前路由改变，但是该组件被复用时调用，比如带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候
  // beforeRouteUpdate(to, from, next){},
  // 导航离开该组件的对应路由时调用
  // beforeRouteLeave(to, from, next){}
};
</script>

<style lang="scss">
#app{
  padding-bottom: 3rem;
  .cube-tab-bar{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    background-color: #fff;
    box-shadow: 0 0 0.8rem 0.1rem #ebedf0;
    .cube-tab {
      position: relative;
      #badge {
        font-size: 12px;
        background: #e91e63;
        color: white;
        border-radius: 50%;
        padding: 2px;
        min-width: 16px;
        min-height: 16px;
        position: absolute;
        right: 25%;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    i{
      font-size: 1.5rem;
    }
    div{
      font-size: .5rem;
      margin-top: .1rem;
    }
    .cube-tab_active{
      color: #e86b69;
    }
  }
}



// 路由动画
.route-forward-enter {
  transform: translate3d(100%, 0, 0);
}
.route-back-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-forward-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.route-back-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active {
  transition: all .3s ease;
}
.iui-app-view{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
