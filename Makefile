.PHONY: help install dev build preview clean

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies
	yarn install

dev: ## Start development server
	yarn dev

build: ## Build the project for production
	yarn build

preview: ## Preview the production build locally
	yarn preview

clean: ## Remove build artifacts
	rm -rf dist .astro
