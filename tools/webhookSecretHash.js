// THIS TOOL WAS CREATED BY THE WONDERFUL GREG

let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const SECRET = "A1B2C3"
const EPSIGNATURE = "4840c5bb0eb772a86c78e717ff80eae84532fc33e3f30ca627a08cdf9195984f"
const BODY = `<payload body raw, no white space>`



let hmac = crypto
    .createHmac("sha256", SECRET)
    .update(BODY)
    .digest("sha256");
const hashArray = Array.from(hmac)
const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');


console.log("Resp Signature: ", digest);
console.log("EP sig: ", EPSIGNATURE);