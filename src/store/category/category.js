/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    categoryError: null,
  },
  mutations: {
    setError(state, error) {
      state.categoryError = error
    },
  },
  actions: {
    async createCategory({commit}, {title, limit}) {
      try {
        const uid = this.state.info.currentUserUID
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({title, limit})
        return {title, limit, id: category.key}
      } catch (e) {
        commit('setError')
        throw e
      }
    },
  },
}
