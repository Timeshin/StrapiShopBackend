'use strict';

/**
 * cart controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::cart.cart', ({ strapi }) => ({
  async findUserCart(ctx) {
    const userId = ctx.state.user.id
    const cart = await strapi.db.query('api::cart.cart').findOne({
      where: {
        user: userId
      },
      populate: {
        products: {
          populate: true
        }
      }
    })

    if(!cart) {
      return { cart: null }
    }

    return { cart }
  },

  async addProduct(ctx) {
    const userId = ctx.state.user.id
    const productId = ctx.request.body.id
    const product = await strapi.db.query('api::product.product').findOne({
      where: {
        id: productId
      },
      populate: true
    })

    let { cart } = await this.findUserCart(ctx)
    let result

    if(!cart) {
      const { products } = await strapi.entityService.create('api::cart.cart', {
        data: {
          products: [product],
          user: userId
        },
        populate: ['products', 'products.image']
      }).catch((e) => console.log(e))

      result = products
    } else {
      const newProductsArray = [...(cart.products || []), product]

      const { products } = await strapi.entityService.update('api::cart.cart', cart.id, {
        data: {
          products: newProductsArray
        },
        populate: ['products', 'products.image']
      })

      result = products
    }
    
    return { products: result }
  },

  async removeProduct(ctx) {
    const productIdFromRequest = +ctx.query.id
    const { cart } = await this.findUserCart(ctx)
    const newProductsArray = cart.products.filter(({ id }) => id !== productIdFromRequest)

    const { products } = await strapi.entityService.update('api::cart.cart', cart.id, {
      data: {
        products: newProductsArray
      },
      populate: ['products', 'products.image']
    })
  
    return { products }
  },

  async clearUserCartProducts(ctx) {
    const { cart } = await this.findUserCart(ctx)
    const { products } = await strapi.entityService.update('api::cart.cart', cart.id, {
      data: {
        products: []
      },
      populate: ['products', 'image']
    })
  
    return { products }
  }
}))
