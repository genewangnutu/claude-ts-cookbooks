# Claude TypeScript Cookbooks

TypeScript versions of the Claude Cookbooks — code and guides for building with the Claude API using the Anthropic TypeScript SDK (`@anthropic-ai/sdk`).

## Prerequisites

- A Claude API key (sign up for free at [console.anthropic.com](https://console.anthropic.com/settings/keys))
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.org/) v9 or higher
- [Deno](https://deno.com/) v1.37 or higher

All notebooks use the **Deno** kernel to execute TypeScript directly inside Jupyter. See [CONTRIBUTING.md](CONTRIBUTING.md) for full setup instructions.

## Quick Start

```bash
# 1. Install project dependencies (for dev tools: ESLint, Prettier, tsc, etc.)
npm install

# 2. Copy and fill in your API key
cp .env.example .env
# Edit .env → set ANTHROPIC_API_KEY=sk-ant-...

# 3. Install Deno (if not already installed)
# See https://docs.deno.com/runtime/getting_started/installation/

# 4. Register the Deno kernel with Jupyter (one-time setup)
deno jupyter --install

# 5. Verify the kernel is installed
jupyter kernelspec list
# You should see "deno" in the output

# 6. Open any notebook and select the "Deno" kernel