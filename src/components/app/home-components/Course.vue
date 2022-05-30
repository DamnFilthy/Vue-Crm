<template>
    <div class="card orange darken-3 bill-card">
        <div class="card-content white-text">
            <div class="card-header">
                <span class="card-title">Курс валют</span>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Валюта</th>
                    <th>Курс</th>
                    <th>Дата</th>
                </tr>
                </thead>

                <tbody v-if="cash !== 0">
                <tr v-for="(key, value) in cash" :key="key">
                    <td>{{key}}</td>
                    <td>{{value}}</td>
                    <td class="td-date">{{dateFormat}}</td>
                </tr>
                </tbody>
                <tbody v-else>
                <fulfilling-square-spinner
                        :animation-duration="4000"
                        :size="50"
                        color="#fff"
                />
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import { FulfillingSquareSpinner } from 'epic-spinners'
    export default {
        name: "Course",
        components: {FulfillingSquareSpinner},
        computed: {
            cash() {
                if (this.$store.state.info.cash !== null) {
                    return this.$store.state.info.cash.rates
                } else {
                    return 0
                }
            },
            dateFormat(){
                let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                let thisDate = new Date(this.$store.state.info.cash.date)
                return thisDate.toLocaleDateString("ru-RU", options)
            }
        },
    }
</script>

<style scoped>
.td-date {
    font-size: 12px;
}
</style>
