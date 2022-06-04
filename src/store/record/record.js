/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    recordError: null,
  },
  mutations: {
    setRecordError(state, error) {
      state.recordError = error
    },
  },
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = this.state.info.currentUserUID
        return await firebase.database().ref(`/users/${uid}/records`).push(record)
      } catch (e) {
        commit('setRecordError')
        throw e
      }
    },
  },
}
