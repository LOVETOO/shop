<template>
  <div id="app">
    <router-view></router-view>

    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler">
      <cube-tab v-for="(item, index) in tabs" 
                :icon="item.icon" :label="item.value" :key="index">
        <div>{{item.label}}</div>
        <span class="badge" v-if="item.label=='Cart'">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

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
    // ...mapGetters(["cartTotal"])
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val);
    }
  }
};
</script>

<style>
.cube-tab-bar{
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 99;
}
</style>
