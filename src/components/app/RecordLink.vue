<template>
  <div class="fixed-action-btn">
    <router-link class="btn-floating btn-large blue fixed-btn-animate" :to="{name: 'Record'}">
            <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'RecordLink',
}
</script>

<style lang="scss" scoped>
    .fixed-btn-animate{
        animation: scaling 3s ease-in-out infinite;
    }
    @keyframes scaling {
        0% {
            transform: scale(1);
            box-shadow: none;
        }
        50% {
            transform: scale(1.1);
            box-shadow: 1px 1px 10px #ff0000;
        }
        100% {
            transform: scale(1);
            box-shadow: none;
        }
    }
</style>
