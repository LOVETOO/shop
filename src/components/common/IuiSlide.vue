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
    height: 10rem;
    .cube-slide{
        .cube-slide-group{
            .cube-slide-item{
                padding: 0 1rem;
                a{
                    img{
                        height: auto;
                        width: 100%;
                        border-radius: 0.6rem;
                    }
                }
            }
        }
        .cube-slide-dots{
            top: 8.5rem;
            span{
                margin: 0 0.1rem;
                width: 1rem;
                height: 0.2rem;
                background-color: rgba(238, 238, 238, 0.55);
                &.active{
                    background-color: #fff;
                }
            }
        }
    }
}
</style>
