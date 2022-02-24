const Easypost = require('@easypost/api');
require('dotenv').config();
const api = new Easypost(process.env.prodKey);  // prodKey
// const api = new Easypost(process.env.testKey);     // testKey


const testCodes = [
  {
    trackingCode: 'EZ2000000001',
    expectedStatus: 'pre_transit'
  },
  {
    trackingCode: 'EZ2000000002',
    expectedStatus: 'in_transit'
  },
  {
    trackingCode: 'EZ3000000003',
    expectedStatus: 'out_for_delivery'
  },
  {
    trackingCode: 'EZ4000000004',
    expectedStatus: 'delivered'
  },
  {
    trackingCode: 'EZ5000000005',
    expectedStatus: 'return_to_sender'
  },
  {
    trackingCode: 'EZ6000000006',
    expectedStatus: 'failure'
  },
  {
    trackingCode: 'EZ7000000007',
    expectedStatus: 'unknown'
  },
]

const tracker1 = new api.Tracker({
  tracking_code: '1639700054190',
  carrier: 'APC'
});


tracker1.save().then(console.log).catch(console.log);


//This will log everything, meaning the "tracking_location: [Object]" will be unpacked.
// tracker1.save().then(r => {console.log(JSON.stringify(r))}).catch(console.log);