/**
 * Sectioned Message Markup Language (SMML) utilities for packing, unpacking, and validating sectioned messages.
 */

/**
 * Packs a JSON object into SMML format.
 * @param {Object} json - The JSON object to pack.
 * @returns {string} - The SMML-formatted message.
 */
function packToSMML(json) {
  let smmlMessage = "";
  for (const key in json) {
    if (Object.prototype.hasOwnProperty.call(json, key)) {
      smmlMessage += `[${key}]${json[key]}[/${key}]`;
    }
  }
  return smmlMessage;
}

/**
 * Unpacks an SMML-formatted message into a JSON object.
 * @param {string} smmlMessage - The SMML-formatted message.
 * @returns {Object} - The unpacked JSON object.
 */
function unpackFromSMML(smmlMessage) {
  const regex = /\[([a-zA-Z0-9_]+)\](.*?)\[\/\1\]/g;
  const result = {};
  let match;

  while ((match = regex.exec(smmlMessage)) !== null) {
    const [_, section, content] = match;
    result[section] = content;
  }

  return result;
}

/**
 * Validates an SMML-formatted message against the schema.
 * @param {string} smmlMessage - The SMML-formatted message.
 * @param {Object} schema - The validation schema with allowed and mandatory sections.
 * @returns {Object} - Validation result with `valid` and `error` keys.
 */
function validateSMML(smmlMessage, schema) {
  const { allowed, mandatory } = schema;

  // Extract sections from the message
  const regex = /\[([a-zA-Z0-9_]+)\](.*?)\[\/\1\]/g;
  const sectionsInMessage = [];
  let match;

  while ((match = regex.exec(smmlMessage)) !== null) {
    sectionsInMessage.push(match[1]);
  }

  // Check for invalid sections
  const invalidSections = sectionsInMessage.filter(
    (section) => !allowed.includes(section)
  );
  if (invalidSections.length > 0) {
    return {
      valid: false,
      error: `Invalid sections found: ${invalidSections.join(", ")}`,
    };
  }

  // Check for missing mandatory sections
  const missingSections = mandatory.filter(
    (section) => !sectionsInMessage.includes(section)
  );
  if (missingSections.length > 0) {
    return {
      valid: false,
      error: `Missing mandatory sections: ${missingSections.join(", ")}`,
    };
  }

  return { valid: true, error: null };
}

module.exports = {
  packToSMML,
  unpackFromSMML,
  validateSMML,
};
