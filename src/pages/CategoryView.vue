<template>
  <div class="category">
    <div class="container">
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
          image.image = image.image.replace(/:8080/, ':8000')
        }
      }
      this.foods = response.data
    })
  }
}
</script>

<style lang="stylus" scoped>
.container-masonry
  position: relative
  -moz-column-width: 16rem
  -webkit-column-width: 16rem
  -moz-column-gap: 20px
  -webkit-column-gap: 20px
  .item
    position: relative
    width: fill
    margin-top: 20px
    display: inline-block

.category
  min-height: 100vh
</style>
