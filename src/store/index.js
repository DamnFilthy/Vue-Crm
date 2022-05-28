import {createStore} from 'vuex'
import auth from './auth/auth.js'
import info from './info/info'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    info,
  },
})
