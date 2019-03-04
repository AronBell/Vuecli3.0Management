import Vue from 'vue'
import Vuex from 'vuex'
import $axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
state: {  
    userToken: ""
  },
  getters: {
    
  },
  mutations: {
    get_token(state, {token}) {
      state.userToken = token
    }
  },
  actions: {
    async setIsAutnenticated({commit}) {
      let token
      await $axios.get('http://localhost:5000/api/users/current')
                  .then(data => {
                    token = data
                    console.log(token)
                    return token
                  })
                  .catch(err => {
                    console.log(err)
                  })
      commit('get_token', {token})
    }
  }
})
