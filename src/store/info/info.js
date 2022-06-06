/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    infoError: null,
    info: {},
    currentUserUID: null,
    cash: null,
  },
  mutations: {
    setInfoError(state, error){
      state.infoError = error
    },
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    },
    setCash(state, cash) {
      state.cash = cash
    },
  },
  actions: {
    async fetchInfo({commit}, uid = null) {
      try {
        if (uid !== null) {
          const info = (
            await firebase.database().ref(`/users/${uid}/info`).once('value')
          ).val()
          commit('setInfo', info)
        }
      } catch (e) {
        commit('setInfoError', e)
      }
    },
    async fetchFixer({commit}) {
      try {
        const myHeaders = new Headers(),
          key = process.env.VUE_APP_FIXER_KEY
        myHeaders.append('apikey', key)

        const requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders,
        }

        const result = await fetch(
          'https://api.apilayer.com/fixer/latest?symbols=USD,EUR,CNY&base=RUB',
          requestOptions
        )
        const cash = await result.json()
        if (cash.message){
          commit('setInfoError', cash.message)
        }
        commit('setCash', cash)
      } catch (e) {
        commit('setInfoError', e)
      }
    },
    async updateInfo({dispatch, commit}, toUpdate) {
      try {
        const uid = this.state.info.currentUserUID
        const updateData = {...this.getters.info, ...toUpdate}
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
      } catch (e) {
        commit('setInfoError', e)
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
}
