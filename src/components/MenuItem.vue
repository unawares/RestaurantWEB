<template>
  <div class="menu-item" ref="menuItem">
    <div class="overlay-color" ref="overlayColor"></div>
    <div class="overlay-media" ref="overlayMedia" :style="'background-image: url(' + url + ')'"></div>
    <div class="overlay-filter" ref="overlayFilter"></div>
    <div class="overlay-border" ref="overlayBorder">
      <div class="border"></div>
    </div>
    <div class="overlay-text" ref="overlayText">
      <div class="text-container">
        <div class="text-view">
          <div>
            <span class="text">{{ title.toUpperCase() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

var getDistanceBetween = function (a, b) {
  return Math.sqrt(Math.pow(Math.abs(a.x - b.x), 2) + Math.pow(Math.abs(a.y - b.y), 2))
}

function getScrollOffsets () {
  var doc = document
  var w = window
  var x
  var y
  var docEl

  if (typeof w.pageYOffset === 'number') {
    x = w.pageXOffset
    y = w.pageYOffset
  } else {
    docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')
      ? doc.documentElement : doc.body
    x = docEl.scrollLeft
    y = docEl.scrollTop
  }
  return {x: x, y: y}
}

function getPageOffsets (el) {
  var sOff = getScrollOffsets()
  var left = 0
  var top = 0
  var props

  if (el.getBoundingClientRect) {
    props = el.getBoundingClientRect()
    left = props.left + sOff.x
    top = props.top + sOff.y
  } else { // for older browsers
    do {
      left += el.offsetLeft
      top += el.offsetTop
    } while ((el = el.offsetParent))
  }
  return { x: Math.round(left), y: Math.round(top) }
}

export default {
  props: [
    'mouseEvent',
    'distance',
    'maxDegree',
    'animation',
    'url',
    'title'
  ],
  data () {
    return {
      menuItem: undefined,
      overlayMedia: undefined,
      overlayColor: undefined,
      overlayBorder: undefined,
      overlayText: undefined
    }
  },
  mounted () {
    this.menuItem = this.$refs.menuItem
    this.overlayMedia = this.$refs.overlayMedia
    this.overlayColor = this.$refs.overlayColor
    this.overlayBorder = this.$refs.overlayBorder
    this.overlayText = this.$refs.overlayText
  },
  watch: {
    mouseEvent (evt) {
      if (this.animation) {
        var pointer = {
          x: evt.pageX,
          y: evt.pageY
        }
        var item = getPageOffsets(this.menuItem)
        var itemHeight = this.menuItem.offsetHeight
        var itemWidth = this.menuItem.offsetWidth

        let mouseDistanceFromLeftTop = getDistanceBetween(pointer, {
          x: item.x,
          y: item.y
        })
        let mouseDistanceFromRightTop = getDistanceBetween(pointer, {
          x: item.x + itemWidth,
          y: item.y
        })
        let mouseDistanceFromRightBottom = getDistanceBetween(pointer, {
          x: item.x + itemWidth,
          y: item.y + itemHeight
        })
        let mouseDistanceFromLeftBottom = getDistanceBetween(pointer, {
          x: item.x,
          y: item.y + itemHeight
        })
        let sum = mouseDistanceFromLeftTop + mouseDistanceFromRightTop + mouseDistanceFromLeftBottom + mouseDistanceFromRightBottom
        let leftTopForce = 0.50 - (mouseDistanceFromLeftTop) / sum
        let rightTopForce = 0.50 - (mouseDistanceFromRightTop) / sum
        let rightBottomForce = 0.50 - (mouseDistanceFromRightBottom) / sum
        let leftBottomForce = 0.50 - (mouseDistanceFromLeftBottom) / sum
        let sumOfPercentage = leftTopForce + rightTopForce + leftBottomForce + rightBottomForce
        let xPercentage = (rightTopForce + rightBottomForce) / sumOfPercentage - (leftTopForce + leftBottomForce) / sumOfPercentage
        let yPercentage = (leftTopForce + rightTopForce) / sumOfPercentage - (leftBottomForce + rightBottomForce) / sumOfPercentage
        let xDegree = this.maxDegree * yPercentage
        let yDegree = this.maxDegree * xPercentage
        let xLength = -50 * xPercentage
        let yLength = 50 * yPercentage
        this.menuItem.style.transform = `rotateX(${xDegree}deg) rotateY(${yDegree}deg) translate(${xLength}px, ${yLength}px)`
        this.overlayColor.style.transform = `translate(${xLength}px, ${yLength}px)`
        this.overlayBorder.style.transform = `translate(${-xLength}px, ${-yLength}px)`
        this.overlayText.style.transform = `translate(${-xLength * 1.5}px, ${-yLength * 1.5}px)`
      }
    },

    animation (value) {
      if (!value) {
        this.refreshAnimations()
      }
    }
  },
  methods: {
    refreshAnimations () {
      this.menuItem.style.transform = ''
      this.overlayColor.style.transform = ''
      this.overlayBorder.style.transform = ''
      this.overlayText.style.transform = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.menu-item
  width: 100%
  height: 100%
  position: relative
  box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)
  cursor: pointer
  > div
    position: absolute
    left: 0
    top 0
    width: 100%
    height: 100%
  .overlay-media
    background-repeat: no-repeat
    background-size: cover
    background-position: center center
  .overlay-color
    background-color: black
    opacity: 0.2
  .overlay-border
    position: relative
    display: flex
    justify-content: center
    align-items: center
    > .border
      transition: all ease 500ms
      height: 85%
      width: 85%
      border: white 8px solid
  .overlay-filter
    background-color: black
    opacity: 0.2
  .overlay-text
    .text-container
      height: 100%
      position: relative
      .text-view
        display: flex
        justify-content: center
        width: 100%
        position: absolute
        bottom: 0
        left: 0
        height: 130px
        > div
          padding: 16px
          text-align: center
        > div .text
          line-height: 1em
          font-weight: 800
          color: white
          font-size: 30px
  &:hover
    .overlay-border
      > .border
        border-color: #daff25 !important
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)
    .overlay-text
      .text
        color: #daff25 !important
        text-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)
</style>
