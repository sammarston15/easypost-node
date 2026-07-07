// THIS TOOL TAKES THE DATA FROM THE "PLEASE MANIFEST OR VOID" EMAILS AND OUTPUTS COMMA-SEPARATED CANADA POST SHIPMENT IDS

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function getShipmentIdsFromFile(filePath) {
	const fileContents = fs.readFileSync(filePath, 'utf8');
	const lines = fileContents.split(/\r?\n/);

	const shipmentIds = lines
		.map((line) => line.match(/\d+/)?.[0])
		.filter(Boolean);

	return shipmentIds.join(',');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, 'misc.txt');
const shipmentIdsCsv = getShipmentIdsFromFile(inputPath);

console.log(shipmentIdsCsv);

