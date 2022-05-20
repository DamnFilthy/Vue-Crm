<template>
    <span>{{dateFilter}}</span>
</template>

<script>
    export default {
        name: "Data",
        data(){
            return{
                date: new Date(),
                interval: null,
            }
        },
        mounted(){
            this.interval = setInterval(()=>{
                this.date = new Date()
            }, 1000)
        },
        beforeUnmount() {
            clearInterval(this.interval)
        },
        computed:{
            dateFilter() {
                const options = {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }
                return new Intl.DateTimeFormat('ru-RU', options)
                    .format(new Date(this.date))
            }
        },
    }
</script>

<style scoped>

</style>
