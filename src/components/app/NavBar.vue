<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a
          class="dropdown-trigger mobile-menu-burger"
          @click.prevent="$emit('openSideBar')"
        >
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          <Data />
        </span>
      </div>

      <ul class="right">
        <li>
          <a
            ref="dropdown"
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
          >
            <div class="mobile-hide-name">
              <div>
                <img :src="userAvatar" alt="avatar" />
              </div>
              <div v-if="this.userName">
                {{ this.userName }}
              </div>
              <div class="small-spinner" v-else>
                <LoopingRhombusesSpinner :size="50" :color="'#000'" />
              </div>
              <div>
                <i class="material-icons right">arrow_drop_down</i>
              </div>
            </div>
          </a>
          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link :to="{name: 'Profile'}" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <router-link
                :to="{
                  name: 'Login',
                  params: {logout: true, message: 'Вы вышли из учетной записи'},
                }"
                class="black-text"
              >
                <i class="material-icons">assignment_return</i>Выйти
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css'
import Data from './Data'
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
  name: 'NavBar',
  components: {Data, LoopingRhombusesSpinner},
  emits: ['openSideBar'],
  data() {
    return {
      dropdown: null,
    }
  },
  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true,
      inDuration: 350,
      alignment: 'right',
    })
  },
  beforeUnmount() {
    if (this.dropdown.destroy) {
      this.dropdown.destroy
    }
  },
  computed: {
    userName() {
      return this.$store.state.info.info.name
    },
    userAvatar() {
      return this.$store.state.info.info.avatar
    },
  },
}
</script>

<style scoped lang="scss">
.mobile-hide-name {
  padding-top: 15px;
  display: flex;
  align-items: center;
  div:not(:last-child) {
    margin-right: 15px;
  }
  img {
    width: 40px;
    border-radius: 30px;
  }
}
.small-spinner {
  position: absolute;
  top: 23px;
  right: 70px;
}
@media (min-width: 769px) {
  .mobile-menu-burger {
    display: none;
  }
}
@media (max-width: 435px) {
  .mobile-hide-name {
    display: none;
  }
}
</style>
