import { json2csv } from 'json-2-csv'; // see https://www.npmjs.com/package/json-2-csv for more info on this package
import fs from 'fs'

// add JSON from admin here
import data from '../misc.json' with { type: 'json' }


// convert JSON array to CSV string
const letsGo = async () => {
    try {
        const options = {
            arrayIndexesAsKeys: true, // default: false
            keys: [ // specify the keys you want in the CSV and their order. If not specified, all keys will be included in an arbitrary order.
                "id",
                "object",
                "mode",
                "to_address",
                "from_address",
                "parcel",
                "customs_info",
                "rates",
                "selected_rate",    
            ]
        }
        
        const csv = await json2csv(data, options);

        // print CSV string
        console.log(csv);

        // write info to a CSV file in the Downloads folder
        fs.writeFileSync('/Users/smarston/Downloads/my_file.csv', csv);

    } catch (err) {
        console.log(err);
    }
};

letsGo();