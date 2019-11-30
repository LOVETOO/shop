<template>
  <div>
    <iui-slide :items="SlideItems"></iui-slide>
    <h1>首页</h1>
  </div>
</template>

<script>
import IuiSlide from "../../components/common/IuiSlide"
import slider1 from '../../assets/images/slider1.png'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'

export default{
    data(){
        return{
            SlideItems:[
            {
                url:'/',
                image:slider1
            },{
                url:'/',
                image:slider2
            },{
                url:'/',
                image:slider3
            }]
        }
    },
    components:{
        IuiSlide
    }
}
</script>

<style>
    
</style>