<template>
  <div class="page-subtitle">
    <h4>Создать</h4>
  </div>
  <form class="category-form" @submit.prevent="onSubmit">
    <div class="input-field">
      <input
        v-model="v$.title.$model"
        type="text"
        :class="{invalid: v$.title.$errors.length}"
      />
      <label :class="{active: title !== ''}">Название</label>
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.title.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <div v-if="showRadio">
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
    </div>

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
    <div>{{ error }} {{ serverError }}</div>
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
      type: '',
      success: false,
      error: this.$store.state.category.categoryError,
      serverError: null,
    }
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
          await this.$store.dispatch('createCategory', {
            title: this.title,
            type: this.type,
            limit: parseInt(this.limit.replace(/\D/g, '')),
          })
          await this.$store.dispatch('fetchCategories')
          this.title = ''
          this.limit = ''
          this.type = ''
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
  computed: {
    showRadio() {
      return this.title !== ''
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
    }
  },
}
</script>

<style scoped>
.category-form {
  position: relative;
}
</style>
