# SMML: Sectioned Message Markup Language

&#x20;

## Overview

**SMML** is an npm package that provides a powerful and lightweight markup language designed for structuring and styling content in discrete sections. **SMML** (Sectioned Message Markup Language) is a powerful and lightweight markup language designed for structuring and styling content in discrete sections. Its primary purpose is to enable LLMs (Large Language Models) to support multi-channel inputs and outputs. SMML is simple, efficient, and designed to integrate seamlessly into Markdown-supported environments without conflicts.

---

## Installation

You can install SMML via npm or GitHub Registry.

### npm Registry

```bash
npm install smml
```

### GitHub Registry

```bash
npm install @friendlyllm/smml
```

Alternatively, you can clone the GitHub repository:

```bash
git clone https://github.com/friendlyllm/smml.git
cd smml
npm install
```

---

## Usage

Here’s a simple example of SMML syntax:

```smml
<<header>>This is a header<</header>>
<<body>>This is a paragraph.<</body>>
```

This example illustrates the simplicity of SMML. Each tag represents a discrete section of content, making it easy to define headers, bodies, or other sections in a structured and readable format.

### Sectioned Message Input and Output for LLM

**Input:**

```smml
<<message>>What is the capital of France?<</message>>
<<memory>>The user name is Ryan.<</memory>>
```

**Output:**

```smml
<<message>>Ryan, the capital of France is Paris.<</message>>
<<memory>>The user name is Ryan and has shown interest in geography and capitals.<</memory>>
```

### Function Details

#### `packToSMML(json)`

- **Description:** Converts a JSON object into an SMML-formatted string.
- **Parameters:**
  - `json` (Object): The JSON object to convert.
- **Returns:** A string containing the SMML-formatted message.
- **Example:**
  ```javascript
  const smmlMessage = packToSMML({ header: "Hello", body: "World" });
  console.log(smmlMessage); // <<header>>Hello<</header>><<body>>World<</body>>
  ```

#### `unpackFromSMML(smmlMessage)`

- **Description:** Parses an SMML-formatted string and converts it back into a JSON object.
- **Parameters:**
  - `smmlMessage` (string): The SMML-formatted string to parse.
- **Returns:** A JSON object representation of the SMML message.
- **Example:**
  ```javascript
  const json = unpackFromSMML(
    "<<header>>Hello<</header>><<body>>World<</body>>"
  );
  console.log(json); // { header: 'Hello', body: 'World' }
  ```

#### `validateSMML(smmlMessage, schema)`

- **Description:** Validates an SMML-formatted string against a schema to ensure compliance.
- **Parameters:**
  - `smmlMessage` (string): The SMML-formatted string to validate.
  - `schema` (Object): An object containing:
    - `allowed` (Array): A list of allowed section tags.
    - `mandatory` (Array): A list of mandatory section tags.
- **Returns:** An object with two keys:
  - `valid` (boolean): Indicates if the message is valid.
  - `error` (string|null): Describes any validation errors.
- **Example:**
  ```javascript
  const schema = { allowed: ["header", "body"], mandatory: ["header"] };
  const validation = validateSMML("<<header>>Hello<</header>>", schema);
  console.log(validation); // { valid: true, error: null }
  ```

---

## Features

- **Simple Syntax:** Write structured documents easily with a straightforward format. SMML avoids nested tags, simplifying parsing and rendering.
- **Markdown Compatibility:** Designed not to conflict with Markdown, enabling smooth integration.
- **Customizable:** Extendable to support custom tags and styles.
- **Lightweight:** Minimal dependencies for optimal performance.

---

## Dependencies

This package has no external dependencies, making it particularly easy to integrate into existing projects without adding additional overhead.

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

## Support

If you have questions or need help, please [open an issue](https://github.com/friendlyllm/smml/issues) or visit the GitHub repository hosted under the FriendlyLLM namespace: [friendlyllm/smml](https://github.com/friendlyllm/smml).
