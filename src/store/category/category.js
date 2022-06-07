/* eslint-disable */
import firebase from 'firebase/compat'
export default {
  state: {
    categoryError: null,
    categories: null,
  },
  mutations: {
    setCategoryError(state, error) {
      state.categoryError = error
    },
    setCategories(state, categories) {
      state.categories = categories
    },
  },
  actions: {
    async createCategory({commit}, {title, limit, type}) {
      try {
        const uid = this.state.info.currentUserUID
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push({title, limit, type, date: new Date().toJSON()})
        return {title, limit, type, id: category.key}
      } catch (e) {
        commit('setCategoryError')
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
          .update({title, limit, update: new Date().toJSON()})
      } catch (e) {
        commit('setCategoryError')
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
        if (categories !== null) {
          categories = Object.keys(categories).map((key) => ({
            ...categories[key],
            id: key,
          }))
        }
        commit('setCategories', categories)
      } catch (e) {
        commit('setCategoryError')
        throw e
      }
    },
  },
}
