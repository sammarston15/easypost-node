// THIS TOOL CALCULATES THE LENGTH PLUS GIRTH OF A PARCEL (BASED ON THE ORDER OR SHIPMENT PROVIDED TO MISC.JSON FILE) AND SUGGESTS DIMENSION CHANGES TO MEET A SPECIFIED LIMIT (DEFAULT 165)

import { readFileSync } from 'node:fs';

function calculateLengthPlusGirth(parcel) {
	const { length = 0, width = 0, height = 0 } = parcel;
	return length + 2 * (width + height);
}

function getDimensionChangesForLimit(parcel, maxLengthPlusGirth = 165) {
	const { length = 0, width = 0, height = 0 } = parcel;
	const current = calculateLengthPlusGirth(parcel);
	const excess = current - maxLengthPlusGirth;

	if (excess <= 0) {
		return {
			current,
			target: maxLengthPlusGirth,
			excess: 0,
			alreadyCompliant: true,
			options: []
		};
	}

	const reduceLengthBy = Math.min(excess, length);
	const reduceWidthBy = Math.min(excess / 2, width);
	const reduceHeightBy = Math.min(excess / 2, height);

	return {
		current,
		target: maxLengthPlusGirth,
		excess,
		alreadyCompliant: false,
		options: [
			{
				name: 'Reduce length only',
				delta: Number(reduceLengthBy.toFixed(2)),
				changes: {
					length: Number(reduceLengthBy.toFixed(2)),
					width: 0,
					height: 0
				},
				newDimensions: {
					length: Number((length - reduceLengthBy).toFixed(2)),
					width,
					height
				}
			},
			{
				name: 'Reduce width only',
				delta: Number(reduceWidthBy.toFixed(2)),
				changes: {
					length: 0,
					width: Number(reduceWidthBy.toFixed(2)),
					height: 0
				},
				newDimensions: {
					length,
					width: Number((width - reduceWidthBy).toFixed(2)),
					height
				}
			},
			{
				name: 'Reduce height only',
				delta: Number(reduceHeightBy.toFixed(2)),
				changes: {
					length: 0,
					width: 0,
					height: Number(reduceHeightBy.toFixed(2))
				},
				newDimensions: {
					length,
					width,
					height: Number((height - reduceHeightBy).toFixed(2))
				}
			}
		]
	};
}

const miscData = JSON.parse(readFileSync(new URL('../misc.json', import.meta.url), 'utf8'));
function containsOrderId(value) {
	if (typeof value === 'string') {
		return value.startsWith('order_');
	}

	if (Array.isArray(value)) {
		return value.some(containsOrderId);
	}

	if (value && typeof value === 'object') {
		return Object.values(value).some(containsOrderId);
	}

	return false;
}

function getParcelsFromPayload(payload) {
	const rootId = typeof payload?.id === 'string' ? payload.id : '';
	const rootPublicId = typeof payload?.public_id === 'string' ? payload.public_id : '';
	const rootObject = typeof payload?.object === 'string' ? payload.object : '';

	const hasOrderIndicator =
		rootObject === 'Order' || rootId.startsWith('order_') || rootPublicId.startsWith('order_');
	const hasShipmentIndicator =
		rootObject === 'Shipment' || rootId.startsWith('shp_') || rootPublicId.startsWith('shp_');

	const isOrderPayload =
		hasOrderIndicator && Array.isArray(payload?.shipments);

	if (isOrderPayload) {
		const parcels = payload.shipments
			.map((shipment, index) => ({
				index,
				parcel: shipment?.parcel
			}))
			.filter((entry) => entry.parcel);

		return {
			payloadType: 'order',
			parcels
		};
	}

	const isShipmentPayload =
		hasShipmentIndicator && !containsOrderId(payload);

	if (isShipmentPayload && payload?.parcel) {
		return {
			payloadType: 'shipment',
			parcels: [{ index: 0, parcel: payload.parcel }]
		};
	}

	throw new Error(
		'Could not identify misc.json as a valid EasyPost Order or Shipment payload with parcel data.'
	);
}

function printParcelResult(parcel) {
	const lengthPlusGirth = calculateLengthPlusGirth(parcel);
	const dimensionChanges = getDimensionChangesForLimit(parcel, 165);

	console.log('Current length + girth:', Number(lengthPlusGirth.toFixed(2)));

	if (dimensionChanges.alreadyCompliant) {
		console.log('Parcel is already at or below 165. No changes needed.');
		return;
	}

	console.log('Excess over 165:', Number(dimensionChanges.excess.toFixed(2)));
	console.log('Dimension change options to reach 165 or less:');
	dimensionChanges.options.forEach((option) => {
		const { length, width, height } = option.newDimensions;
		console.log(
			`   - ${option.name}: +${option.delta} | new dims: {length: ${length}, width: ${width}, height: ${height}}`
		);
	});
}

const { parcels } = getParcelsFromPayload(miscData);

if (parcels.length === 0) {
	throw new Error('No parcels found in misc.json.');
}

if (parcels.length > 1) {
	parcels.forEach(({ index, parcel }) => {
		console.log(`shipment ${index}`);
		printParcelResult(parcel);
	});
} else {
	printParcelResult(parcels[0].parcel);
}

export { calculateLengthPlusGirth, getDimensionChangesForLimit };
