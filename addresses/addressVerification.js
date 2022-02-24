require('dotenv').config();
const EasyPost = require('@easypost/api');
const api = new EasyPost(process.env.testKey);

const testAddress = new api.Address({
  name: 'Michelle Thompson (#1691680)',
  street1: '4013 CAERLEON CIR',
  street2: '',
  city: 'BENTONVILLE',
  state: 'AR',
  zip: '72713-7651',
  country: 'US',
  phone: '4798716002',
  email: 'brooklynmacy1313@yahoo.com',
  verify: ['delivery']
});



testAddress.save().then(console.log).catch(err => console.log(err)).then(logErrors => {
  if (testAddress.verifications.delivery.errors) {
    console.log(testAddress.verifications.delivery.errors);
  }
});