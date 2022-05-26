<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>

      <div class="currency-line">
        <div v-if="bill !== undefined">{{ billCount }}</div>
        <div class="small-spinner" v-else>
          <LoopingRhombusesSpinner :size="50" :color="'#fff'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { LoopingRhombusesSpinner } from 'epic-spinners'
export default {
  name: 'Bill',
  components: {LoopingRhombusesSpinner},
  computed: {
    billCount() {
      return this.$store.state.info.info.bill.toLocaleString('ru-RU') + ' ₽'
    },
    bill() {
      return this.$store.state.info.info.bill
    },
  },
}
</script>

<style scoped>
    .currency-line {
        justify-content: center;
    }
</style>
