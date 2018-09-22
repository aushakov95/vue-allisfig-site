<template>
  <div>
    <div class="ui container">
    <div class="ui items">
      <div class="item">
        <div class="ui medium rounded image">
        <img :src="product.included.files[0].link.href" alt="">
        </div>
        <div class="content">
          <div class="header" >{{ product.data[0].name }}</div>
          <div class="description">

            <p>{{ product.data[0].meta.display_price.with_tax.formatted }}</p>
          </div>
              <select v-model="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <button class="ui green button" role="button" v-on:click.prevent="addToCart(product.data[0].id, qty)">
                Add to Cart
              </button>
          <div class="ui segment" style="width: 50%;">
            <h3 class="ui header">About this product</h3>
            <p>{{ product.data[0].description }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="ui segment">
    <table class="ui fluid celled table">
      <tbody class="">
        <tr class="">
            <td class="">Clay</td>
            <td class=""></td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>
  </div>
</template>
<script>
import MoltinService from '../services/moltin.js'

export default {
  name: 'product',
  data () {
    return {
      products: {},
      product: {},
      qty: 1
    }
  },
  mounted () {
    // TODO: This might not resolve before the template is built. Add a workaround.
    MoltinService.findBySlug(this.$route.params.slug).then((response) => {
      this.product = response
      console.log(response)
    })
  },

  beforeMount () {
    MoltinService.getHomepageProducts().then((response) => {
      this.products = response
      console.log(response)
    })
  },

  methods: {
    addToCart: function (productId, qty) {
      MoltinService.addToCart(productId, qty).then((response) => {
        this.$emit('cart-updated', response)
        this.qty = 1
      })
    }
  }
}
</script>
<style>
</style>
