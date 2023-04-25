/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import crypto from "crypto"
import fs from "fs"

// const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
const client = new EasyPostClient(process.env.TEST_KEY) // testKey

const testCodes = [
  {
    trackingCode: 'EZ2000000001',
    expectedStatus: 'pre_transit'
  },
  {
    trackingCode: 'EZ2000000002',
    expectedStatus: 'in_transit'
  },
  {
    trackingCode: 'EZ3000000003',
    expectedStatus: 'out_for_delivery'
  },
  {
    trackingCode: 'EZ4000000004',
    expectedStatus: 'delivered'
  },
  {
    trackingCode: 'EZ5000000005',
    expectedStatus: 'return_to_sender'
  },
  {
    trackingCode: 'EZ6000000006',
    expectedStatus: 'failure'
  },
  {
    trackingCode: 'EZ7000000007',
    expectedStatus: 'unknown'
  },
]

//============create tracker============
try {
  const tracker = await client.Tracker.create({
    tracking_code: 'EZ1000000001',
    // tracking_code: testCodes[0].trackingCode,
    carrier: 'USPS',
  });

  console.log(tracker);
} catch (error) {
  console.log("   ")
  console.log("CREATE TRACKER ERROR:")
  console.log(error)
}



