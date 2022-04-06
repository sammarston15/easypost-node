require('dotenv').config();
const EasyPost = require('@easypost/api');
const api = new EasyPost(process.env.testKey);

const testAddress = new api.Address({
  name: 'Direccion Fisica',
  street1: 'C. 49-A No. 956 X C. 112 Y C. 112-A',
  street2: '',
  city: 'Merida',
  state: 'Yucatan',
  zip: '97302',
  country: 'MX',
  phone: '4798716002',
  email: 'email@email.com',
  verify: ['delivery']
});



testAddress.save().then(data => {
  console.log("########")
  console.log("MAIN_RESPONSE")
  console.log("########")
  console.log(data)
  console.log("        ")
  console.log("########")
  console.log("DETAILS")
  console.log("########")
  console.log(data.verifications.details)
}).catch(error => {
  console.log("MAIN_ERROR", error)
  console.log("########")
  // console.log("ERROR DETAILS", erro)
})