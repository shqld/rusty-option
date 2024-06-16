SHELL			:= /bin/bash
NODE_MODULES	:= node_modules
OUT		     	:= dist

.PHONY: setup
setup: install
	@$(NODE_MODULES)/.bin/husky

# ---

.PHONY: install
install:
	@make $(NODE_MODULES)

.PHONY: build
build:
	@make $(OUT)

$(NODE_MODULES): package.json pnpm-lock.yaml
	@pnpm install

$(OUT): src/** tsconfig.json package.json
	@$(NODE_MODULES)/.bin/tsc --outDir $(OUT)
	@touch $(OUT)

# ---

.PHONY: check
check: lint type test

.PHONY: lint
lint:
	@$(NODE_MODULES)/.bin/biome check .

.PHONY: fix
fix:
	@$(NODE_MODULES)/.bin/biome check . --apply

.PHONY: type
type:
	@$(NODE_MODULES)/.bin/tsc --noEmit

.PHONY: test
test: ./src/option.doctest.ts
	@$(NODE_MODULES)/.bin/vitest

.PHONY: coverage
coverage:
	@$(NODE_MODULES)/.bin/vitest run --coverage --coverage.reporter html
	@open coverage/index.html

.PHONY: clean
clean:
	@rm -rf $(OUT)

# ---

./src/option.doctest.ts: ./src/option.ts
	@$(NODE_MODULES)/.bin/tsdoc-testify --filepath $<
