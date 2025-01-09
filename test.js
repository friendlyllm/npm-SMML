const { packToSMML, unpackFromSMML, validateSMML } = require("./index");

const schema = {
  allowed: ["header", "body", "footer"],
  mandatory: ["header", "body"],
};

const json = { header: "Hello", body: "This is a test.", footer: "Goodbye." };
const smmlMessage = packToSMML(json);

console.log("Packed:", smmlMessage);

const unpacked = unpackFromSMML(smmlMessage);
console.log("Unpacked:", unpacked);

const validation = validateSMML(smmlMessage, schema);
console.log("Validation:", validation);
