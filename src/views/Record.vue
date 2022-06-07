<template>
  <pre>
    {{selectedCategory}}
  </pre>
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
      <small
        class="helper-text invalid"
        v-for="(error, index) of v$.selectedCategory.$errors"
        :key="index"
        >{{ error.$message }}</small
      >
    </div>
    <p v-if="selectedCategory.type === 'income'">
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
    <p v-if="selectedCategory.type === 'outcome'">
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
    <MessagePopup :flag="success" message="Запись добавлена!" />
    <div v-if="attention">
      <small class="helper-text invalid attention">{{ attention }}</small>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import {
  requiredField,
  validLimit,
  validName,
} from '../helpers/validations/validators'
import MessagePopup from '../components/app/MessagePopup'

export default {
  name: 'Record',
  components: {MessagePopup},
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
      serverError: null,
      attention: null,
      success: false,
    }
  },
  methods: {
    getAttention() {
      this.attention = 'Ваш расход не может привышать остаток по счету!'
    },
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
          if (this.canCreate) {
            await this.$store.dispatch('createRecord', {
              categoryLimit: this.selectedCategory.limit,
              categoryName: this.selectedCategory.title,
              categoryID: this.selectedCategory.id,
              amount: parseInt(this.limit.replace(/\D/g, '')),
              description: this.title,
              type: this.type,
              date: new Date().toJSON(),
            })

            const bill =
              this.type === 'income'
                ? this.bill + parseInt(this.limit.replace(/\D/g, ''))
                : this.bill - parseInt(this.limit.replace(/\D/g, ''))
            await this.$store.dispatch('updateInfo', {bill})

            this.title = ''
            this.limit = ''
            this.selectedCategory = ''
            this.success = true
            this.v$.$reset()
          } else {
            this.getAttention()
          }
        } catch (e) {
          this.serverError = e
          console.log(e)
        }
        setTimeout(() => {
          this.success = false
          this.attention = ''
        }, 2000)
      }
    },
  },
  computed: {
    error() {
      return this.$store.state.category.categoryError
    },
    bill() {
      return this.$store.state.info.info.bill
    },
    categoriesObj() {
      return this.$store.state.category.categories
    },
    canCreate() {
      if (this.type === 'outcome') {
        return (
          this.bill > parseInt(this.limit.replace(/\D/g, '')) ||
          this.bill === parseInt(this.limit.replace(/\D/g, ''))
        )
      }
      return true
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
.attention {
  font-size: 16px !important;
}
form {
  position: relative;
}
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
