<template>
  <div id="iui_slide">
    <cube-slide ref="slide" :data="items">
      <cube-slide-item v-for="(item, index) in items" :key="index">
        <a :href="item.url">
          <img :src="item.image">
        </a>
      </cube-slide-item>
    </cube-slide>
  </div>
</template>

<script>
export default {
    props: ["items"],
    methods: {
    }
}
</script>


<style lang="scss">
#iui_slide{
    height: 150px;
    .cube-slide-item{
        a{
            img{
                height: auto;
                width: 100%;
            }
        }
    }
}
</style>
