<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout'
import MainLayout from './layouts/MainLayout'
import firebase from 'firebase/compat'
export default {
  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.$store.state.info.currentUserUID = user.uid
        this.$store.dispatch('fetchInfo', user.uid)
        this.$store.dispatch('fetchCategories')
        this.$store.dispatch('fetchRecords')
      }
    })
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    layout() {
      return this.$route.meta.layout || 'EmptyLayout'
    },
  },
  components: {EmptyLayout, MainLayout},
}
</script>

<style lang="scss">
@import '../node_modules/materialize-css/dist/css/materialize.css';
@import '../Templates/index.css';
</style>
