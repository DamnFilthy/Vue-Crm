<template>
  <ul class="sidenav app-sidenav" :class="{open: !isSidebarOpen}">
    <li v-for="route in this.routes" :key="route.name">
      <router-link
        v-if="route.name !== 'Register' && route.name !== 'Login'"
        :to="{name: route.name}"
        exact
        class="waves-effect waves-orange pointer"
        @click.prevent="$emit('openSideBar')"
      >
        {{ route.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {routes} from '../../router/index'

export default {
  name: 'Sidebar',
  emits: ['openSideBar'],
  props: {
    isSidebarOpen: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      routes: routes,
    }
  },
}
</script>

<style scoped>
li > .router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>
