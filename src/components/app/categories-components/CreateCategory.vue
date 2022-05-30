<template>
  <div class="page-subtitle">
    <h4>Создать</h4>
  </div>
  <form class="category-form" @submit.prevent="onSubmit">
    <div class="input-field">
      <input
        v-model="v$.title.$model"
        id="title"
        type="text"
        :class="{invalid: v$.title.$errors.length}"
      />
      <label for="title" :class="{active: title !== ''}">Название</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.title.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <div class="input-field">
      <input
        @input="limitInput($event.target.value)"
        v-model="v$.limit.$model"
        id="limit"
        type="text"
        :class="{invalid: v$.limit.$errors.length}"
      />
      <label for="limit" :class="{active: limit !== ''}">Лимит</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.limit.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
    <MessagePopup :flag="success" message="Категория добавлена!" />
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import MessagePopup from '../MessagePopup'
import {
  requiredField,
  validLimit,
  validName,
} from '../../../helpers/validations/validators'
export default {
  name: 'CreateCategory',
  components: {MessagePopup},
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      title: '',
      limit: '',
      success: false,
    }
  },
  methods: {
    limitInput(value) {
      this.limit = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
    },
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        try {
          const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit,
          })
          this.title = ''
          this.limit = ''
          this.success = true
          this.v$.$reset()
          setTimeout(() => {
            this.success = false
          }, 2000)
          console.log(category)
        } catch (e) {
          console.log(e)
        }
      }
    },
  },
  validations() {
    return {
      title: {
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
      limit: {
        required_validation: {
          $validator: requiredField,
          $message: 'Это поле обязательно для заполнения',
        },
        name_validation: {
          $validator: validLimit,
          $message: 'Минимальное значение для лимита должно быть больше 0',
        },
      },
    }
  },
}
</script>

<style scoped>
  .category-form{
    position: relative;
  }
</style>
