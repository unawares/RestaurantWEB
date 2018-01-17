<template>
  <div class="category">
    <div class="container">
      <div class="bar">
        <div class="back-button">
          <i class="material-icons">arrow_back</i>
          <router-link :to="{ name: 'Categories' }">BACK</router-link>
        </div>
      </div>
      <div class="container-masonry">
        <div
          v-for="food in foods"
          :key="food.id"
          class="item">
          <food-item
            :name="food.name"
            :images="food.images"
            :price="food.price"
          ></food-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FoodItem from '@/components/FoodItem'
import axios from 'axios'

var axiosInstance = axios.create({
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken'
})

export default {
  data () {
    return {
      foods: []
    }
  },
  components: {
    FoodItem
  },
  mounted () {
    let slug = this.$router.history.current.params.slug
    axiosInstance.get('/api/food/filtered/' + slug + '/').then((response) => {
      for (let food of response.data) {
        for (let image of food.images) {
          if (image.image) {
            image.image = image.image.replace(/:8080/, ':8000')
          }
        }
      }
      this.foods = response.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.category
  min-height: 100vh
  .bar
    height: 100px
    display: flex
    align-items: center
    .back-button
      cursor: pointer
      display: flex
      align-items: center
      > *
        text-decoration: none
        font-size: 22px
        color: #585858
      &:hover
        > *
          opacity: 0.7
  .container-masonry
    position: relative
    -moz-column-width: 16rem
    -webkit-column-width: 16rem
    -moz-column-gap: 20px
    -webkit-column-gap: 20px
    .item
      position: relative
      width: fill
      margin-bottom: 20px
      display: inline-block
</style>
