// TOOL READS A COMMA-SEPARATED LIST OF EASYPOST PUBLIC IDS FROM A TEXT FILE AND OUTPUTS THE ADMIN URLS FOR THOSE IDS


import { readFile } from "node:fs/promises"

const baseURL = "https://easypost-admin.easypo.net/easy_post~shipment"
const EASYPOST_PUBLIC_ID_PATTERN = /\b[a-z][a-z0-9]{1,20}_(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{8,}\b/g

const inputPath = new URL("../misc.txt", import.meta.url)

readFile(inputPath, "utf8")
    .then((inputText) => {
        const shipList = inputText.match(EASYPOST_PUBLIC_ID_PATTERN) ?? []

        if (shipList.length === 0) {
            console.log("No valid EasyPost IDs found in ../misc.txt.")
            return
        }

        const urls = shipList.map((shipmentId) => `${baseURL}/${shipmentId}`)
        console.log(urls.join("\n"))
    })
    .catch((error) => {
        console.error("Failed to read ../misc.txt or generate URLs:", error)
    })
