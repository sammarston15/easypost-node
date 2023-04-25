/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============SCANFORM A BATCH============
try {
  const batch = await client.Batch.retrieve('batch_...');

  const batchWithScanForm = await client.Batch.createScanForm(batch.id);

  console.log(batchWithScanForm);
} catch (error) {
  console.log("   ")
  console.log("BATCH SCANFORM ERROR:")
  console.log(error)
}