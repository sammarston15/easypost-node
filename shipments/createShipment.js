/*  THIS COMPONENT IS SET UP TO USE THE DAD TOOL FOR THE ADDRESSES - CHANGE THE DAD ADDRESSES AS NECESSARY DEPENDING ON THE ORIGIN/DESTINATION COMBINATION YOU ARE TRYING TO TEST */

/* IMPORT EASYPOST AND .ENV INFO */
const Easypost = require('@easypost/api');
require('dotenv').config();
// const api = new Easypost(process.env.prodKey);  // prodKey
const api = new Easypost(process.env.testKey);     // testKey

/* IMPORT DAD TOOL */
const dad = require('dad-tool');

// CREATE DAD ADDRESSES
const unitedstates1 = dad.random('US_AZ');
const unitedstates2 = dad.random('US_CA');
const canada1 = dad.random('CA_BC');
const canada2 = dad.random('CA_BC');
const australia1 = dad.random('AU_VT');
const australia2 = dad.random('AU_VT');
const unitedkingdom1 = dad.random('EU_UK');
const unitedkingdom2 = dad.random('EU_UK');
const spain1 = dad.random('EU_ES');
const spain2 = dad.random('EU_ES');

// CREATE FROM ADDRESS
const fromAddress = new api.Address({
  company: 'EasyPost',
  street1: canada1.street1,
  street2: canada1.street2,
  city: canada1.city,
  state: canada1.state,
  zip: canada1.zip,
  country: canada1.country,
  phone: '415-528-7555',
  email: 'example@email.com',
  // federal_tax_id: '12345'
});
fromAddress.save()

// CREATE RETURN ADDRESS
const returnAddress = new api.Address({
  company: 'EasyPost',
  street1: canada1.street1,
  street2: canada1.street2,
  city: canada1.city,
  state: canada1.state,
  zip: canada1.zip,
  country: canada1.country,
  phone: '415-528-7555',
  email: 'example@email.com',
  // federal_tax_id: '12345'
});
returnAddress.save()



// CREATE TO ADDRESS
const toAddress = new api.Address({
  company: 'Example Destination',
  street1: canada2.street1,
  street2: canada2.street2,
  city: canada2.city,
  state: canada2.state,
  zip: canada2.zip,
  country: canada2.country,
  phone: '415-528-7555', 
  email: 'example@email.com',
  // federal_tax_id: '12345',
  // verify: ['delivery']
});
toAddress.save()


// CREATE PARCEL
const parcel = new api.Parcel({
  length: 20.2,
  width: 10.9,
  height: 5,
  // predefined_package: 'Parcel', 
  weight: 65,
});
parcel.save()


// CREATE CUSTOMS INFO
const customsItem = new api.CustomsItem({
  description: 'T-shirt',
  quantity: 1,
  value: 10,
  weight: 5,
  hs_tariff_number: '123456',
  origin_country: 'us'
});
customsItem.save()

const customsInfo = new api.CustomsInfo({
  eel_pfc: 'NOEEI 30.37(a)',
  customs_certify: true,
  customs_signer: 'Steve Brule',
  contents_type: 'merchandise',
  contents_explanation: 'hello there',
  restriction_type: 'none',
  // restriction_comments: '',
  non_delivery_option: 'return',

  /* customs_items can be passed in as instances or ids.
  *  if the item does not have an id, it will be created. */
  customs_items: [
    customsItem,
    new api.CustomsItem({
    'description': 'Sweet shirts',
    'quantity': 2,
    'weight': 5,
    'value': 23,
    'hs_tariff_number': '654321',
    'origin_country': 'US'
  })],
});
customsInfo.save();


// CREATE SHIPMENT
const shipment = new api.Shipment({
  // is_return: true,
  to_address: toAddress,
  from_address: fromAddress,
  return_address: returnAddress,
  parcel: parcel,
  customs_info: customsInfo,
  options: {
    // print_custom_1: "printCustom1",
    // print_custom_2: "printCustom2",
    // print_custom_2_code: "PO",
    // print_custom_3: "printCustom3",
    // print_custom_3_code: "RMA",
    // print_custom_1_barcode: true,
    // print_custom_2_barcode: true,
    label_format: 'ZPL',
    label_size: "4x6",
    // label_size: "4x6",
    // incoterm: "DAP",
    // invoice_number: '123456789'
    // importer_address_id: 'adr_cac53236bc4e49edbc4e07146766998d',
    // payment: {
      //   type: "THIRD_PARTY",
      //   account: "510087780",
    //   country: "US",
    //   postal_code: "12345"    
    // },
    // duty_payment_account: {
    //   type: "THIRD_PARTY",
    //   account: "510087780",
    //   country: "US",
    //   postal_code: "12345"    
    // }
    // dropoff_max_datetime: '2021-05-20T15:00:00Z',
    // delivery_confirmation: "SIGNATURE",
    // commercial_invoice_format: "PNG"
  },
  carrier_accounts: [process.env.canadaPost],
  // service: 'Priority',
  reference: toAddress.street1

});

// shipment.save().then(console.log).catch(error => console.log(error));

//============buy shipment by lowest rate============
shipment.save().then(s => {
  // log shipment create/rating call
  console.log(s)
  console.log("        ")
  console.log("        ")
  console.log("BUY CALL")
  console.log("########")
  // attempt to buy shipment's lowest rate and log the results
  s.buy(s.lowestRate()).then(console.log).catch(console.log);
}).catch(console.log);

//============buy shipment by carrier name/service type============
// shipment.save().then(s =>
//   s.buy(shipment.lowestRate(['DHLExpress'], ['ExpressWorldwideNonDoc']))
//     .then(console.log).catch(console.log)
// ).catch(console.log);