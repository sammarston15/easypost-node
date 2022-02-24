const Easypost = require('@easypost/api');
require('dotenv').config();
// const api = new Easypost(process.env.prodKey);  // prodKey
const api = new Easypost(process.env.testKey);     // testKey

api.Batch.retrieve('batch_61c81417ab044289a2faa75c47228ba6').then(b => {
  /* Once createScanForm is complete, a webhook will be
   * fired to indicate that the scan form was created. */
  b.createScanForm().then(console.log);
});