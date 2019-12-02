export default {
    increment(state){
        state.count++
    },
    subtract(state,a){
        // state.count-=1
        state.count-=a
    },
    // 点击加入购物车时存数据到store
    addToCar(state,goodsinfo){
        var flag=false
        state.car.some(item=>{
            if (item.id==goodsinfo.id) {
                item.count+=parseInt(goodsinfo.count)
                flag=true
                return true
            }
        })
        if (!flag) {
            state.car.push(goodsinfo)
        }
        localStorage.setItem("car",JSON.stringify(state.car))
    },
    updateGoodsInfo(state,goodsinfo){
        state.car.some(item=>{
            if (item.id==goodsinfo.id) {
                item.count=parseInt(goodsinfo.count)
                return true
            }
        })
        localStorage.setItem("car",JSON.stringify(state.car))
    },
    removeFormCar(state,id){
        state.car.some((item,i)=>{
            if (item.id==id) {
                state.car.splice(i,1)
                return true
            }
        })
        localStorage.setItem("car",JSON.stringify(state.car))
    },
    updateGoodsSeleted(state,info){
        state.car.some(item=>{
            if (item.id==info.id) {
                item.selected=info.selected
            }
        })
        localStorage.setItem("car",JSON.stringify(state.car))
    }
}