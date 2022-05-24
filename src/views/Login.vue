<template>
  <div>
    <form class="card auth-card main-form" @submit.prevent="onSubmit">
      <div :class="{shown: this.isLogout}" class="message-popup">
        {{ this.message }}
      </div>
      <div class="loading-block" v-if="isLoading">
        <AtomSpinner :size="150" :color="'#ffa726'" />
      </div>
      <div v-else-if="!isLoading">
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
          <div v-if="loginErrors" class="helper-text invalid firebase-error">
            {{ this.loginErrors }}
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
            <router-link :to="{name: 'Register'}"
              >Зарегистрироваться</router-link
            >
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email, minLength} from '@vuelidate/validators'
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
      type: String,
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
      isLogout: this.logout,
    }
  },
  mounted() {
    setTimeout(() => {
      this.isLogout = false
      console.log(this.isLogout)
    }, 2000)
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
          await this.$router.push({
            name: 'Home',
            params: {logout: 'false', message: 'Добро пожаловать'},
          })
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
.loading-block {
  display: flex;
  justify-content: center;
  padding: 100px;
}
.main-form {
  position: relative;
}
.message-popup {
  opacity: 0;
  transition: 0.5s ease-in-out;
  position: absolute;
  top: -40px;
  right: -191px;
  background-color: wheat;
  padding: 15px;
  border-radius: 4px;
}
.shown {
  opacity: 1;
}
.firebase-error {
  margin-bottom: 15px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
}
</style>
