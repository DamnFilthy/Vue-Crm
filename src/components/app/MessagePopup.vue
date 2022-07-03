<template>
  <div :class="{shown: this.flag}" class="message-popup">
    {{ this.message }}
  </div>
</template>

<script>
export default {
  name: 'MessagePopup',
  props: ['flag', 'message'],
}
</script>

<style scoped lang="scss">
.message-popup {
  opacity: 0;
  transition: 0.5s ease-in-out;
  position: absolute;
  top: 200px;
  background-color: wheat;
  padding: 15px;
  border-radius: 4px;
}
.shown {
  opacity: 1;
  visibility: visible;
}
</style>
