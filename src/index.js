'use strict'

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    const io = require('socket.io')(strapi.server.httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    })

    io.on('connection', () => {
      console.log('connected')
    })

    strapi.db.lifecycles.subscribe({
      models: ['api::product.product'],
      afterCreate: async ({ result }) => {
        io.emit('product:add', result)
      },
      afterUpdate: async ({ result }) => {
        io.emit('product:updated', result)
      },
      afterDelete: async ({ result }) => {
        io.emit('product:deleted', result)
      }
    })
  }
}
