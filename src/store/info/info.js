/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    info: {},
    currentUserUID: null,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async fetchInfo({commit}, uid = null) {
      try {
        if (uid !== null) {
          const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
          commit('setInfo', info)
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  getters: {
    info: (s) => s.info,
    bill: (b) => b.bill,
  },
}
