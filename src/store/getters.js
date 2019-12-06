export default {
    getAllCount(state){
        let count=0
        state.car.forEach(item=>{
            count+=item.count
        })
        return count
    },
    getGoodsCount(state){
        let count={}
        state.car.forEach(item=>{
            count[item.id]=item.count
        })
        return count
    },
    getGoodsSeleted(state){
        let selected={}
        state.car.forEach(item=>{
            selected[item.id]=item.selected
        })
        return selected
    },
    getGoodsCountAndAmount(state){
        let goods={
            count:0,
            amount:0
        }
        state.car.forEach(item=>{
            if (item.selected) {// 被勾选
                goods.count+=item.count,
                goods.amount+=item.price*item.count
            }
        })
        return goods
    }
}