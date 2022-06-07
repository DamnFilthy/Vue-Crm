<template>
  <div class="page-title">
    <h3>Профиль</h3>
  </div>

  <div v-if="!isLoading">
    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field" v-if="profileName">
        <input
                v-model="v$.name.$model"
                type="text"
                :class="{invalid: v$.name.$errors.length}"
        />
        <label :class="{active: this.name !== ''}">Имя</label>
        <small
                class="helper-text invalid"
                v-for="(error, index) of v$.name.$errors"
                :key="index"
        >{{ error.$message }}</small
        >
      </div>
      <div v-else style="margin-bottom: 30px;">
        <LoopingRhombusesSpinner :size="50" :color="'#68de4b'" />
      </div>
      <div class="input-field" v-if="profileAvatar">
        <input
                v-model="avatar"
                type="text"
        />
        <label :class="{active: this.avatar !== ''}">Имя</label>
      </div>
      <div v-else style="margin-bottom: 30px;">
        <LoopingRhombusesSpinner :size="50" :color="'#68de4b'" />
      </div>
      <button class="btn waves-effect waves-light">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>

  <div v-else>
    <AtomSpinner :size="150" :color="'#ffa726'" />
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import {AtomSpinner} from 'epic-spinners'
import {
  validName,
  requiredField,
} from '../helpers/validations/validators'
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
  name: 'Profile',
  components: {AtomSpinner, LoopingRhombusesSpinner},
  data() {
    return {
      isLoading: false,
      name: '',
      avatar: '',
    }
  },
  setup() {
    return {v$: useVuelidate()}
  },
  created() {
    setTimeout(() => {
      this.name = this.$store.state.info.info.name
      this.avatar = this.$store.state.info.info.avatar
    }, 500)
  },
  methods: {
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        this.isLoading = true
        const formData = {
          name: this.name,
          avatar: this.avatar,
        }

        try {
          await this.$store.dispatch('updateInfo', formData)
          this.isLoading = false
        } catch (error) {
          this.isLoading = false
        }
      }
    },
  },
  computed: {
    profileName() {
      return this.$store.state.info.info.name
    },
    profileAvatar() {
      return this.$store.state.info.info.avatar
    },
  },
  validations() {
    return {
      name: {
        required_validation: {
          $validator: requiredField,
          $message: 'Это поле обязательно для заполнения',
        },
        name_validation: {
          $validator: validName,
          $message:
            'Неверный ввод. Имя может содержать только буквы, тире (-) и пробелы',
        },
      },
    }
  },
}
</script>

<style scoped></style>
