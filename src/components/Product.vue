<template>
  <div>
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
            <div class="extra">
              <div class="ui fluid action input">
                <input type="number" placeholder="Quantity" v-model="qty">
                <button class="ui green labeled icon button" role="button" v-on:click.prevent="addToCart(product.data[0].id, qty)">
                  <i aria-hidden="true" class="plus cart icon"></i>Add to Cart
                </button>
            </div>
          </div>
          <div class="ui segment">
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
