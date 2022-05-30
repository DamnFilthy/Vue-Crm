<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в Рублях</span>
      <div class="currency-line">
        <div v-if="bill !== undefined">{{ billCount }}</div>
        <div class="small-spinner" v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#fff'" />
        </div>
      </div>

      <div class="cash-row">
        <div v-if="bill !== undefined && cash !== 0">
          <span>USD: </span>
          <span>{{ usdCash }}</span>
        </div>
        <div class="small-spinner" v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#fff'" />
        </div>
      </div>

      <div class="cash-row">
        <div v-if="bill !== undefined && cash !== 0">
          <span>EUR: </span>
          <span>{{ eurCash }}</span>
        </div>
        <div class="small-spinner" v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#fff'" />
        </div>
      </div>

      <div class="cash-row">
        <div v-if="bill !== undefined && cash !== 0">
          <span>CNY: </span>
          <span>{{ cnyCash }}</span>
        </div>
        <div class="small-spinner" v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#fff'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LoopingRhombusesSpinner} from 'epic-spinners'
export default {
  name: 'Bill',
  components: {LoopingRhombusesSpinner},
  computed: {
    bill() {
      return this.$store.getters.info.bill
    },
    billCount() {
      return this.$store.state.info.info.bill.toLocaleString('ru-RU') + ' ₽'
    },
    cash() {
      if (this.$store.state.info.cash !== null) {
        return this.$store.state.info.cash.rates
      } else {
        return 0
      }
    },
    usdCash() {
      return Number(this.cash.USD * this.bill).toFixed(2) + ' $'
    },
    eurCash() {
      return Number(this.cash.EUR * this.bill).toFixed(2) + ' €'
    },
    cnyCash() {
      return Number(this.cash.CNY * this.bill).toFixed(2) + ' ¥'
    },
  },
}
</script>

<style scoped>
.currency-line {
  justify-content: center;
}
.cash-row {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
}
</style>
