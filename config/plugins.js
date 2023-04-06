// module.exports = ({ env }) => ({
//   'io': {
//     'enabled': true,
//     'config': {
//       'IOServerOptions' :{
//         'cors': { 'origin': 'http://localhost:3000', 'methods': ['GET', 'POST'] },
//       },
//       'contentTypes': {
//         'message': '*',
//         'chat': ['create']
//       },
//       'events':[
//         {
//           'name': 'connection',
//           'handler': ({ strapi }, socket) => {
//             strapi.log.info(`[io] new connection with id ${socket.id}`);
//           },
//         },
//         {
//           'name': 'didPublish',
//           'handler': ({ strapi }, socket) => {
//             strapi.log.info(`PUBLISH`);
//             console.log('publish');
//           },
//         }
//       ]
//     },
//   },
// })