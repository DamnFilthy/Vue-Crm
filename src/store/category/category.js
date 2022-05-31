/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    categoryError: null,
    categories: null,
  },
  mutations: {
    setError(state, error) {
      state.categoryError = error
    },
    setCategories(state, categories) {
      state.categories = categories
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
    async fetchCategories({commit, dispatch}) {
      try {
        const uid = this.state.info.currentUserUID

        let categories = (
          await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .once('value')
        ).val()

        categories = Object.keys(categories).map((key) => ({
          ...categories[key],
          id: key,
        }))

        commit('setCategories', categories)
      } catch (e) {
        commit('setError')
        throw e
      }
    },
    async updateCategory({commit}, {title, limit, id}) {
      try {
        const uid = this.state.info.currentUserUID

        await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .child(id)
            .update({title, limit})
      } catch (e) {
        commit('setError')
        throw e
      }
    },
  },
}
