
/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============buy shipment by lowest rate============
try {
  const batch = await client.Batch.create({
    shipments: [
      // {
      //   "id": "shp_..."
      // },
      // {
      //   "id": "shp_..."
      // },
      {
        "to_address": {
          "name": "Dr. Steve Brule",
          "street1": "179 N Harbor Dr",
          "city": "Redondo Beach",
          "state": "CA",
          "zip": "90277",
          "country": "US",
          "phone": "8573875756",
          "email": "dr_steve_brule@gmail.com"
        },
        "from_address": {
          "name": "EasyPost",
          "street1": "417 Montgomery Street",
          "street2": "5th Floor",
          "city": "San Francisco",
          "state": "CA",
          "zip": "94104",
          "country": "US",
          "phone": "4153334445",
          "email": "support@easypost.com"
        },
        "parcel": {
          "length": "20.2",
          "width": "10.9",
          "height": "5",
          "weight": "65.9"
        },
        "carrier": "USPS",
        "service": "ParcelSelect"
      },
      {
        "to_address": {
          "name": "Dr. Steve Brule",
          "street1": "179 N Harbor Dr",
          "city": "Redondo Beach",
          "state": "CA",
          "zip": "90277",
          "country": "US",
          "phone": "8573875756",
          "email": "dr_steve_brule@gmail.com"
        },
        "from_address": {
          "name": "EasyPost",
          "street1": "417 Montgomery Street",
          "street2": "5th Floor",
          "city": "San Francisco",
          "state": "CA",
          "zip": "94104",
          "country": "US",
          "phone": "4153334445",
          "email": "support@easypost.com"
        },
        "parcel": {
          "length": "20.2",
          "width": "10.9",
          "height": "5",
          "weight": "65.9"
        },
        "carrier": "USPS",
        "service": "ParcelSelect"
      },
    ],
  });

  console.log(batch);
} catch (error) {
  console.log("   ")
  console.log("CREATE BATCH ERROR:")
  console.log(error)
}





