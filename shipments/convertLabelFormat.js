require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);

api.Shipment.retrieve('shp_6f150b1352e5443eba7ab7b09c8a670a').then(shipment => {
  shipment.convertLabelFormat('ZPL').then(console.log);
});