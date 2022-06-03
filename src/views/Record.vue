<template>
  <div class="page-title">
    <h3>Новая запись</h3>
  </div>
  <form class="form" @submit.prevent="onSubmit">
    <div class="input-field mb-30">
      <label>
        <select
          v-model="v$.selectedCategory.$model"
          :class="{invalid: v$.selectedCategory.$errors.length}"
        >
          <option disabled value="">Категория</option>
          <option v-for="option in categoriesObj" :key="option" :value="option">
            {{ option.title }}
          </option>
        </select>
      </label>
      selectedCategory: {{ selectedCategory }}
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.selectedCategory.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <p>
      <label>
        <input
          v-model="v$.type.$model"
          :class="{invalid: v$.type.$errors.length}"
          class="with-gap"
          name="type"
          type="radio"
          value="income"
        />
        <span>Доход</span>
      </label>
    </p>
    <p>
      <label>
        <input
          v-model="v$.type.$model"
          :class="{invalid: v$.type.$errors.length}"
          class="with-gap"
          name="type"
          type="radio"
          value="outcome"
        />
        <span>Расход</span>
      </label>
    </p>
    <small
      class="helper-text invalid"
      v-for="(error, index) of v$.type.$errors"
      :key="index"
      >{{ error.$message }}</small
    >
    <div class="input-field">
      <input
        @input="limitInput($event.target.value)"
        v-model="v$.limit.$model"
        type="text"
        :class="{invalid: v$.limit.$errors.length}"
      />
      <label>Сумма</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.limit.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <div class="input-field">
      <input
        v-model="v$.title.$model"
        type="text"
        :class="{invalid: v$.title.$errors.length}"
      />
      <label>Описание</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.title.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <button class="btn waves-effect waves-light" type="submit">
      Создать
      <i class="material-icons right">send</i>
    </button>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {
  requiredField,
  validLimit,
  validName,
} from '../helpers/validations/validators'

export default {
  name: 'Record',
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      selectedCategory: '',
      type: '',
      title: '',
      limit: '',
      error: this.$store.state.category.categoryError,
      serverError: null,
      success: false,
    }
  },
  computed: {
    categoriesObj() {
      return this.$store.state.category.categories
    },
  },
  methods: {
    limitInput(value) {
      this.limit = Number(
        value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1')
      ).toLocaleString('ru-RU')
    },
    async onSubmit() {
      if (this.v$.$invalid) {
        this.v$.$touch()
      }
      if (!this.v$.$invalid) {
        try {
          // await this.$store.dispatch('updateCategory', {
          //   title: this.title,
          //   limit: parseInt(this.limit.replace(/\D/g,'')),
          //   id: this.selectedCategory.id,
          // })
          // await this.$store.dispatch('fetchCategories')
          console.log('calidate success')
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
      type: {
        required_validation: {
          $validator: requiredField,
          $message: 'Это поле обязательно для заполнения',
        },
      },
      selectedCategory: {
        required_validation: {
          $validator: requiredField,
          $message: 'Это поле обязательно для заполнения',
        },
      },
    }
  },
}
</script>

<style scoped lang="scss">
.input-field > label {
  position: static;
}
.mb-30 {
  margin-bottom: 30px;
}
select {
  display: block;
}
</style>
