<template>
 <component :is="layout">
  <router-view/>
 </component>
</template>

<script>
 import EmptyLayout from './layouts/EmptyLayout'
 import MainLayout from './layouts/MainLayout'

 export default {
  computed: {
   // eslint-disable-next-line vue/return-in-computed-property
   layout() {
    return (this.$route.meta.layout || 'empty') + '-layout'
   }
  },
  components: {EmptyLayout, MainLayout}
 }
</script>

<style lang="scss">
@import "../../node_modules/materialize-css/dist/css/materialize.min.css";
@import "../Templates/index.css";
</style>
