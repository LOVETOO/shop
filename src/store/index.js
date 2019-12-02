import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import modules from './modules'

Vue.use(Vuex)


var car=JSON.parse(localStorage.getItem('car') || '[]')
const state = {
    count:0,
    car:car
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,
})