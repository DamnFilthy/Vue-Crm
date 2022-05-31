<template>
  <div class="page-subtitle">
    <h4>Редактировать</h4>
  </div>
  <form @submit.prevent="onSubmit">
    <div class="input-field">
      <div>
        <label>
          <select v-model="selectedCategory" @change="onChangeSelectedCategory">
            <option disabled value="">Категория</option>
            <option
              v-for="option in categoriesObj"
              :key="option"
              :value="option"
            >
              {{ option.title }}
            </option>
          </select>
        </label>
      </div>
    </div>
    <div class="input-field">
      <input
        :disabled="this.selectedCategory === ''"
        v-model="v$.title.$model"
        type="text"
        :class="{invalid: v$.title.$errors.length}"
      />
      <label :class="{active: selectedCategory !== ''}">Название</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.title.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <div class="input-field">
      <input
        :disabled="this.selectedCategory === ''"
        @input="limitInput($event.target.value)"
        v-model="v$.limit.$model"
        id="limit"
        type="text"
        :class="{invalid: v$.limit.$errors.length}"
      />
      <label for="limit" :class="{active: selectedCategory !== ''}"
        >Лимит</label
      >
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.limit.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>

    <button class="btn waves-effect waves-light" type="submit">
      Обновить
      <i class="material-icons right">send</i>
    </button>
    <div>{{ error }} {{ serverError }}</div>
    <MessagePopup :flag="success" message="Категория обновлена!" />
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {
  requiredField,
  validLimit,
  validName,
} from '../../../helpers/validations/validators'
import MessagePopup from '../MessagePopup'

export default {
  name: 'EditCategory',
  props: ['categoriesObj'],
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
      selectedCategory: '',
      error: this.$store.state.category.categoryError,
      serverError: null,
      success: false
    }
  },
  methods: {
    onChangeSelectedCategory() {
      this.title = this.selectedCategory.title
      this.limit = Number(this.selectedCategory.limit).toLocaleString('ru-RU')
    },
    limitInput(value) {
      this.limit = Number(value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')).toLocaleString('ru-RU')
    },
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        try {
          await this.$store.dispatch('updateCategory', {
            title: this.title,
            limit: parseInt(this.limit.replace(/\D/g,'')),
            id: this.selectedCategory.id,
          })
          await this.$store.dispatch('fetchCategories')
          this.title = ''
          this.limit = ''
          this.selectedCategory = ''
          this.success = true
          this.v$.$reset()
          setTimeout(() => {
            this.success = false
          }, 2000)
        } catch (e) {
          this.serverError = e
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

<style scoped lang="scss">
form {
  position: relative;
}
select {
  font-size: 18px;
  display: block;
  cursor: pointer;
  position: absolute;
  top: -50px;
  right: 0;
  width: 40%;
}
</style>
