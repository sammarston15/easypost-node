const Easypost = require('@easypost/api');
require('dotenv').config();
// const api = new Easypost(process.env.prodKey);  // prodKey
const api = new Easypost(process.env.testKey);     // testKey

const scanForm = new api.ScanForm({
  shipments: [
    'shp_a81a25adacd84ac1bca753ba1a5a9cb5'
  ]
});

scanForm.save().then(console.log).catch(console.log);