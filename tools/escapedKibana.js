// REPLACE inputText with the text you want to escape for Kibana Query Language (KQL) and build a KQL query.

// Escape special characters so text can be safely used in Kibana Query Language.
const KQL_SPECIAL_CHARS_REGEX = /([\\:+\-=&|><!(){}\[\]^"~*?:/])/g

const escapeForKql = (text) => {
	if (text === null || text === undefined) {
		return ""
	}

	return String(text).replace(KQL_SPECIAL_CHARS_REGEX, "\\$1")
}

const normalizeToSingleLine = (text) => {
	return String(text)
		.replace(/[\r\n\t]+/g, " ")
		.replace(/ {2,}/g, " ")
		.trim()
}

const toKqlEscapedText = (value) => {
	const text = typeof value === "string"
		? value
		: JSON.stringify(value, null, 4)

	return escapeForKql(normalizeToSingleLine(text))
}

const buildKqlFieldContains = (field, value) => {
	const escapedValue = toKqlEscapedText(value)
	return `${field}:"${escapedValue}"`
}

// Example input from JSON text where quotes and colons need escaping.
const inputText = `"length": 10,
	"width": 6,
	"height": 2.7,`

const escapedText = toKqlEscapedText(inputText)
const kqlQuery = buildKqlFieldContains("msg.params_full", inputText)

console.log("Escaped text:\n", escapedText)
console.log("\nKQL query:\n", kqlQuery)

export { escapeForKql, toKqlEscapedText, buildKqlFieldContains }
