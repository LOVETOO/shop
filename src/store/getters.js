export default {
    optCount:function(state){
        return '111'+state.count
    },
    getAllCount(state){
        var c=0
        state.car.forEach(item=>{
            c+=item.count
        })
        return c
    },
    getGoodsCount(state){
        var o={}
        state.car.forEach(item=>{
            o[item.id]=item.count
        })
        return o
    },
    getGoodsSeleted(state){
        var o={}
        state.car.forEach(item=>{
            o[item.id]=item.selected
        })
        return o
    },
    getGoodsCountAndAmount(state){
        var o={
            count:0,
            amount:0
        }
        state.car.forEach(item=>{
            if (item.selected) {// 被勾选
                o.count+=item.count,
                o.amount+=item.price*item.count
            }
        })
        return o
    }
}