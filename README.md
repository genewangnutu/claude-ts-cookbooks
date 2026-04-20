# Claude TypeScript Cookbooks

TypeScript versions of the Claude Cookbooks — code and guides for building with the Claude API using the Anthropic TypeScript SDK (`@anthropic-ai/sdk`).

## Prerequisites

- A Claude API key (sign up for free at [console.anthropic.com](https://console.anthropic.com/settings/keys))
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) v9 or higher

All notebooks use the **tslab** kernel to execute TypeScript directly inside Jupyter. See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions.

## Quick Start

```bash
# 1. Install project dependencies
npm install

# 2. Copy and fill in your API key
cp .env.example .env
# Edit .env → set ANTHROPIC_API_KEY=sk-ant-...

# 3. Install the TypeScript Jupyter kernel (one-time setup)
npm install -g tslab
tslab install

# 4. Open any notebook and select the "TypeScript (tslab)" kernel
```

## Explore Further

- [Anthropic developer documentation](https://docs.anthropic.com)
- [Anthropic TypeScript SDK](https://github.com/anthropics/anthropic-sdk-typescript)
- [Anthropic Discord community](https://www.anthropic.com/discord)

## Table of Recipes

### Misc
- [Prompting Claude for "JSON Mode"](misc/how_to_enable_json_mode.ipynb) — Reliable structured JSON output using prefill and XML tags
