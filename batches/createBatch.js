require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);


batch = new api.Batch({
  /* Shipments and other batch child objects can either be
   * an array instances or an array of ids. */
  shipments: [
    'shp_d09f7e2569854ac7b32e86274e3ae780',
    'shp_6127102600934d7b845287a7fd693874',
    'shp_6aefca0f9d2647bb8a71405b615440c1',
    'shp_74e9a42bb86340dcbfaa1aaf8caf3d57',
    'shp_b3c01f5394c9484f9565687914b65b1e'
  ]
});

/* batch is asyncronous - WAIT UNTIL BATCH IS FULLY CREATED TO DO ANYTHING ELSE WITH IT */
batch.save().then(console.log);





