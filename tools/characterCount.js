import { readFile } from "node:fs/promises";

async function getTextFromRootMiscFile() {
    const fileUrl = new URL("../misc.txt", import.meta.url);
    return readFile(fileUrl, "utf8");
}

function getCharacterCount(text) {
    // Count Unicode code points so multi-byte characters are handled correctly.
    return Array.from(text).length;
}

async function main() {
    try {
        const text = await getTextFromRootMiscFile();
        const characterCount = getCharacterCount(text);
        console.log(`Character count: ${characterCount}`);
    } catch (error) {
        console.error("Unable to read misc.txt or count characters:", error);
        process.exit(1);
    }
}

main();

export { getCharacterCount, getTextFromRootMiscFile };
