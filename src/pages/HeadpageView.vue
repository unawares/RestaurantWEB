<template>
  <div class="headpage" v-on:click="collapsed = true">
    <collapsible-header :collapsed="collapsed"></collapsible-header>
    <collapsible-navigation :collapsed="collapsed"></collapsible-navigation>
    <transition name="fade">
      <div v-if="collapsed">
        <router-view :mouseEvent="mouseEvent"/>
        <div style="background-color: #9eb2ff; height: 250px"></div>
        <div style="background-color: #585858; height: 200px"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import CollapsibleHeader from '@/components/CollapsibleHeader'
import CollapsibleNavigation from '@/components/CollapsibleNavigation'

export default {
  name: 'Headpage',
  props: [
    'mouseEvent'
  ],
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    CollapsibleHeader,
    CollapsibleNavigation
  }
}
</script>

<style lang="stylus">
.fade-enter-active, .fade-leave-active
  transition: opacity 600ms

.fade-enter, .fade-leave-to
  opacity: 0
</style>
