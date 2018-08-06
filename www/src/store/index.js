import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

let production = !window.location.host.includes('localhost');
let baseUrl = production ? 'heroku address' : '//localhost:3000/';

vue.use(vuex)

let api = axios.create({
  baseURL: baseUrl + 'api/',
  timeout: 3000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: baseUrl + 'auth/',
  timeout: 3000,
  withCredentials: true
})

export default new vuex.Store({
  state: {
    user: {}
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = {}
    }
  },
  actions: {
    userRegister({ commit }, payload) {
      auth.post('register', payload)
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userLogin({ commit }, payload) {
      auth.post('login', payload)
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userLogout({ commit }) {
      auth.delete('logout')
        .then(res => {
          commit('clearUser')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})