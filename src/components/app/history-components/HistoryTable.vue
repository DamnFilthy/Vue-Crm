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
        <td>{{ row.amount.toLocaleString('ru-RU') }} ₽</td>
        <td>
          {{
            new Date(row.date).toLocaleString(['ru-RU'], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}
        </td>
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
          <Popper closeDelay="300" placement="right" hover="true" content="Посмотреть запись">
            <button
              @click.prevent="
                this.$router.push({path: `/detail-record/${row.id}`})
              "
              class="btn-small btn"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </Popper>
        </td>
      </tr>
    </tbody>
    <tbody v-else-if="recordList === null">
      <AtomSpinner :size="150" :color="'#ffa726'" />
    </tbody>
    <tbody v-else-if="recordList === ''">
      У вас пока нет ни одной записи..
    </tbody>
  </table>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
import Popper from 'vue3-popper'
export default {
  name: 'HistoryTable',
  components: {AtomSpinner, Popper},
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
