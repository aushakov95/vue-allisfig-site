import { gateway as MoltinGateway } from '@moltin/sdk'

const Moltin = MoltinGateway({
  client_id: 'ATVHG9WxikoeSKKYEMqtokgKN5edX7yN8HoocAod8S'
})

export default {

  getHomepageProducts () {
    return Moltin.Products.With('files, main_images, collections').Limit(8).All()
  },

  findBySlug (slug) {
    return Moltin.Products.Filter({
      eq: {
        slug: slug
      }
    }).With('files, main_image, collections').Limit(1).All()
  },

  getCart () {
    return Moltin.Cart.Items()
  },

  addToCart (productId, qty) {
    return Moltin.Cart.AddProduct(productId, qty)
  },

  removeFromCart (itemId) {
    return Moltin.Cart.RemoveItem(itemId)
  },

  checkout (checkoutData) {
    return Moltin.Cart.Checkout(checkoutData)
  },

  pay (orderId, paymentData) {
    return Moltin.Orders.Payment(orderId, paymentData)
  },

  deleteCart () {
    return Moltin.Cart.Delete()
  },

  getAvailableQuantity () {
    var cartItems
    /*
    Moltin.Cart.Items().then((response) => {
      var itemData = {} //Holds id and and stock available
      cartItems = response
      console.log(cartItems)
      console.log(cartItems.data[0])
      for (var i = 0; i < cartItems.data.length; i++) {
        var productId = cartItems.data[i].product_id
        console.log(productId)
      }
    }) */

    Moltin.Cart.Items().then(response => {

      console.log(response)
    })

    Moltin.Inventories.All().then((inventories) => {
  // Do something
      console.log(inventories)
    })
    /*
    Moltin.Inventories.Get("5666e91c-a616-4195-9731-c1ee85dec31b").then(response => {
      console.log("getting data")
      //console.log(inventories.data)
    }) */

  /*  Moltin.Inventories.Get(itemId).then(response => {
      return response.data.available
    }) */
  }

}
