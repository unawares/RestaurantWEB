<template>
  <div id="app" @mousemove="onMouseMove">
    <router-view :mouseEvent="mouseEvent"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      mouseEvent: undefined
    }
  },
  methods: {
    onMouseMove (evt) {
      this.mouseEvent = evt
    }
  }
}
</script>

<style lang="stylus">
body
  padding: 0
  margin: 0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale

.container
  margin: 0 auto 0 auto
  width: 83%
  max-width: 1260px
</style>
