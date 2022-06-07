<template>
  <div v-if="loading">
    <AtomSpinner :size="150" :color="'#ffa726'" />
  </div>
  <div v-else>
    <div class="page-title">
      <h3>Планирование</h3>
      <div>
        <div>План по доходу: {{ totalIncome.toLocaleString('ru-RU') }} ₽</div>
        <div>
          Лимит по расходу: {{ totalOutcome.toLocaleString('ru-RU') }} ₽
        </div>
      </div>
    </div>
    <div>
      <div>
        Всего заработал: {{ totalInfoIncomeSum.toLocaleString('ru-RU') }} ₽
      </div>
      <div>
        Всего потратил: {{ totalInfoOutcomeSum.toLocaleString('ru-RU') }} ₽
      </div>
    </div>
    <section>
      <div>Траты</div>
      <div v-for="info in totalInfoOutcome" :key="info.id">
        <div v-if="info.type === 'outcome'">
          <Popper
            closeDelay="300"
            placement="right"
            :hover="true"
            :content="info.type === 'income' ? 'Заработал' : 'Потратил'"
          >
            <p>
              <strong>{{ info.title }}:</strong>
              {{ info.spend.toLocaleString('ru-RU') }} ₽ из
              {{ info.limit.toLocaleString('ru-RU') }} ₽
            </p>
          </Popper>
          <div class="progress">
            <div
              :class="info.progressColor"
              class="determinate"
              :style="{width: info.progressPercent + '%'}"
            ></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div>Доходы</div>
      <div v-for="info in totalInfoIncome" :key="info.id">
        <div v-if="info.type === 'income'">
          <Popper
            closeDelay="300"
            placement="right"
            :hover="true"
            :content="info.type === 'income' ? 'Заработал' : 'Потратил'"
          >
            <p>
              <strong>{{ info.title }}:</strong>
              {{ info.spend.toLocaleString('ru-RU') }} ₽ из
              {{ info.limit.toLocaleString('ru-RU') }} ₽
            </p>
          </Popper>
          <div class="progress">
            <div
              :class="info.progressColor"
              class="determinate"
              :style="{width: info.progressPercent + '%'}"
            ></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
import Popper from 'vue3-popper'
export default {
  name: 'Planning',
  components: {
    AtomSpinner,
    Popper,
  },
  data() {
    return {
      loading: this.totalInfo === null,
      categories: this.categoriesList,
      records: this.recordsList,
    }
  },
  created() {
    this.$store.dispatch('fetchCategories')
    this.$store.dispatch('fetchRecords')
  },
  computed: {
    categoriesList() {
      return this.$store.state.category.categories
    },
    recordsList() {
      return this.$store.state.record.records
    },
    totalIncome() {
      let totalSum = 0
      if (this.categoriesList !== null) {
        for (let i = 0; i < this.categoriesList.length; i++) {
          if (this.categoriesList[i].type === 'income') {
            totalSum += this.categoriesList[i].limit
          }
        }
      }
      return totalSum
    },
    totalOutcome() {
      let totalSum = 0
      if (this.categoriesList !== null) {
        for (let i = 0; i < this.categoriesList.length; i++) {
          if (this.categoriesList[i].type === 'outcome') {
            totalSum += this.categoriesList[i].limit
          }
        }
      }
      return totalSum
    },
    totalInfoOutcome() {
      if (this.categoriesList !== null && this.recordsList !== null) {
        return this.categoriesList.map((cat) => {
          const spend = this.recordsList
            .filter((r) => r.categoryID === cat.id)
            .filter((r) => r.type === 'outcome')
            .reduce((total, record) => {
              return (total += +record.amount)
            }, 0)
          const percent = (100 * spend) / cat.limit
          const progressPercent = percent > 100 ? 100 : percent
          const progressColor =
            percent < 40 ? 'green' : percent < 80 ? 'yellow' : 'red'

          return {...cat, spend, progressPercent, progressColor}
        })
      } else {
        return null
      }
    },
    totalInfoIncome() {
      if (this.categoriesList !== null && this.recordsList !== null) {
        return this.categoriesList.map((cat) => {
          const spend = this.recordsList
            .filter((r) => r.categoryID === cat.id)
            .filter((r) => r.type === 'income')
            .reduce((total, record) => {
              return (total += +record.amount)
            }, 0)
          const percent = (100 * spend) / cat.limit
          const progressPercent = percent > 100 ? 100 : percent
          const progressColor =
            percent < 40 ? 'gray' : percent < 80 ? 'yellow' : 'green'

          return {...cat, spend, progressPercent, progressColor}
        })
      } else {
        return null
      }
    },
    totalInfoOutcomeSum() {
      let outcomeSum = 0
      for (let i = 0; i < this.totalInfoOutcome.length; i++) {
        if (this.totalInfoOutcome[i].type === 'outcome') {
          outcomeSum += this.totalInfoOutcome[i].spend
        }
        console.log(this.totalInfoOutcome[i])
      }
      return outcomeSum
    },
    totalInfoIncomeSum() {
      let incomeSum = 0
      for (let i = 0; i < this.totalInfoIncome.length; i++) {
        if (this.totalInfoIncome[i].type === 'income') {
          incomeSum += this.totalInfoIncome[i].spend
        }
        console.log(this.totalInfoIncome[i])
      }
      return incomeSum
    },
  },
}
</script>

<style scoped></style>
