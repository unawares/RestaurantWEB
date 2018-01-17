<template>
  <div class="food-item">
    <div class="overlay-price">
      <div class="food-price">
        <span class="text">{{ price + '$' }}</span>
      </div>
    </div>
    <div class="media">
      <img v-if="images.length > 0 && images[0].image !== null" class="image" :src="'http://localhost:8000' + images[0].image">
      <img v-else class="image" src="https://blog.stylingandroid.com/wp-content/themes/lontano-pro/images/no-image-slide.png">
    </div>
    <div class="overlay-color"></div>
    <div class="overlay-border"></div>
    <div class="overlay-title">
      <div class="food-name">
        <span class="text">{{ name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'name',
    'images',
    'price'
  ],
  data () {
    return {

    }
  }
}
</script>

<style lang="stylus" scoped>
.food-item
  overflow: hidden
  position: relative
  width: 100%
  height: 100%
  cursor: pointer
  > div
    box-sizing: border-box
  > div:not(.media)
    width: 100%
    height: 100%
    position: absolute
    top: 0
    left: 0
  .media
    overflow: hidden
    background-color: #585858
    .image
      margin-bottom: 50px
      width: 100%
      transition: all ease 500ms
  .overlay-color
    transition: all ease 500ms
    background-color: #585858
    opacity: 0.2
  .overlay-border
    transition: all ease 500ms
    border: 0px solid #585858
  .overlay-title
    .food-name
      transition: all ease 500ms
      padding: 16px 16px
      display: flex
      justify-content: center
      align-items: center
      width: fill
      position: absolute
      left: 0
      bottom: 0
      background-color: #585858
      .text
        font-weight: 400
        font-size: 20px
        color: white
  .overlay-price
    .food-price
      z-index: 1
      transition: all ease 360ms
      padding: 16px 16px
      display: flex
      justify-content: center
      align-items: center
      width: fill
      position: absolute
      left: 0
      bottom: -80px
      background-color: #f7f7f7
      .text
        font-weight: 500
        font-size: 20px
        color: #ff4370
  &:hover
    .media
      .image
        transform: scale(1.1, 1.1)
    .overlay-title
      .food-name
        background-color: inherit
        bottom: 60px
    .overlay-border
      border: 12px solid #585858
    .overlay-color
      opacity: 0
    .overlay-price
      .food-price
        bottom: 0
</style>
