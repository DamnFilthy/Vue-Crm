/* eslint-disable */
import firebase from "firebase/compat";

export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            }catch (error) {
                throw error
            }
        },
        async logout({commit}){
            try {
                await firebase.auth().signOut()
                commit('clearInfo')
                return true
            }catch (error) {
                throw error
            }
        },
        async register({dispatch, commit}, {email, password, name}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUserId')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    bill: 10000,
                    name
                })
            }catch (error) {
                throw error
            }
        },
        async getUserId(){
            const user = await firebase.auth().currentUser
            return user ? user.uid : null
        }
    }
}
