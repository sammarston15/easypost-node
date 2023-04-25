/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============convert shipment label format after purchase============
try {
  const shipment = await client.Shipment.retrieve('shp_...')
  console.log("   ")
  console.log("   ")
  console.log(`attempting to re-format ${shipment.id}...`)
  const shipmentWithLabel = await client.Shipment.convertLabelFormat(shipment.id, 'ZPL');

  console.log(shipmentWithLabel);

} catch (error) {
  console.log("   ")
  console.log("SHIPMENT BUY ERROR:")
  console.log(error)
}