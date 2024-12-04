import { afterEach, describe, expect, test } from "vitest";
import { None, Option, Some } from ".";

describe("Option", () => {
	test("Some", () => {
		expect(Some).toBe(Option.Some);
	});

	test("None", () => {
		expect(None).toBe(Option.None);
	});
});

describe("for-of", () => {
	let called = false;

	afterEach(() => {
		called = false;
	});

	test("Some", () => {
		for (const v of Some("Some")) {
			called = true;
			expect(v).toBe("Some");
		}

		expect(called).toBe(true);
	});

	test("None", () => {
		for (const v of None) {
			called = true;
			expect(v).toBe("Some");
		}

		expect(called).toBe(false);
	});
});

describe("from", () => {
	test("Some", () => {
		const option = Option.from("Some");
		expect(option.isSome()).toBe(true);
		expect(option.unwrap()).toBe("Some");
	});

	test("None", () => {
		const option = Option.from(null);
		expect(option.isNone()).toBe(true);
		expect(() => option.unwrap()).toThrow();
	});
});

describe("name", () => {
	test("Some", () => {
		expect(Some("Some").constructor.name).toBe("Some");
	});

	test("None", () => {
		expect(None.constructor.name).toBe("None");
	});
});

describe("instanceof", () => {
	test("Some", () => {
		expect(Some("Some") instanceof Option).toBe(true);

		// NOTE: We should use 'for .. of' to check the variant
		//       of an Option rather than 'if .. instanceof'.
		const option = Some("Some");
		expect(option instanceof Some).toBe(false);
	});

	test("None", () => {
		expect(None instanceof Option).toBe(true);

		// NOTE: We should not rely on 'if .. instanceof' because
		//       using None in a non-TypeScript environment by mistake
		//       will result in a runtime error.
		const option = None;
		// @ts-expect-error: ts(2359)
		expect(option instanceof None).toBe(false);
	});
});
