<template>
  <div class="menus">
    <router-view :mouseEvent="mouseEvent"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Menus',
  props: [
    'mouseEvent'
  ],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped="">
</style>
