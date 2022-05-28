<template>
  <div class="page-title">
    <div :class="{shown: this.isLogin}" class="message-popup">
      {{ this.message }}
      <span class="user-name">{{ this.userName }}</span>
    </div>
    <h3>Счет</h3>

    <button class="btn waves-effect waves-light btn-small">
      <i class="material-icons">refresh</i>
    </button>
  </div>
  <div>
    <div class="home-loader" v-if="loading">
      <AtomSpinner :size="150" :color="'#ffa726'" />
    </div>
    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <Bill />
      </div>
      <div class="col s12 m6 l8">
        <Course />
      </div>
    </div>
  </div>
</template>

<script>
import Course from '../components/app/home-components/Course'
import Bill from '../components/app/home-components/Bill'
import {AtomSpinner} from 'epic-spinners'
export default {
  name: 'Home',
  components: {
    Course,
    Bill,
    AtomSpinner,
  },
  data() {
    return {
      loading: false,
      isLogin: this.$route.params.login === 'true',
      message: this.$route.params.message,
      fixerData: null,
    }
  },
  async mounted() {
    setTimeout(() => (this.isLogin = false), 2000)
    this.fixerData = await this.$store.dispatch('fetchFixer')
  },
  computed: {
    userName() {
      return this.$store.getters.info.name
    },
  },
}
</script>

<style lang="scss" scoped>
.home-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.message-popup {
  opacity: 0;
  transition: 0.5s ease-in-out;
  position: absolute;
  top: 82px;
  right: 117px;
  background-color: wheat;
  padding: 15px;
  border-radius: 4px;
}
.shown {
  opacity: 1;
}
.user-name {
  font-size: 18px;
  font-weight: bold;
}
</style>
