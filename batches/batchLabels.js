require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);


/* batches are asynchronous - YOU WON'T SEE THE FINAL STAGE IN THE CONSOLE LOG - CHECK YOUR WEBHOOK EVENTS */
const batch = api.Batch.retrieve('batch_0fb1295cce274bbd8bdbe73cc1074567').then(b => {
  b.generateLabel('pdf').then(console.log).catch((error) => console.log('generate labels call: ', error));
}).catch((error) => console.log('retrieve batch call: ', error));
