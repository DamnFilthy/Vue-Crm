<template>
  <div class="page-title">
    <h3>История записей</h3>
  </div>

  <div class="history-chart">
    <canvas></canvas>
  </div>
  <HistoryTable />
</template>

<script>
import HistoryTable from '../components/app/history-components/HistoryTable'

export default {
  name: 'History',
  components: {HistoryTable},
}
</script>

<style scoped></style>
