<template>
  <div v-if="loading">
    <AtomSpinner :size="150" :color="'#ffa726'" />
  </div>
  <div v-else>
    <div class="page-title">
      <div class="mobile-flex">
        <h3>Планирование</h3>
        <div v-if="totalIncome !== null && totalOutcome !== null">
          <div>План по доходу: {{ totalIncome.toLocaleString('ru-RU') }} ₽</div>
          <div>
            Лимит по расходу: {{ totalOutcome.toLocaleString('ru-RU') }} ₽
          </div>
        </div>
        <div v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#68de4b'" />
        </div>
      </div>
    </div>
    <div
      class="mb30"
      v-if="totalInfoIncomeSum !== null && totalInfoOutcomeSum !== null"
    >
      <div>
        Всего заработал: {{ totalInfoIncomeSum.toLocaleString('ru-RU') }} ₽
      </div>
      <div>
        Всего потратил: {{ totalInfoOutcomeSum.toLocaleString('ru-RU') }} ₽
      </div>
    </div>
    <div v-else>
      <LoopingRhombusesSpinner :size="50" :color="'#68de4b'" />
    </div>
    <div
      :class="{'collapse-btn-active': this.showOutcome}"
      class="page-title collapse-btn"
      @click="this.showOutcome = !this.showOutcome"
    >
      Траты
    </div>
    <div
      class="collapse-block"
      :class="{'collapse-block-open': this.showOutcome}"
    >
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
    </div>

    <div
      :class="{'collapse-btn-active': this.showIncome}"
      class="page-title collapse-btn"
      @click="this.showIncome = !showIncome"
    >
      Доходы
    </div>
    <div
      class="collapse-block"
      :class="{'collapse-block-open': this.showIncome}"
    >
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
    </div>
  </div>
</template>

<script>
import {LoopingRhombusesSpinner} from 'epic-spinners'
import {AtomSpinner} from 'epic-spinners'
import Popper from 'vue3-popper'
import firebase from 'firebase/compat'
export default {
  name: 'Planning',
  components: {
    AtomSpinner,
    LoopingRhombusesSpinner,
    Popper,
  },
  data() {
    return {
      showOutcome: false,
      showIncome: false,
      loading: this.categoriesList === null,
      categories: this.categoriesList,
      records: this.recordsList,
    }
  },
  async created() {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('fetchCategories')
        this.$store.dispatch('fetchRecords')
      }
    })
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
        return totalSum
      } else {
        return null
      }
    },
    totalOutcome() {
      let totalSum = 0
      if (this.categoriesList !== null) {
        for (let i = 0; i < this.categoriesList.length; i++) {
          if (this.categoriesList[i].type === 'outcome') {
            totalSum += this.categoriesList[i].limit
          }
        }
        return totalSum
      } else {
        return null
      }
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
      if (this.totalInfoOutcome !== null) {
        for (let i = 0; i < this.totalInfoOutcome.length; i++) {
          if (this.totalInfoOutcome[i].type === 'outcome') {
            outcomeSum += this.totalInfoOutcome[i].spend
          }
        }
        return outcomeSum
      } else {
        return null
      }
    },
    totalInfoIncomeSum() {
      let incomeSum = 0
      if (this.totalInfoIncome !== null) {
        for (let i = 0; i < this.totalInfoIncome.length; i++) {
          if (this.totalInfoIncome[i].type === 'income') {
            incomeSum += this.totalInfoIncome[i].spend
          }
        }
        return incomeSum
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped lang="scss">
.mb30 {
  margin-bottom: 30px;
}
.collapse-block {
  max-height: 0;
  transition: .7s ease-in-out;
  opacity: 0;
  visibility: hidden;
  overflow-y: hidden;
  padding-right: 30px;
}
.collapse-block-open {
  overflow-y: auto;
  max-height: 300px;
  opacity: 1;
  visibility: visible;
  margin-bottom: 30px;
  &::-webkit-scrollbar {
    padding-left: 30px;
    width: 4px;
    background-color: rgba(181, 181, 232, 0.75);
  }
  &::-webkit-scrollbar-thumb {
    background: #3d2d84;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: 5px 5px 5px -5px rgba(34, 60, 80, 0.2) inset;
    background-color: #f9f9fd;
  }
}
.collapse-btn {
  transition: 0.5s ease-in-out;
  cursor: pointer;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
  &:hover {
    color: green;
    border-bottom: 1px solid green;
  }
}
.collapse-btn-active {
  color: #40cd40;
}
  @media (max-width: 600px){
    .mobile-flex{
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
</style>
