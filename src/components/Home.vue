<template>

  <div class="ui container">
    <div class="ui four column centered stackable grid">
    <div class="ui column" v-for="product in products.data" :key="product.id">
      <div class="ui medium rounded image">
        <div class="ui black large bottom attached label">
          {{ product.name }}
        </div>
        <router-link :to="'/products/' + product.slug">
          <img :src="getProductThumb(product)" alt="">
        </router-link>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import MoltinService from '../services/moltin.js'

export default {
  name: 'home',
  data () {
    return {
      products: {}
    }
  },
  beforeMount () {
    MoltinService.getHomepageProducts().then((response) => {
      this.products = response
      console.log(response)
    })
  },
  methods: {
    getProductThumb: function (product) {
      var placeholder = 'https://placeholdit.imgix.net/~text?txtsize=69&txt=824%C3%971050&w=824&h=1050'
      var fileId = product.relationships.main_image.data.id

      var file = this.products.included.main_images.find(function (el) {
        return fileId === el.id
      })

      return file.link.href || placeholder
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
