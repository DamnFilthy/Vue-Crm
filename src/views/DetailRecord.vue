<template>
  <div v-if="recordById" class="breadcrumb-wrap">
    <router-link :to="{name: 'History'}" class="breadcrumb"
      >История</router-link
    >
    <a class="breadcrumb">
      <span
        class="white-text badge"
        :class="{
          red: recordById[0].type === 'outcome',
          green: recordById[0].type === 'income',
        }"
      >
        <span v-if="recordById[0].type === 'outcome'">Расход</span>
        <span v-if="recordById[0].type === 'income'">Доход</span>
      </span>
    </a>
  </div>
  <div class="row" v-if="recordById">
    <div class="col s12 m6">
      <div class="card red">
        <div
          :class="{
            red: recordById[0].type === 'outcome',
            green: recordById[0].type === 'income',
          }"
          class="card-content white-text"
        >
          <p>
            Описание:
            <span>{{ recordById[0].description }}</span>
          </p>
          <p>
            Сумма:
            <span>{{ recordById[0].amount }}</span>
          </p>
          <p>
            Категория:
            <span>{{ recordById[0].categoryName }}</span>
          </p>

          <small>{{
            new Date(recordById[0].date).toLocaleString(['ru-RU'], {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          }}</small>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <AtomSpinner :size="150" :color="'#ffa726'" />
  </div>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
export default {
  name: 'DetailRecord',
  components: {AtomSpinner},
  async created() {
    await this.$store.dispatch('fetchRecords')
  },
  computed: {
    recordById() {
      if (this.$store.state.record.records) {
        return this.$store.state.record.records.filter(
          (item) => item.id === this.$route.params.id
        )
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped></style>
