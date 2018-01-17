<template>
  <div class="categories">
    <div class="container container-grid">
      <router-link
        v-for="category in categories"
        :to="{ name: 'Category', params: { slug: category.slug } }"
        :key="category.id"
        class="item">
        <menu-item
          :title="category.name"
          :url="category.image"
          :mouseEvent="mouseEvent"
          :distance="400"
          :maxDegree="20"
          :animation="animation">
        </menu-item>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import MenuItem from '@/components/MenuItem'

var axiosInstance = axios.create({
  xsrfHeaderName: 'X-CSRFTOKEN',
  xsrfCookieName: 'csrftoken'
})

export default {
  name: 'Categories',
  props: [
    'mouseEvent'
  ],
  data () {
    return {
      animation: true,
      categories: []
    }
  },
  components: {
    MenuItem
  },
  mounted () {
    axiosInstance.get('/api/food/categories/').then((response) => {
      for (let category of response.data) {
        category.image = category.image.replace(/:8080/, ':8000')
      }
      this.categories = response.data
    })
  }
}
</script>

<style lang="stylus" scoped="">
$menu-height = 360px
$menu-width = 250px

.categories
  background-color: #f5f5f5
  min-height: 100vh
  .container-grid
    padding: 60px 0
    display: grid
    grid-gap: 30px
    grid-template-columns: repeat(auto-fill, minmax($menu-width, 1fr))
    grid-auto-rows: $menu-height
    .item
      position: relative
</style>
