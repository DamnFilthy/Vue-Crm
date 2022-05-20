<template>
  <div v-if="isLoading">Loading...</div>
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
            v-show="
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
            id="password"
            type="password"
            :class="{invalid: v$.password.$errors.length}"
          />
          <label for="password">Пароль</label>
          <small
            v-show="this.password.length === 0 && v$.password.$error"
            class="helper-text invalid"
            >Пароль обязательное поле для заполнения
          </small>
          <small
            v-show="this.password.length > 0 && v$.password.$invalid"
            class="helper-text invalid"
          >
            Пароль должен быть не менее
            {{ v$.password.minLength.$params.min }} символов, ceйчас вы ввели
            {{ this.password.length }}
          </small>
        </div>
      </div>
      <div class="card-action">
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

export default {
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    }
  },
  methods: {
    onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        this.isLoading = true

        setTimeout(() => {
          this.isLoading = false
          this.$router.push({name: 'Home'})
        }, 2000)

        const formData = {
          email: this.email,
          password: this.password,
        }
        console.log(formData)
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
</style>
