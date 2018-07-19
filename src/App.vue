<template>
  <div id="app">
    <div class="ui secondary top menu">
      <div class="ui text container">
        <router-link to="/" class="item">
          &Delta;F
        </router-link>
        <router-link to="/cart" class="right item">
          <i aria-hidden="true" class="cart icon"></i>({{ cart.data.length }} items)
        </router-link>
      </div>
    </div>
    <router-view :cart="cart" @cart-updated="onCartUpdated"></router-view>
  </div>
</template>

<script>
import MoltinService from './services/moltin.js'

export default {
  name: 'app',
  data () {
    return {
      cart: {
        data: []
      }
    }
  },
  beforeMount () {
    MoltinService.getCart().then((response) => {
      this.cart = response
    })
  },
  methods: {
    onCartUpdated (cart) {
      this.cart = cart
    }
  }
}
</script>

<style>
</style>
