<template>
  <div class="fixed-action-btn">
    <router-link class="btn-floating btn-large blue" :to="{name: 'Record'}">
      <i class="large material-icons">add</i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'RecordLink',
}
</script>
