<template>
  <div id="iui_header">
    <header>商城</header>
  </div>
</template>

<script>
export default {
    props: [],
    methods: {
    }
}
</script>


<style lang="scss" scoped>
#iui_header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2.5rem;
    z-index: 999;
    background-color: #f53149;
    color: #fff;
    header {
        text-align: center;
        padding-top: .5rem;
    }
}
</style>
