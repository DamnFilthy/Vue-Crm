<template>
  <div v-if="loading">
    <AtomSpinner :size="150" :color="'#ffa726'" />
  </div>
  <div v-else>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ totalLimit }}</h4>
    </div>
    <pre>
      {{totalInfoOutcome}}
      {{totalInfoIncome}}
    </pre>
    <section>
      <div>Траты</div>
      <div v-for="info in totalInfoOutcome" :key="info.id">
        <Popper
          closeDelay="300"
          placement="right"
          :hover="true"
          :content="info.spend ? 'Потрачено' : 'Заработал'"
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
    </section>
    <section>
      <div>Доходы</div>
      <div v-for="info in totalInfoIncome" :key="info.id">
        <Popper
                closeDelay="300"
                placement="right"
                :hover="true"
                :content="info.spend ? 'Потрачено' : 'Заработал'"
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
    totalLimit() {
      let totalSum = 0
      if (this.categoriesList !== null) {
        for (let i = 0; i < this.categoriesList.length; i++) {
          totalSum += this.categoriesList[i].limit
        }
        return totalSum
      }
      return 0
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

          return {...cat, spend, progressPercent, progressColor, type: 'outcome'}
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

          return {...cat, spend, progressPercent, progressColor, type: 'income'}
        })
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped></style>
