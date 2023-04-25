/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============SCANFORM SHIPMENTS DIRECTLY============
try {
  const scanForm = await client.ScanForm.create({
    shipments: [{ id: 'shp_...' }, { id: 'shp_...' }],
  });

  console.log(scanForm);
} catch (error) {
  console.log("   ")
  console.log("SHIPMENT SCANFORM ERROR:")
  console.log(error)
}