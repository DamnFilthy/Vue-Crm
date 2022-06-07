/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    recordError: null,
    records: null,
  },
  mutations: {
    setRecords(state, records) {
      state.records = records
    },
    setRecordError(state, error) {
      state.recordError = error
    },
  },
  actions: {
    async createRecord({dispatch, commit}, record) {
      try {
        const uid = this.state.info.currentUserUID
        return await firebase
          .database()
          .ref(`/users/${uid}/records`)
          .push(record)
      } catch (e) {
        commit('setRecordError')
        throw e
      }
    },
    async fetchRecords({dispatch, commit}) {
      try {
        const uid = this.state.info.currentUserUID

        let records = (
          await firebase.database().ref(`/users/${uid}/records`).once('value')
        ).val()

        if (records !== null) {
          records = Object.keys(records).map((key) => ({
            ...records[key],
            id: key,
          }))
        }

        if (records === null) {
          commit('setRecords', '')
        } else {
          commit('setRecords', records)
        }
      } catch (e) {
        commit('setRecordError')
        throw e
      }
    },
  },
}
