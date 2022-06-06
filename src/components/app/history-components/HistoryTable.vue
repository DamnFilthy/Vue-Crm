<template>
  <table>
    <thead>
      <tr>
        <th>№</th>
        <th>Сумма</th>
        <th>Дата</th>
        <th>Категория</th>
        <th>Тип</th>
        <th>Открыть</th>
      </tr>
    </thead>

    <tbody v-if="recordList">
      <tr v-for="(row, index) in this.recordList" :key="row.id">
        <td>{{ index + 1 }}</td>
        <td>{{ row.amount }}</td>
        <td>{{ row.date }}</td>
        <td>{{ row.categoryName }}</td>
        <td>
          <span
            class="white-text badge"
            :class="{red: row.type === 'outcome', green: row.type === 'income'}"
          >
            <span v-if="row.type === 'outcome'">Расход</span>
            <span v-if="row.type === 'income'">Доход</span>
          </span>
        </td>
        <td>
          <button class="btn-small btn">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
    <tbody v-else>
      <AtomSpinner :size="150" :color="'#ffa726'" />
    </tbody>
  </table>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
  name: 'HistoryTable',
  components: {AtomSpinner},
  async created() {
    await this.$store.dispatch('fetchRecords')
  },
  computed: {
    recordList() {
      return this.$store.state.record.records
    },
  },
}
</script>

<style scoped></style>
