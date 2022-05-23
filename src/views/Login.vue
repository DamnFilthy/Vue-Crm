<template>
  <div class="loading-block" v-if="isLoading">
    <AtomSpinner :size="150" :color="'#ffa726'"/>
  </div>
  <div v-else-if="!isLoading">
    <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input
            v-model.trim="email"
            id="email"
            type="text"
            :class="{invalid: v$.email.$errors.length}"
          />
          <label for="email">Email</label>
          <small
            class="helper-text invalid"
            v-if="
              this.email.length === 0 &&
              v$.email.email.$response &&
              v$.email.$error
            "
            >Поле email обязательно для заполнения</small
          >
          <small class="helper-text invalid" v-show="v$.email.email.$invalid"
            >Введите корректный email</small
          >
        </div>
        <div class="input-field">
          <input
            v-model.trim="password"
            type="password"
            autocomplete="on"
            :class="{invalid: v$.password.$errors.length}"
          />
          <label>Пароль</label>
          <small
            v-show="this.password.length === 0 && v$.password.$error"
            class="helper-text invalid"
            >Пароль обязательное поле для заполнения
          </small>
          <small
            v-if="this.password.length > 0 && v$.password.$invalid"
            class="helper-text invalid"
          >
            Пароль должен быть не менее
            {{ v$.password.minLength.$params.min }} символов, ceйчас вы ввели
            {{ this.password.length }}
          </small>
        </div>
      </div>
      <div class="card-action">
        <div v-if="loginErrors">
          <span v-for="(error, index) in this.loginErrors" :key="index"
                class="helper-text invalid">
            {{ error }}
          </span>
        </div>
        <div>
          <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
          >
            Войти
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Нет аккаунта?
          <router-link :to="{name: 'Register'}">Зарегистрироваться</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
import M from 'materialize-css'
import {AtomSpinner} from 'epic-spinners'

export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  components: {
    AtomSpinner,
  },
  name: 'Login',
  props: {
    logout: {
      type: Boolean,
      required: false,
    },
    message: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
      loginErrors: null,
    }
  },
  mounted() {
    console.log(this.logout, this.message)
    if (this.logout && this.message !== undefined) {
      M.toast({html: this.message})
    }
  },
  methods: {
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        this.isLoading = true

        const formData = {
          email: this.email,
          password: this.password,
        }

        try {
          await this.$store.dispatch('login', formData)
          await this.$router.push({name: 'Home'})
        } catch (error) {
          this.email = ''
          this.password = ''
          this.loginErrors = error
          this.isLoading = false
        }
      }
    },
  },
  validations() {
    return {
      password: {required, minLength: minLength(6)},
      email: {required, email},
    }
  },
}
</script>

<style scoped lang="scss">
.input-field {
  margin-bottom: 30px;
}
  .loading-block{
    position: absolute;
    top: calc(50% - 150px);
  }
</style>
