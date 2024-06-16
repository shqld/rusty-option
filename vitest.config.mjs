import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		watch: !process.env.CI,
		include: ["**/*.{test,doctest}.ts"],
		globals: true,
		alias: {
			"rusty-option": ".",
		},
	},
});
