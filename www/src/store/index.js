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

function formatDates(array) {
  array.forEach(obj => {
    obj.startDate = obj.startDate.slice(0, 10);
    obj.endDate = obj.endDate.slice(0, 10);
  })
  return array
}

function createShiftDictionary(array) {
  let out = {}
  array.forEach(obj => {
    if (!out[obj.parentId]) {
      out[obj.parentId] = []
      out[obj.parentId].push(obj)
    }
    else {
      out[obj.parentId].push(obj)
    }
  })
  return out
}

export default new vuex.Store({
  state: {
    user: {},
    payPeriods: [],
    shifts: {}
  },
  mutations: {
    //// Authentication ///////
    setUser(state, payload) {
      state.user = payload
    },
    clearUser(state) {
      state.user = {}
    },
    logout(state) {
      state.user = {}
    },
    ///// End Authentication /////
    setPayPeriods(state, payload) {
      state.payPeriods = formatDates(payload)
    },
    setShifts(state, payload) {
      state.shifts = createShiftDictionary(payload)
    }
  },
  actions: {
    /////  Authentication //////////////
    userRegister({ commit }, payload) {
      auth.post('register', payload)
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    userLogin({ commit, dispatch }, payload) {
      auth.post('login', payload)
        .then(res => {
          console.log(res.data)
          commit('setUser', res.data.data)
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
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /////// End Authentication //////////////

    /////// Pay Periods /////////////////////
    getPayPeriods({ commit, state }) {
      api.get('periods/' + state.user._id)
        .then(res => {
          commit('setPayPeriods', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    createPayPeriod({ dispatch }, payload) {
      api.post('periods', payload)
        .then(() => {
          dispatch('getPayPeriods')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editPayPeriod({ dispatch }, payload) {
      api.put('periods/' + payload.id, payload)
        .then(() => {
          dispatch('getPayPeriods')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePayPeriod({ dispatch }, payload) {
      api.delete('periods/' + payload)
        .then(() => {
          dispatch('getPayPeriods')
          dispatch('cascadeShifts')
        })
        .catch(err => {
          console.log(err)
        })
    },

    /////// End Pay Periods //////////////////

    /////// Shifts ///////////////////////////
    getShifts({ commit, state }) {
      api.get('shifts/' + state.user._id)
        .then(res => {
          commit('setShifts', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addShift({ dispatch }, payload) {
      api.post('shifts', payload)
        .then(res => {
          dispatch('getShifts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editShift({ dispatch }, payload) {
      api.put('shifts/' + payload.id, payload)
        .then(() => {
          dispatch('getShifts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteShift({ dispatch }, payload) {
      api.delete('shifts/' + payload)
        .then(() => {
          dispatch('getShifts')
        })
        .catch(err => {
          console.log(err)
        })
    },
    cascadeShifts({ dispatch }, payload) {
      api.delete('shifts/cascade/' + payload)
        .then(() => {
          dispatch('getShifts')
        })
        .catch(err => {
          console.log(err)
        }) /// this still needs to be tested
    }

    /////// End Shifts ///////////////////////////
  }
})