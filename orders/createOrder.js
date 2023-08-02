/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

/* IMPORT DAD TOOL */
import dad from "dad-tool"

// CREATE DAD ADDRESSES
const unitedstates1 = dad.random("US_AZ")
const unitedstates2 = dad.random("US_CA")
const canada1 = dad.random("CA_BC")
const canada2 = dad.random("CA_BC")
const australia1 = dad.random("AU_VT")
const australia2 = dad.random("AU_VT")
const unitedkingdom1 = dad.random("EU_UK")
const unitedkingdom2 = dad.random("EU_UK")
const spain1 = dad.random("EU_ES")
const spain2 = dad.random("EU_ES")

// CREATE TO ADDRESS
const toAddress = {
    name: "Example Destination Name",
    company: "Example Destination Company",
    street1: unitedkingdom1.street1,
    street2: unitedkingdom1.street2,
    city: unitedkingdom1.city,
    state: unitedkingdom1.state,
    zip: unitedkingdom1.zip,
    country: unitedkingdom1.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345',
    // verify: ['delivery']
}

// CREATE FROM ADDRESS
const fromAddress = {
    name: "Example Origin Name",
    company: "Example Origin Company",
    street1: unitedstates2.street1,
    street2: unitedstates2.street2,
    city: unitedstates2.city,
    state: unitedstates2.state,
    zip: unitedstates2.zip,
    country: unitedstates2.country,
    phone: "415-528-7555",
    email: "example@email.com",
    // federal_tax_id: '12345'
}

// CREATE CUSTOMS INFO
const customsItem = {
  description: "T-shirt",
  quantity: 1,
  value: 10,
  weight: 5,
  hs_tariff_number: "123456",
  origin_country: "us",
  code: "1234",
}

const customsInfo = {
  eel_pfc: "NOEEI 30.37(a)",
  customs_certify: true,
  customs_signer: "Steve Brule",
  contents_type: "merchandise",
  contents_explanation: "this is the general notes section",
  restriction_type: "none",
  // restriction_comments: '',
  non_delivery_option: "return",

  /* customs_items can be passed in as instances or ids.
   *  if the item does not have an id, it will be created. */
  customs_items: [
      customsItem,
      {
          description: "Sweet shirts",
          quantity: 2,
          weight: 5,
          value: 23,
          hs_tariff_number: "654321",
          origin_country: "US",
          code: "1234",
      },
  ],
}


//============buy shipment by lowest rate============
try {
  const order = await client.Order.create({
    to_address: toAddress,
    from_address: fromAddress,
    shipments: [
      {
        parcel: {
          weight: 10.2,
        },
        customs_info: customsInfo,
      },
      {
        parcel: {
          // predefined_package: 'FedExBox',
          weight: 17.5,
        },
        customs_info: customsInfo,
      },
    ],
    carrier_accounts: [process.env.BRITT_DHL_EXPRESS],
    // service: 'First',
    reference: crypto.randomUUID(),
  });

  // write info to a txt file in the Downloads folder
  fs.writeFileSync(`/Users/smarston/Downloads/my_order_${order.id}.txt`, JSON.stringify(order, null, 2));

  // log order ID
  console.log(order.id);

  // log any rates returned
  for (const i in order.shipments) {
    for (const rate in order.shipments[i].rates)
    console.log(`${order.shipments[i].id} - ${order.shipments[i].rates[rate].carrier} - ${order.shipments[i].rates[rate].service} - ${order.shipments[i].rates[rate].rate}`)
  }

  // log any rating errors
  console.log('\n\nRATING ERRORS:')
  for (const i in order.messages) {
    console.log(order.messages[i])
  }

} catch (error) {
  console.log("   ")
  console.log("ORDER CREATE ERROR:")
  console.log(error)
}