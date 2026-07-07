// THIS TOOL TAKES LOGS OUTPUT AS JSON FROM KIBANA AND CREATES A CSV FILE TO SEND THE CUSTOMER

import { json2csv } from 'json-2-csv'; // see https://www.npmjs.com/package/json-2-csv for more info on this package
import fs from 'fs'


// add JSON from admin here
import data from '../misc.json' with { type: 'json' }


// data clean up - since kibana logs are messy
for (const log of data) {
	
    // convert array values to strings (e.g. ['shipment_1234abcd5678'] becomes 'shipment_1234abcd5678') for easier reading in CSV
    for (const key in log.fields) {
        if (Array.isArray(log.fields[key])) {
            log.fields[key] = log.fields[key].join(", ")
        }
    }

}


const columnHeaderTitleMap = {
	"fields.@timestamp": "Timestamp",
	// "fields.msg.user.id": "User ID", // comment out when running for customer
	"fields.msg.mode": "Environment",
	"fields.msg.request.url": "Request URL",
	"fields.msg.params.action": "Action",
	"fields.msg.params.controller": "Endpoint",
	"fields.msg.params_full": "Request Body",
	"fields.msg.response.body": "Response Body",
	"fields.msg.response.http_status": "HTTP Status",
	"fields.msg.response.error_message": "Error Message",
}



// create csv file from kibana logs to send to customer
const letsGo = async () => {
    try {
        const options = {
            arrayIndexesAsKeys: true, // default: false
            keys: Object.keys(columnHeaderTitleMap), // specify the keys you want in the CSV and their order. If not specified, all keys will be included in an arbitrary order.
			fieldTitleMap: columnHeaderTitleMap, 
        }
        
        const csv = await json2csv(data, options);

        // print CSV string
        // console.log(csv);

        // write info to a CSV file in the Downloads folder
        fs.writeFileSync('/Users/smarston/Downloads/rename_this-kibana_logs_for_customer.csv', csv);

    } catch (err) {
        console.log(err);
    }
};

letsGo();