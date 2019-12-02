<template>
  <div id="app">
    <router-view></router-view>

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
      // this.transitionName = this.$router.transitionName
    }
  },
  computed: {
    ...mapGetters(["getAllCount"])
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    }
  }
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
</style>
