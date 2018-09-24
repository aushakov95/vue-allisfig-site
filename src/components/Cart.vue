<template>
    <div class="ui container">
      <h1 class="ui header">SHOPPING CART</h1>
      <div class="ui warning message" v-if="cart.data.length == 0">
        <div class="header">Your cart is empty</div>
        <p>You'll need to add some items to the cart before you can checkout.</p>
      </div>

      <div v-if="cart.data.length > 0">
        <div class="ui clearing segment raised">
        <table class="ui very basic unstackable table">
          <thead>
          <tr>
            <th>
              ITEM
            </th>
            <th>
            </th>
            <th>
              QTY.
            </th>
            <th>
            PRICE
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in cart.data" :key="item.id">
              <td>
                <button class="ui basic icon small button" id="remove-button" role="button" v-on:click.prevent="removeFromCart(item.id)">
                  <i aria-hidden="true" class="remove icon"></i>
                </button>
                <div class="ui image">
                  <img v-bind:src="item.image.href" class="ui tiny rounded image">
                </div>
              </td>
              <td>
                <h5 class="ui header">
                  {{ item.name }}
                </h5>
              </td>
              <td>
                <select v-bind:id="'select-field' + item.id" v-on:change="checkQuantity(item.id)" v-bind:ref="'select-field' + item.id">
                  <option value="0">0</option>
                  <option value="1" :selected="1 == item.quantity">1</option>
                  <option value="2" :selected="2 == item.quantity">2</option>
                  <option value="3" :selected="3 == item.quantity">3</option>
                  <option value="4" :selected="4 == item.quantity">4</option>
                </select>
              </td>

              <td>
                <h5 class="ui header price">{{ item.meta.display_price.with_tax.value.formatted }}</h5>
              </td>
            </tr>
          </tbody>
          </table>
          <div class="ui divider" id="last-divider"></div>
          <div class="ui header right floated">
            Subtotal: <span class="price">{{ cart.meta.display_price.with_tax.formatted }}</span>
          </div>
      </div>
      <span>
        <router-link :to="'/checkout'" class="ui green right floated huge button" id="checkout-button">Checkout</router-link>
      </span>
    </div>
    </div>
</template>

<script>
import MoltinService from '../services/moltin.js'

export default {
  name: 'product',
  props: ['cart'],
  mounted () {
    MoltinService.getAvailableQuantity()
  },
  methods: {
    removeFromCart (itemId) {
      MoltinService.removeFromCart(itemId).then((response) => {
        this.$emit('cart-updated', response)
      })
    },
    checkQuantity (itemId) {
      console.log("Checking quantity selected")
      console.log(this.$refs["select-field" + itemId])
      var selectField = this.$refs["select-field" + itemId]
      console.log(selectField[0].selectedIndex)
      if (selectField[0].selectedIndex == 0) {
        console.log("Attempting to remove")
        this.removeFromCart(itemId)
        console.log("Removed item")
      }
    }
  }
}
</script>
<style>
#centered-items {
  display: flex;
  align-items: center;
}

#checkout-button {
  background-color: #80E3C5 !important;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16) !important;
}

.price {
  color: #4CAC53 !important;
}

#last-divider {
  margin-top: -12px;
}

#checkout-button:hover {
  background-color: #66b59d !important;
}

@media screen and (max-width: 600px) {
  #remove-button {
    display: none;
  }
}

</style>
