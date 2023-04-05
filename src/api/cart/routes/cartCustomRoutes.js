module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/cart',
      handler: 'cart.findUserCart',
    },
    {
      method: 'DELETE',
      path: '/cart',
      handler: 'cart.clearUserCartProducts'
    },
    {
      method: 'POST',
      path: '/cart/add',
      handler: 'cart.addProduct'
    },
    {
      method: 'DELETE',
      path: '/cart/remove',
      handler: 'cart.removeProduct'
    }
  ]
}
