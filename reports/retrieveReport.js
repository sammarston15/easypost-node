/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

//============retrieve a single report============
try {
    const report = await client.Report.retrieve('<REPORT_ID>');

    console.log(report);
} catch (error) {
  console.log("   ")
  console.log("RETRIEVE REPORT ERROR:")
  console.log(error)
}