const Easypost = require('@easypost/api');
require('dotenv').config();
// const api = new Easypost(process.env.prodKey);  // prodKey
const api = new Easypost(process.env.testKey);     // testKey


// ==========retrieve shipment==========
//  const shipment = api.Shipment.retrieve('shp_62485ba1bd4745cc943a0a28bb86283a').then(console.log).catch(console.log);


 // ==========retrieve and buy shipment==========
//  const shipment = api.Shipment.retrieve('shp_62485ba1bd4745cc943a0a28bb86283a').then(s => {
//   s.buy(s.lowestRate(['UPS'], ['UPSStandard'])).then(console.log).catch(console.log);
// });


// ========== retrieve a list of shipments ==========
api.Shipment.all({
  page_size: 2,
  start_datetime: '2021-01-02T08:50:00Z'
}).then(console.log);