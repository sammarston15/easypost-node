
import fs from 'fs';

// bring in the data from the misc.json file
import ship from "../misc.json" with { type: "json" }

const EASYPOST_PUBLIC_ID_PATTERN = /\b[a-z][a-z0-9]{1,20}_(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{8,}\b/g
// pattern to find easypost order ids, if those are not present, then find shipment ids (e.g. order_1234abcd5678 or shp_1234abcd5678)
const EASYPOST_ORDER_OR_SHIPMENT_ID_PATTERN = /\b(?:order|shp)_[a-z0-9]{8,}\b/g

const collectEasyPostPublicIds = (...values) => {
    const publicIds = new Set()

    const visit = (value) => {
        if (typeof value === "string") {
            const matches = value.match(EASYPOST_PUBLIC_ID_PATTERN)
            matches?.forEach((match) => publicIds.add(match))
            return
        }

        if (Array.isArray(value)) {
            value.forEach(visit)
            return
        }

        if (value && typeof value === "object") {
            Object.values(value).forEach(visit)
        }
    }

    values.forEach(visit)
    return [...publicIds]
}

const parseJsonString = (value) => {
    if (typeof value !== "string") {
        return value
    }

    try {
        return JSON.parse(value)
    } catch {
        return value
    }
}

const getSingleKibanaDetails = (log) => {
    const parsedParamsFull = parseJsonString(log._source.msg.params_full)
    const parsedResponseBody = parseJsonString(log._source.msg.response.body)

    // find easypost public ids in the following places
    const publicIds = collectEasyPostPublicIds(
        parsedParamsFull,
        parsedResponseBody,
        log._source.msg.request.url
    )

    const details = {
        id: log._id,
        source: {
            application_name: log._source.application_name || null,
            data_stream: log._source.data_stream || null,
            hostname: log._source.hostname || null,
        },
        timestamp: new Date(log._source["@timestamp"]),
        msg: {
            agent: log._source.msg.agent || null,
            mode: log._source.msg.mode || null,
            params: log._source.msg.params || null,
            params_full: parsedParamsFull || null,
            request: {
                headers: {
                    host: log._source.msg.request.headers.Host || null,
                },
                method: log._source.msg.request.method || null,
                remote_addr: log._source.msg.request.remote_addr || null,
                url: log._source.msg.request.url || null,
            },
            request_uuid: log._source.msg.request_uuid || null,
            response: {
                backtrace: log._source.msg.response.backtrace || null,
                body: parsedResponseBody || null,
                error_message: log._source.msg.response.error_message || null,
                http_status: log._source.msg.response.http_status || null,
            },
            user: {
                id: log._source.msg.user.id || null,
            },
        },
        easy_post_public_ids: publicIds,
    }
    return details
}

const getPreferredOutputId = (publicIds) => {
    const orderId = publicIds.find((publicId) => publicId.startsWith("order_"))
    if (orderId) {
        return orderId
    }

    const shipmentId = publicIds.find((publicId) => publicId.startsWith("shp_"))
    return shipmentId || "unknown_id"
}

// to run:
const output = getSingleKibanaDetails(ship)
// console.log(JSON.stringify(output, null, 4))

// write info to a file in the Downloads folder
const preferredOutputId = getPreferredOutputId(output.easy_post_public_ids)
const outputFilePath = `/Users/smarston/Downloads/KibanaLog_${output.msg.params.action}_${preferredOutputId}.txt`
fs.writeFileSync(outputFilePath, `order or shipment ID: ${preferredOutputId}\n\n${JSON.stringify(getSingleKibanaDetails(ship), null, 4)}`);
console.log(`Details written to:\n${outputFilePath}`)
