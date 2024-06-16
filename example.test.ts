import * as fs from "node:fs";
import { afterEach, describe, expect, test, vi } from "vitest";
import { None, Option, Some } from "./src";

let called: boolean = false;

afterEach(() => {
	called = false;
});

describe("process.env", () => {
	process.env.RUSTY_OPTION = "true";

	test("Some", () => {
		for (let m of Option.from(process.env.RUSTY_OPTION)) {
			called = true;
			expect(m).toBe("true");
		}
		expect(called).toBe(true);
	});

	test("None", () => {
		for (let [m] of Option.from(process.env.NON_EXISTENT_VAR)) {
			called = true;
			expect(m).toBe("true");
		}
		expect(called).toBe(false);
	});
});

describe("Regexp:exec", () => {
	// biome-ignore lint/nursery/useTopLevelRegex: ignore
	const RE = /hello/;

	test("Some", () => {
		for (let [m] of Option.from(RE.exec("hello"))) {
			called = true;
			expect(m).toBe("hello");
		}
		expect(called).toBe(true);
	});

	test("None", () => {
		for (let [m] of Option.from(RE.exec("world"))) {
			called = true;
			expect(m).toBe("hello");
		}
		expect(called).toBe(false);
	});
});

describe("readFile", () => {
	function readFileSync(path: "./a" | "./b"): Option<string> {
		try {
			return Some(fs.readFileSync(path, "utf8"));
		} catch {
			return None;
		}
	}

	test("readFileSync: Some", () => {
		for (let file of readFileSync("./a")) {
			called = true;
			expect(file).toBe("file content");
		}
		expect(called).toBe(true);
	});

	test("readFileSync: None", () => {
		for (let file of readFileSync("./b")) {
			called = true;
			expect(file).toBe("file content");
		}
		expect(called).toBe(false);
	});

	async function readFile(path: "./a" | "./b"): Promise<Option<string>> {
		try {
			return Some(await fs.promises.readFile(path, "utf8"));
		} catch {
			return None;
		}
	}

	test("readFile: Some", async () => {
		for (let file of await readFile("./a")) {
			called = true;
			expect(file).toBe("file content");
		}
		expect(called).toBe(true);
	});

	test("readFile: Some", async () => {
		for (let file of await readFile("./b")) {
			called = true;
			expect(file).toBe("file content");
		}
		expect(called).toBe(false);
	});

	vi.mock("node:fs", () => ({
		readFileSync: vi.fn().mockImplementation((path) => {
			if (path === "./a") {
				return "file content";
			} else {
				throw new Error("file not found");
			}
		}),
		promises: {
			readFile: vi.fn().mockImplementation(async (path) => {
				if (path === "./a") {
					return "file content";
				} else {
					throw new Error("file not found");
				}
			}),
		},
	}));
});
