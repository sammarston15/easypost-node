/* IMPORT EASYPOST AND .ENV INFO */
import EasyPostClient from "@easypost/api"
import * as dotenv from "dotenv" // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()


const client = new EasyPostClient(process.env.PROD_KEY);  // prodKey
// const client = new EasyPostClient(process.env.TEST_KEY) // testKey 



// **** If no user id is passed in, the user returned is the owner of the api key.

// RETRIEVE YOUR ACCOUNT
// api.User.retrieve().then(console.log).catch(console.log);


// RETRIEVE A CHILD ACCOUNT
// api.User.retrieve('user_0cc536d449d14199b4fea5d1b9dfcf72').then(console.log).catch(console.log);


// RETRIEVE ALL API KEYS (YOURS AND YOUR CHILDREN)
client.ApiKey.all().then(response => console.log(JSON.stringify(response, null, 2))).catch(console.log)