<template>
  <div v-if="isLoading">Loading...</div>
  <div v-else-if="!isLoading">
    <form class="card auth-card" @submit.prevent="onSubmit">
      <div class="card-content">
        <span class="card-title">Домашняя бухгалтерия</span>
        <div class="input-field">
          <input v-model="v$.name.$model"
                 id="name"
                 type="text"
                 :class="{invalid: v$.email.$errors.length}"
          />
          <label for="name">Имя</label>
          <small class="helper-text invalid"
                 v-for="(error, index) of v$.name.$errors" :key="index"
          >{{ error.$message }}</small>
        </div>
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
                  id="password"
                  type="password"
                  :class="{invalid: v$.password.$errors.length}"
          />
          <label for="password">Пароль</label>
          <small
                  v-if="this.password.length === 0 && v$.password.$error"
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
        <div class="input-field">
          <input
                  v-model.trim="confirmPassword"
                  id="password"
                  type="password"
                  :class="{invalid: v$.confirmPassword.$errors.length}"
          />
          <label for="password">Пароль</label>
          <small
                  v-if="this.confirmPassword.length === 0 && v$.confirmPassword.$error"
                  class="helper-text invalid"
          >Пароль обязательное поле для заполнения
          </small>
          <small
                  v-show="this.confirmPassword.length > 0 && v$.confirmPassword.$invalid"
                  class="helper-text invalid"
          >
            Пароль должен быть не менее
            {{ v$.confirmPassword.minLength.$params.min }} символов, ceйчас вы ввели
            {{ this.confirmPassword.length }}
          </small>
          <small
                  v-show="this.password !== this.confirmPassword"
                  class="helper-text invalid"
          >
            Пароли должны совпадать
          </small>
        </div>
        <p>
          <label>
            <input :class="{invalid: agree}"
                   v-model="agree"
                   type="checkbox" />
            <span>С правилами согласен</span>
          </label>
        </p>
        <small v-for="(error, index) of v$.agree.$errors" :key="index"
               class="helper-text invalid"
        >
          {{error.$message}}
        </small>
      </div>
      <div class="card-action">
        <div>
          <button class="btn waves-effect waves-light auth-submit" type="submit">
            Зарегистрироваться
            <i class="material-icons right">send</i>
          </button>
        </div>

        <p class="center">
          Уже есть аккаунт?
          <router-link :to="{name: 'Login'}">Войти!</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
  import useVuelidate from '@vuelidate/core'
  import {required, email, minLength} from '@vuelidate/validators'
  import {validName, requiredField} from '../helpers/validations/validators'
  export default {
    name: 'Register',
    setup () {
      return { v$: useVuelidate() }
    },
    data(){
      return{
        isLoading: false,
        name: '',
        email: '',
        password: '',
        confirmPassword:'',
        agree: false
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
            name: this.name,
            email: this.email,
            password: this.password,
            agree: this.agree
          }
          console.log(formData)
        }
      },
    },
    validations() {
      return {
          name: {
            required_validation: {
              $validator: requiredField,
              $message: 'Это поле обязательно для заполнения'
            },
            name_validation: {
              $validator: validName,
              $message: 'Неверный ввод. Имя может содержать только буквы, тире (-) и пробелы'
            }
          },
          password: {required, minLength: minLength(6)},
          email: {required, email},
          confirmPassword: {
            minLength: minLength(6),
            required_validation: {
              $validator: requiredField,
              $message: 'Это поле обязательно для заполнения'
            },
          },
          agree: {
            agree_validation: {
              $validator:  v => v,
              $message: 'Вы не согласились с правилами'
            }

          }
        }
    },
  }
</script>
