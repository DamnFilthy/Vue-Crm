/* eslint-disable */
import firebase from 'firebase/compat'
import {getAuth, signOut} from 'firebase/auth'

export default {
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (error) {
        throw error
      }
    },
    async logout({commit}) {
      try {
        const auth = getAuth()
        signOut(auth)
          .then(() => {
            commit('clearInfo')
          })
          .catch((error) => {
            console.log(error)
          })
      } catch (error) {
        throw error
      }
    },
    async register({dispatch, commit}, {email, password, name}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name,
        })
      } catch (error) {
        throw error
      }
    },
    async getUserId() {
      const user = await firebase.auth().currentUser
      return user ? user.uid : null
    },
  },
}
