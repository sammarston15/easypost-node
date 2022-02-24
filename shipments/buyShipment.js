const Easypost = require('@easypost/api');
require('dotenv').config();
// const api = new Easypost(process.env.prodKey);  // prodKey
const api = new Easypost(process.env.testKey);     // testKey

/* retrieve shipment via shipment id */
api.Shipment.retrieve('test1').then(s => {
  console.log(s)
  // s.buy('rate_062d2696973c437fa946a1b7ca92a027').then(console.log).catch((error) => {
  //   console.log('buy rate catch: ', error)
  // });
}).catch((error) => {
  console.log('retrieve shipment catch: ', error)
});