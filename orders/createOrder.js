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
  const order = await client.Order.create({
    to_address: { id: 'adr_...' },
    from_address: { id: 'adr_...' },
    shipments: [
      {
        parcel: {
          weight: 10.2,
        },
      },
      {
        parcel: {
          predefined_package: 'FedExBox',
          weight: 17.5,
        },
      },
    ],
  });

  console.log(order);
} catch (error) {
  console.log("   ")
  console.log("ORDER CREATE ERROR:")
  console.log(error)
}