require('dotenv').config();


const Easypost = require('@easypost/api');
const apiKey = process.env.testKey;
// const apiKey = process.env.prodKey;
const api = new Easypost(apiKey);



const toAddress = new api.Address({
  company: 'THE TESTY MCTESTFACE CO.',
  name: 'MR. TESTY MCTESTFACE',
  street1: '721 Government St',
  // street2: '',
  city: 'Victoria',
  state: 'BC',
  zip: 'V8W 1W5',
  country: 'CA',
  phone: '6135699941',
});

const fromAddress = new api.Address({
  company: "THE TESTING CO.",
  name: 'MR. TEST',
  street1: '358 S 700 E',
  street2: 'STE B',
  city: 'Salt Lake City',
  state: 'UT',
  zip: '84102',
  country: 'US',
  phone: '4165555556',
  email: 'TEST123@YOPMAIL.COM',

  
});

toAddress.save();
// toAddress.save().then(console.log).catch(console.log);

fromAddress.save();
// fromAddress.save().then(console.log).catch(console.log);


const customsInfo = new api.CustomsInfo({
    // eel_pfc: "NOEEI 30.36",
    customs_certify: true,
    customs_signer: 'Sample',
    contents_type: 'merchandise',
    restriction_type: 'none',
    restriction_comments: '',
    non_delivery_option: 'return',
    contents_explanation: 'Stuff',
    // declaration: '',
    customs_items: [
        new api.CustomsItem({
            description: 'Sample good',
            quantity: 1,
            weight: 9,
            value: 1.0,
            // hs_tariff_number: '4901.99',
            origin_country: 'US',
            code: 'MPH0213',
            // currency: 'USD'
        })],
});

const parcel = new api.Parcel({
    // predefined_package: 'Flat',
    length: 10,
    width: 10,
    height: 10,
    weight: 10,
});

// parcel.save().then(console.log).catch(console.log);

const shipment = new api.Shipment({
    to_address: toAddress,
    from_address: fromAddress,
    parcel: parcel,
    customs_info: customsInfo,
    // reference: '123',
    // is_return: true,
    options: {
      // importer_address_id: 'adr_5919faf95aec43d4949215d07f913e16',
      // bill_third_party_account: '12345',
    //  incoterm: 'DDP',
    //  duty_payment_account: '654410658',
    // machineable: true,
    // commercial_invoice_format: 'PNG'
    freight_charge: 56.72
    // label_size: '4X6',
    //  label_format: "PDF",
    //  delivery_confirmation: 'SIGNATURE',
    //  hold_for_pickup: true,
    //  handling_instructions: 'These are my instructions!!!!!',
    // print_custom_1: 'HEY THIS SHOULD BE ON THE LABEL',
    // commercial_invoice_letterhead: 'IMAGE_1',
    // commercial_invoice_signature: 'IMAGE_2'
    // delivery_confirmation: 'DO_NOT_SAFE_DROP',
    // currency: 'CAD',
    // payment: {
    //   type: 'SENDER',
    //   account: '893084290',
    //   postal_code: '84102',
    //   country: 'US'
    //  },
    },
    // carrier_accounts: ['ca_73e8527659224c7c9981784bf7ec6b5f'],
    // carrier_accounts: [process.env.UPS],
});

// shipment.save().then(console.log).catch(console.log);



// ============buy shipment by ID============
// api.Shipment.retrieve('shp_9687957fb3934de283c9dc447ca576c7').then(s => {
//   s.buy('rate_7c6eda5da6be40dda5abe0c7a8c2371b').then(console.log).catch(console.log);
// }).catch(console.log);


// ============buy shipment by lowest rate============
shipment.save().then(buyShipment => {
  shipment.buy(shipment.lowestRate())
    .then(console.log).catch(console.log);
}).catch(console.log);