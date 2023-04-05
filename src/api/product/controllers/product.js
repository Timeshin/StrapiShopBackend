'use strict';

/**
 * product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', () => ({
  async find() {
    const products = await strapi.db.query('api::product.product').findMany({
      populate: true
    })

    if(!products.length) {
      return {
        data: []
      }
    }

    return products
  },

  async findOne(ctx) {
    ctx.request.query.populate = 'image'

    const { data } = await super.findOne(ctx)

    const productResult = {
      ...data.attributes,
      id: data.id,
      image: data?.attributes?.image?.data?.attributes || null
    }

    return productResult
  }
}))