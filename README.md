# rusty-option

A rusty Option for TypeScript.

> [!WARNING]
> This is a **Proof of Concept (PoC)**.
> It’s not meant for production: each method is intentionally verbose to show how this PoC works.
> Use it to experiment and maybe get inspired to build something even better!

## 🚀 Why rusty-option?

Here’s what makes **rusty-option** worth exploring:

1. **if-let in TypeScript**
   Rust’s `if-let` is adapted to TypeScript using `for-of`. This approach enables concise and readable handling of optional values.

2. **Minimal Core**
   The core implementation of `Some` and `None` is simple yet functional. Check out the code:
   - **Some**: https://github.com/shqld/rusty-option/blob/b331678ecb06da8a40a0bb7e1ae6735974268ac9/src/option.ts#L408-L410
   - **None**: https://github.com/shqld/rusty-option/blob/b331678ecb06da8a40a0bb7e1ae6735974268ac9/src/option.ts#L414-L416

## 📖 Example

```ts
import { Option, Some, None } from "rusty-option";

let debug = Option.from(process.env.DEBUG);

for (let v of debug) {
  console.log(`debug on: ${v}`);
}

let text = process.env.TEXT;
let result = Option.from(text.match(/rusty_(.+)/));

for (let [_, somethingRusty] of result) {
  console.log(`rusty: ${somethingRusty}`);
}

let n = Math.random() > 0.5 ? Some("foo") : None;

n.map((n) => n.length).mapOr(42, (v) => v * 14); // 42;
```

See also:

- https://github.com/shqld/rusty-option/blob/main/example.test.ts
- https://github.com/shqld/rusty-option/blob/main/src/option.ts

### 🔧 Installation

```console
$ npm i rusty-option
```
