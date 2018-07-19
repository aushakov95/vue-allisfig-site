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
  }

}
