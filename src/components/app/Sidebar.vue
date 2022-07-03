<template>
  <ul class="sidenav app-sidenav my-sidebar" :class="{open: !isSidebarOpen}">
    <li v-for="route in this.routes" :key="route.name">
      <router-link
        v-if="
          route.name !== 'Register' &&
          route.name !== 'Login' &&
          route.name !== 'Record' &&
          route.name !== 'Profile' &&
          route.name !== 'NotFound' &&
          route.name !== 'DetailRecord'
        "
        :to="{name: route.name}"
        exact
        class="waves-effect waves-light"
        @click.prevent="$emit('openSideBar')"
      >
        {{ route.translate }}
      </router-link>
    </li>
    <li class="black-text data-block" style="text-align: center;">
                    <Data />
                </li>
  </ul>
</template>

<script>
import {routes} from '../../router/index'
import Data from './Data'
export default {
  name: 'Sidebar',
  components: {Data},
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
.my-sidebar{
  background-color: aqua;
}
li > .router-link-exact-active {
  background-color: #faf138;
  cursor: pointer;
}
  @media (min-width: 375px){
    .data-block{
      display: none;
    }
  }
</style>
