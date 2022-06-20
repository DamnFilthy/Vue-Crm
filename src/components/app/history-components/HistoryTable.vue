<template>
    <ChartBlock
        v-if="this.categories !== null && this.recordList !== null"
        :category-list="this.categories"
        :record-list="this.recordList"
    />
    <table v-if="recordsToShow !== null">
        <tbody>
            <tr>
                <td>№</td>
                <td>Сумма</td>
                <td>Дата</td>
                <td>Категория</td>
                <td>Тип</td>
                <td>Открыть</td>
            </tr>
            <tr v-for="row in this.recordsToShow" :key="row.id">
                <td>{{ row.number + 1 }}</td>
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
                        :class="{
                            red: row.type === 'outcome',
                            green: row.type === 'income',
                        }"
                    >
                        <span v-if="row.type === 'outcome'">Расход</span>
                        <span v-if="row.type === 'income'">Доход</span>
                    </span>
                </td>
                <td>
                    <Popper
                        closeDelay="300"
                        placement="right"
                        :hover="true"
                        content="Посмотреть запись"
                    >
                        <button
                            @click.prevent="
                                this.$router.push({
                                    path: `/detail-record/${row.id}`,
                                })
                            "
                            class="btn-small btn"
                        >
                            <i class="material-icons">open_in_new</i>
                        </button>
                    </Popper>
                </td>
            </tr>
        </tbody>
    </table>
    <AtomSpinner
        v-else-if="recordList === null"
        :size="150"
        :color="'#ffa726'"
    />
    <div v-else-if="recordList === ''">У вас пока нет ни одной записи..</div>
    <div
        v-if="recordList !== null && shownPages.length > 1"
        class="account-bonus__pagination"
    >
        <div class="mr-10" v-show="currentPage > 1">
            <a href="#" @click.prevent="getPage(1), startPage()">Начало </a> |
            <a
                href="#"
                @click.prevent="getPage(thisPage - 1), checkPage(thisPage)"
            >
                Пред.</a
            >
        </div>
        <div class="pagination-links">
            <div class="mr-10" v-for="(page, index) in shownPages" :key="index">
                <a
                    href="#"
                    @click.prevent="getPage(page), checkPage(page)"
                    :class="{active: page === currentPage}"
                    >{{ page }}</a
                >
            </div>
        </div>
        <div v-show="currentPage < countPages">
            |
            <a
                href="#"
                @click.prevent="getPage(thisPage + 1), checkPage(thisPage)"
            >
                След.
            </a>
            |
            <a href="#" @click.prevent="getPage(countPages), endPage()">
                Конец
            </a>
        </div>
    </div>
</template>
<script>
import {AtomSpinner} from 'epic-spinners'
import Popper from 'vue3-popper'
import ChartBlock from './ChartBlock'
export default {
    name: 'HistoryTable',
    components: {AtomSpinner, Popper, ChartBlock},
    data() {
        return {
            currentPage: +this.$route.query.page || 1,
            start: 0,
            finish: 5,
            countToShowRecords: 4,
        }
    },
    async created() {
        await this.$store.dispatch('fetchCategories')
        await this.$store.dispatch('fetchRecords')
    },
    computed: {
        categories() {
            return this.$store.state.category.categories
        },
        recordList() {
            if (this.$store.state.record.records !== null) {
                for (const [
                    index,
                    item,
                ] of this.$store.state.record.records.entries()) {
                    item['number'] = index
                }
                return this.$store.state.record.records
            } else {
                return null
            }
        },
        recordsToShow() {
            if (this.recordList !== null) {
                return this.recordList.slice(
                    this.countToShowRecords * (this.currentPage - 1),
                    this.countToShowRecords * (this.currentPage - 1) +
                        this.countToShowRecords
                )
            } else {
                return null
            }
        },
        countPages() {
            if (this.recordList !== null) {
                return Math.ceil(
                    this.recordList.length / this.countToShowRecords
                )
            } else {
                return null
            }
        },
        shownPages() {
            let arr = []
            for (let i = 0; i < this.countPages; i++) {
                arr.push(i + 1)
            }
            return arr.slice(this.start, this.finish)
        },
        thisPage() {
            return this.currentPage
        },
    },
    methods: {
        getPage(page) {
            this.currentPage = page
            this.$router.push(`${this.$route.path}?page=${page}`)
        },
        startPage() {
            this.finish = 5
            this.start = 0
        },
        endPage() {
            this.finish = this.countPages
            this.start = this.countPages - 5
        },
        checkPage(page) {
            // forward
            if (page === this.shownPages[this.shownPages.length - 1]) {
                this.start = page - 4
                this.finish = page + 1
            }
            // backward
            if (page === this.shownPages[0]) {
                this.start = page - 2
                this.finish = page + 4
                if (this.start < 0) {
                    this.start = 0
                }
            }
        },
    },
}
</script>

<style scope lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200;300;400;500;600;700&display=swap');
:root {
    --popper-theme-background-color: #ffa726;
    --popper-theme-padding: 10px 20px;
    --popper-theme-border-radius: 20px;
}
.pagination__wrapper {
    display: flex;
}
.page {
    margin-top: 30px;
    margin-right: 30px;
    cursor: pointer;
}

.account-bonus__pagination {
    user-select: none;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    a {
        text-decoration: none;
        position: relative;
        font-family: 'Oswald', sans-serif;
        font-size: 18px;
        color: #381d1d;
        font-weight: 400;
        &::after {
            display: block;
            position: absolute;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #000000;
            content: '';
            transition: width 0.3s ease-out;
        }
        &:hover::after {
            width: 100%;
        }
        &.active {
            color: orange;
            &:after {
                width: 100%;
            }
        }
    }
}
.pagination-links {
    display: flex;
}
.mr-10 {
    margin-right: 10px;
}
@media (max-width: 534px){
    .bar{
        width: 400px !important;
        margin: 0 auto 30px auto !important;
    }
}
@media (max-width: 425px){
    .bar{
        width: 300px !important;
        margin: 0 auto 30px auto !important;
    }
}
</style>
