export default {
    logout({ commit }) {
      localStorage.removeItem("token") // 清除缓存
      commit("setLoginState", false) // 重置状态
      return true
    }
}