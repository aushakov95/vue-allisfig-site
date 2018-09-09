<template>
  <div id="app">
    <div class="ui container">
    <div class="ui segment raised" id="menu">
    <div class="ui secondary top menu">
      <div class="ui text container">
        <router-link to="/" class="item">
          &Delta;F
        </router-link>
        <router-link to="/cart" class="right item">
          Cart
          <div class="floating ui red tiny circular label">{{ cart.data.length }}</div>
        </router-link>
      </div>
    </div>
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

body {
  background-color: #F0F0F7;
  font-family: 'Nunito', sans-serif !important;

}

#app {
  margin-top: 1.5em;
  font-family: 'Nunito', sans-serif;
}

.header {
  font-family: 'Nunito', sans-serif !important;
  font-weight: lighter !important;
}

.button {
  font-family: 'Nunito', sans-serif !important;
  font-weight: lighter !important;
  letter-spacing: 2px;
}

#menu {
  margin-bottom: 1.5em;
}

</style>
