// THIS TOOL FORMATS THE PAYLOAD PAGE IN EVENTS-ADMIN FOR SENDING TO CUSTOMER

// USAGE: copy page contents of payload page in events admin (starting with the payload id
// then paste into `misc.txt` 
// then run `node tools/formatWebhookPayload.js` 
// or `node tools/formatWebhookPayload.js <inputFile> <outputFile>` (inputFile defaults to misc.txt, outputFile defaults to ~/Downloads/logs_<payloadId>)


import fs from 'fs';
import os from 'os';
import path from 'path';

const SECTION_DIVIDER = '====================';

function getBlock(text, startLabel, endLabel, startFrom = 0) {
  const startToken = `\n${startLabel}\n`;
  const altStartToken = `${startLabel}\n`;

  let start = text.indexOf(startToken, startFrom);
  if (start === -1) {
    start = text.indexOf(altStartToken, startFrom);
    if (start === -1) return '';
    start += altStartToken.length;
  } else {
    start += startToken.length;
  }

  let end = text.length;
  if (endLabel) {
    const endToken = `\n${endLabel}\n`;
    const endTokenIdx = text.indexOf(endToken, start);
    if (endTokenIdx !== -1) end = endTokenIdx;
  }

  return text.slice(start, end).trimEnd();
}

function readSingleValue(section, label) {
  const lines = section.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() === label) {
      for (let j = i + 1; j < lines.length; j += 1) {
        const value = lines[j].trim();
        if (value.length > 0) return value;
      }
    }
  }
  return '';
}

function readListValues(section, label, stopLabels) {
  const lines = section.split('\n').map((line) => line.trim());
  const startIdx = lines.findIndex((line) => line === label);
  if (startIdx === -1) return [];

  const values = [];
  for (let i = startIdx + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.length === 0) continue;
    if (stopLabels.includes(line)) break;
    values.push(line);
  }

  return values;
}

function parseHeaderTable(section) {
  const lines = section.split('\n').map((line) => line.trimEnd());
  const dataLines = lines.filter((line) => line.trim().length > 0 && line.trim() !== 'Name\tValue');

  return dataLines.map((line) => {
    const tabIdx = line.indexOf('\t');
    if (tabIdx === -1) {
      return { key: line.trim(), value: '' };
    }

    const key = line.slice(0, tabIdx).trim();
    const value = line.slice(tabIdx + 1).trim();
    return { key, value };
  });
}

function formatKeyValues(rows) {
  const maxKeyLen = rows.reduce((max, row) => Math.max(max, row.key.length), 0);
  return rows.map((row) => `${row.key.padEnd(maxKeyLen)} : ${row.value}`).join('\n');
}

function prettyJsonBlock(rawBlock) {
  const candidate = rawBlock.trim();
  if (!candidate) return '{}';

  try {
    return JSON.stringify(JSON.parse(candidate), null, 2);
  } catch {
    return candidate;
  }
}

function buildOutput(parsed) {
  const eventKeyValues = [
    { key: 'Description', value: parsed.event.description },
    { key: 'Status', value: parsed.event.status },
    { key: 'Created', value: parsed.event.created },
    { key: 'Updated', value: parsed.event.updated }
  ];

  const payloadKeyValues = [
    { key: 'Created', value: parsed.payload.created },
    { key: 'Target URL', value: parsed.payload.url },
    { key: 'Response Status', value: parsed.payload.responseStatus },
    { key: 'Duration', value: parsed.payload.duration }
  ];

  const responseHeaders = parsed.responseHeaders.map((row) => ({
    key: `  ${row.key}`,
    value: row.value
  }));

  return [
    parsed.line1,
    '',
    SECTION_DIVIDER,
    'EVENT DETAILS',
    SECTION_DIVIDER,
    formatKeyValues(eventKeyValues),
    '',
    'Pending URLs:',
    ...parsed.event.pendingUrls.map((url) => `  - ${url}`),
    '',
    'Completed URLs:',
    ...parsed.event.completedUrls.map((url) => `  - ${url}`),
    '',
    '',
    SECTION_DIVIDER,
    'PAYLOAD DETAILS',
    SECTION_DIVIDER,
    formatKeyValues(payloadKeyValues),
    '',
    '',
    SECTION_DIVIDER,
    'REQUEST HEADERS',
    SECTION_DIVIDER,
    formatKeyValues(parsed.requestHeaders),
    '',
    '',
    SECTION_DIVIDER,
    'REQUEST BODY (JSON)',
    SECTION_DIVIDER,
    parsed.requestBody,
    '',
    '',
    SECTION_DIVIDER,
    'RESPONSE',
    SECTION_DIVIDER,
    `Status: ${parsed.responseStatus}`,
    '',
    'Headers:',
    formatKeyValues(responseHeaders),
    '',
    'Body:',
    parsed.responseBody,
    ''
  ].join('\n');
}

function parseRawPayload(rawText) {
  const normalized = rawText.replace(/\r\n/g, '\n');
  const lines = normalized.split('\n');
  const line1 = lines[0] ?? '';

  const eventSection = getBlock(normalized, 'Event Details', 'Payload Details');
  const payloadSection = getBlock(normalized, 'Payload Details', 'Request Headers');
  const requestHeadersSection = getBlock(normalized, 'Request Headers', 'Request Body');

  const requestBodyStart = normalized.indexOf('\nRequest Body\n');
  const responseStatusAfterBody = normalized.indexOf('\nResponse Status\n', requestBodyStart + 1);
  const requestBodyRaw = requestBodyStart === -1
    ? ''
    : normalized
        .slice(requestBodyStart + '\nRequest Body\n'.length, responseStatusAfterBody === -1 ? normalized.length : responseStatusAfterBody)
        .trim();

  const responseHeadersSection = getBlock(normalized, 'Response Headers', 'Response Body', responseStatusAfterBody === -1 ? 0 : responseStatusAfterBody);
  const responseBodySection = getBlock(normalized, 'Response Body', null, responseStatusAfterBody === -1 ? 0 : responseStatusAfterBody);

  const eventStopLabels = ['Description', 'Status', 'Pending URLs', 'Completed URLs', 'Created', 'Updated'];

  return {
    line1,
    event: {
      description: readSingleValue(eventSection, 'Description'),
      status: readSingleValue(eventSection, 'Status').replace(/^\s+/, ''),
      created: readSingleValue(eventSection, 'Created'),
      updated: readSingleValue(eventSection, 'Updated'),
      pendingUrls: readListValues(eventSection, 'Pending URLs', eventStopLabels),
      completedUrls: readListValues(eventSection, 'Completed URLs', eventStopLabels)
    },
    payload: {
      created: readSingleValue(payloadSection, 'Created'),
      url: readSingleValue(payloadSection, 'URL'),
      responseStatus: readSingleValue(payloadSection, 'Response Status'),
      duration: readSingleValue(payloadSection, 'Duration')
    },
    requestHeaders: parseHeaderTable(requestHeadersSection),
    requestBody: prettyJsonBlock(requestBodyRaw),
    responseStatus: responseStatusAfterBody === -1
      ? readSingleValue(payloadSection, 'Response Status')
      : readSingleValue(normalized.slice(responseStatusAfterBody), 'Response Status'),
    responseHeaders: parseHeaderTable(responseHeadersSection),
    responseBody: prettyJsonBlock(responseBodySection)
  };
}

function extractPayloadId(line1) {
  const match = line1.match(/(payload_[^:\s]+)/);
  return match ? match[1] : 'payload_unknown';
}

function run() {
  const inputArg = process.argv[2] ?? 'misc.txt';
  const inputPath = path.resolve(process.cwd(), inputArg);

  if (!fs.existsSync(inputPath)) {
    console.error(`Input file not found: ${inputPath}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const parsed = parseRawPayload(raw);
  const payloadId = extractPayloadId(parsed.line1);
  const outputArg = process.argv[3] ?? path.join(os.homedir(), 'Downloads', `logs_${payloadId}`);
  const outputPath = path.isAbsolute(outputArg)
    ? outputArg
    : path.resolve(process.cwd(), outputArg);
  const formatted = buildOutput(parsed);

  fs.writeFileSync(outputPath, formatted, 'utf8');
  console.log(`Formatted payload written to ${outputPath}`);
}

run();
