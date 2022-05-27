<template>
 <component :is="layout">
  <router-view/>
 </component>
</template>

<script>
 import EmptyLayout from './layouts/EmptyLayout'
 import MainLayout from './layouts/MainLayout'
 export default {
  async created() {
   if (!Object.keys(this.$store.state.info.info).length) {
    await this.$store.dispatch('fetchInfo')
   }
  },
  computed: {
   // eslint-disable-next-line vue/return-in-computed-property
   layout() {
    return (this.$route.meta.layout || 'EmptyLayout')
   }
  },
  components: {EmptyLayout, MainLayout}
 }
</script>

<style lang="scss">
@import "../node_modules/materialize-css/dist/css/materialize.css";
@import "../Templates/index.css";
</style>
