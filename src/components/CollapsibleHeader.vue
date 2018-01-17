<template>
  <div class="collapsible-header" :class="{ collapsed: collapsed }">
    <div class="container-start-page">
      <div class="container-wrapper">
        <div class="spacer" />
        <div class="logo">
          <img src="@/assets/logo.svg" />
        </div>
        <div class="spacer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleHeader',
  props: [
    'collapsed'
  ],
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
$background-color-extended = #9eb2ff
$background-color-collapsed = #585858
$logo-width-extended = 400px
$logo-width-collapsed = 300px
$header-collapsed-height = 360px
$transition = all ease 600ms
$item-selected-color = #daff25

.spacer
  flex-grow: 1

.collapsible-header
  transition: $transition
  background-color: $background-color-extended
  width: 100%
  height: 100vh
  min-height: 550px
  .container-start-page
    height: 100%
    display: flex
    justify-content: center
    .container-wrapper
      display: flex
      flex-direction: column
  .logo
    transition: $transition
    width: $logo-width-extended
  .header-nav
    position: relative
    transition: $transition
    overflow: hidden
    width: 100%
    height: 0
    background-color: $background-color-extended
    .navbar
      list-style: none
      padding: 0
      margin: 0
      display: flex
      justify-content: space-around
      width: 500px
      > .item
        display: inline-block
        cursor: pointer
        > div
          text-align: center
          color: white
        &.selected > div
          color: $item-selected-color
    .container-flex
      display: flex
      justify-content: center
  &.collapsed
    height: $header-collapsed-height
    min-height: 0
    background-color: $background-color-collapsed
    .logo
      width: $logo-width-collapsed
    .header-nav
      height: 70px
      background-color: $background-color-collapsed
</style>
