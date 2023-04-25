
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
      'shp_b4ade4a735a840728039d5596aeeeae5',
      'shp_eade77f1d80348fb86dd89203326bec6',
      'shp_e00c5c3710f247e49413ef74d1fdf0b8',
      'shp_5b02c77a42d74763b4397ce4c9dc625e',
    ],
  });

  console.log(batch);
} catch (error) {
  console.log("   ")
  console.log("CREATE BATCH ERROR:")
  console.log(error)
}





