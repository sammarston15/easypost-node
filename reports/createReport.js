/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============create a report============
try {
  const report = await client.Report.create({
    type: 'payment_log',
    start_date: '2022-10-01',
    end_date: '2022-10-31',
  });

  console.log(report);
} catch (error) {
  console.log("   ")
  console.log("CREATE REPORT ERROR:")
  console.log(error)
}