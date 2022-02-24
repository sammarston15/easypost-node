require('dotenv').config();
const Easypost = require('@easypost/api');

// const apiKey = process.env.prodKey; // prodKey
const apiKey = process.env.testKey; // testKey

/* define api key */
const api = new Easypost(apiKey);

// bring in the data from the misc.json file
let address = require('../misc.json')



const newAddress = new api.Address({
  name: address.name,
  company: address.company,
  street1: address.street1,
  street2: address.street2,
  city: address.city,
  state: address.state,
  zip: address.zip,
  country: address.country,
  phone: address.phone,
  email: address.email,
  carrier_facility: address.carrier_facility,
  residential: address.residential,
  federal_tax_id: address.federal_tax_id,
  state_tax_id: address.state_tax_id,
  verify: ['delivery'],
  // verify_strict: ['delivery']
});

newAddress.save().then((adr) => {
  console.log('New Address: ', adr)
  if (adr.verifications.delivery.errors) {
    console.log('address verification results if there are errors: ', adr.verifications.delivery.errors)
  }
}).catch(console.log)