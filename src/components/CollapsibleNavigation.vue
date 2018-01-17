<template>
  <div class="header-nav" :class="{ collapsed: collapsed }">
    <div class="container container-flex">
      <ul class="navbar">
        <router-link
          v-for="item in items"
          :to="{ path: item.path }"
          :key="item.id"
          tag="li"
          class="item"
          active-class="selected">
          <div class="item-icon">
            <i class="material-icons">{{ item.icon }}</i>
          </div>
          <div class="item-text">
            <span class="text">{{ item.title }}</span>
          </div>
        </router-link>
      </ul>
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
      items: [
        {
          icon: 'restaurant_menu',
          title: 'MENUS',
          path: '/headpage/menus'
        },
        {
          icon: 'call',
          title: 'CONTACT',
          path: '/headpage/contact'
        },
        {
          icon: 'question_answer',
          title: 'FAQ',
          path: '/headpage/faq'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
$background-color-extended = #9eb2ff
$background-color-collapsed = #585858
$transition = all ease 600ms
$item-selected-color = #daff25

.spacer
  flex-grow: 1

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
    .item
      display: inline-block
      cursor: pointer
      > div
        text-align: center
        color: white
      &.selected > div
        color: $item-selected-color
      &:hover > div
        color: $item-selected-color
        opacity: 0.8
  .container-flex
    display: flex
    justify-content: center
  &.collapsed
    height: 70px
    background-color: $background-color-collapsed
</style>
