// This tool takes log output from Kibana as JSON and creates a CSV file
// for customer delivery when multiple logs are provided. For a single log,
// it creates an easy-to-read TXT file instead. The CSV and TXT files are
// written to the Downloads folder.

import { json2csv } from 'json-2-csv'; // see https://www.npmjs.com/package/json-2-csv for more info on this package
import fs from 'fs'


// add JSON from admin here
import data from '../misc.json' with { type: 'json' }

// Support both a single log object and an array of logs.
const logs = Array.isArray(data) ? data : [data]
const isSingleLogInput = !Array.isArray(data)

const EASYPOST_ORDER_OR_SHIPMENT_ID_PATTERN = /\b(?:order|shp)_[a-z0-9]{8,}\b/g


// data clean up - since kibana logs are messy
for (const log of logs) {
	
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

const getNestedValue = (obj, path) => {
    const keys = path.split('.')
    let current = obj

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]

        if (current == null || typeof current !== 'object') {
            return undefined
        }

        if (Object.prototype.hasOwnProperty.call(current, key)) {
            current = current[key]
            continue
        }

        // Kibana payloads often keep dot-delimited keys as flat strings.
        const remainingPath = keys.slice(i).join('.')
        if (Object.prototype.hasOwnProperty.call(current, remainingPath)) {
            return current[remainingPath]
        }

        return undefined
    }

    return current
}

const tryParseJsonString = (value) => {
    if (typeof value !== 'string') {
        return value
    }

    const trimmed = value.trim()
    if (!(trimmed.startsWith('{') || trimmed.startsWith('['))) {
        return value
    }

    try {
        return JSON.parse(trimmed)
    } catch {
        return value
    }
}

const formatValue = (value, { prettyJson = false } = {}) => {
    if (value === undefined || value === null || value === '') {
        return 'N/A'
    }

    const parsedValue = prettyJson ? tryParseJsonString(value) : value

    if (typeof parsedValue === 'object') {
        return JSON.stringify(parsedValue, null, 2)
    }

    return String(parsedValue)
}

const collectPatternMatches = (pattern, ...values) => {
    const matches = new Set()

    const visit = (value) => {
        if (typeof value === 'string') {
            const found = value.match(pattern)
            found?.forEach((match) => matches.add(match))
            return
        }

        if (Array.isArray(value)) {
            value.forEach(visit)
            return
        }

        if (value && typeof value === 'object') {
            Object.values(value).forEach(visit)
        }
    }

    values.forEach(visit)
    return [...matches]
}

const getSingleLogIdentifier = (log) => {
    const requestBodyRaw = getNestedValue(log, 'fields.msg.params_full')
    const responseBodyRaw = getNestedValue(log, 'fields.msg.response.body')
    const requestUrlRaw = getNestedValue(log, 'fields.msg.request.url')

    const requestBody = tryParseJsonString(requestBodyRaw)
    const responseBody = tryParseJsonString(responseBodyRaw)

    const orderOrShipmentIds = collectPatternMatches(
        EASYPOST_ORDER_OR_SHIPMENT_ID_PATTERN,
        requestBody,
        responseBody,
        requestUrlRaw,
    )

    if (orderOrShipmentIds.length > 0) {
        const orderId = orderOrShipmentIds.find((id) => id.startsWith('order_'))
        return orderId || orderOrShipmentIds[0]
    }

    const reference = requestBody && typeof requestBody === 'object'
        ? getNestedValue(requestBody, 'shipment.reference')
        : undefined

    return reference || 'unknown_log'
}

const buildSingleLogTextReport = (log) => {
    const lines = []
    const logIdentifier = getSingleLogIdentifier(log)
    const title = `Log for ${logIdentifier}`

    lines.push(title)
    lines.push('='.repeat(title.length))
    lines.push('')

    for (const [path, title] of Object.entries(columnHeaderTitleMap)) {
        const rawValue = getNestedValue(log, path)
        const shouldPrettyPrintJson = path === 'fields.msg.params_full' || path === 'fields.msg.response.body'
        const formattedValue = formatValue(rawValue, { prettyJson: shouldPrettyPrintJson })

        lines.push(`${title}:`)
        lines.push(formattedValue)
        lines.push('')
    }

    return lines.join('\n')
}



// create csv file from kibana logs to send to customer
const letsGo = async () => {
    try {
        const logIdentifier = getSingleLogIdentifier(logs[0])
        if (isSingleLogInput) {
            const textReport = buildSingleLogTextReport(logs[0])
            fs.writeFileSync(`/Users/smarston/Downloads/ep_log_${logIdentifier}.txt`, textReport)
            console.log('TXT file created.')
            return
        }

        const options = {
            arrayIndexesAsKeys: true, // default: false
            keys: Object.keys(columnHeaderTitleMap), // specify the keys you want in the CSV and their order. If not specified, all keys will be included in an arbitrary order.
			fieldTitleMap: columnHeaderTitleMap, 
        }
        
        const csv = await json2csv(logs, options);

        // print CSV string
        // console.log(csv);

        /**
         * write info to a CSV file in the Downloads folder
         * NOTE: change file name before sending to customer
         */
        fs.writeFileSync(`/Users/smarston/Downloads/ep_logs_${logIdentifier}.csv`, csv);

        console.log('CSV file created.')

    } catch (err) {
        console.log(err);
    }
};

letsGo();