<template>
  <Bar class="bar" :chart-data="chartData" />
</template>

<script>
import {Bar} from 'vue-chartjs'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
)
export default {
  name: 'ChartBlock',
  components: {Bar},
  props: {
    categoryList: {
      type: Array,
      required: true,
    },
    recordList: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartData: {
        labels: this.categoryList.map((item) => {
          if (item.type === 'outcome') {
            return item.title
          }
        }),
        datasets: [
          {
            label: 'Расходы по категориям',
            backgroundColor: ['#db6767', '#1c24cb', '#e5af0e', '#0cf168'],
            data: this.categoryList.map((category) => {
              return this.recordList.reduce((total, record) => {
                if (
                  record.categoryID === category.id &&
                  record.type === 'outcome'
                ) {
                  total += +record.amount
                }
                return total
              }, 0)
            }),
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.bar {
  width: 500px;
  margin: 0 auto 30px auto;
}
</style>
