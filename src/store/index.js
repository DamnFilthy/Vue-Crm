import {createStore} from 'vuex'
import auth from './auth/auth.js'
import info from './info/info'
import category from './category/category'
import record from './record/record'

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    info,
    category,
    record,
  },
})
