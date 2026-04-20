# Contributing to Claude TypeScript Cookbooks

Thank you for your interest! This guide walks you through setting up the development environment and running the TypeScript notebooks.

## Development Setup

### Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org/)
- **npm** v9 or higher (bundled with Node.js)
- **Python** 3.8 or higher with **Jupyter** (needed to run the kernel)
- **Anaconda / Miniconda** (recommended) or a plain `pip` install of Jupyter

> To check what you have: `node --version`, `npm --version`, `jupyter --version`

---

### Step 1 — Clone & Install Project Dependencies

```bash
git clone <your-repo-url>
cd claude-ts-cookbooks

# Install @anthropic-ai/sdk and all dev dependencies
npm install
```

---

### Step 2 — Set Up Your API Key

```bash
cp .env.example .env
# Open .env and replace the placeholder with your real key:
#   ANTHROPIC_API_KEY=sk-ant-...
# Get your key at: https://console.anthropic.com/settings/keys
```

---

### Step 3 — Install the TypeScript Jupyter Kernel (tslab)

**tslab** lets Jupyter notebooks execute TypeScript via Node.js. This is a **one-time global install**.

```bash
# Install tslab globally
npm install -g tslab

# Register the TypeScript (and JavaScript) kernel with Jupyter
tslab install
```

Verify the kernel is registered:

```bash
jupyter kernelspec list
# Expected output includes:
#   tslab   C:\Users\<you>\AppData\Roaming\jupyter\kernels\tslab
#   jslab   C:\Users\<you>\AppData\Roaming\jupyter\kernels\jslab
```

---

### Step 4 — Open a Notebook in VS Code

1. Open any `.ipynb` file in `claude-ts-cookbooks/`
2. Click **Select Kernel** (top-right corner of the notebook)
3. Choose **TypeScript (tslab)**

> **Tip:** If TypeScript doesn't appear in the kernel list after installing tslab, run  
> `Ctrl+Shift+P` → `Developer: Reload Window` to force VS Code to re-scan kernels.

---

### Step 5 — Run Notebooks

Each notebook is self-contained. Execute cells top-to-bottom:
- `Ctrl+Enter` — run current cell
- `Shift+Enter` — run current cell and advance
- **Run All** button — execute all cells in sequence

> **Note:** tslab runs TypeScript in the Node.js environment. The `@anthropic-ai/sdk` package
> is resolved from `claude-ts-cookbooks/node_modules` (installed in Step 1), so no extra
> install is needed per notebook.

---

## Code Quality

```bash
npm run format    # Prettier
npm run lint      # ESLint
npm run check     # Type-check + lint (run before committing)
npm run fix       # Auto-fix ESLint + Prettier
npm run build     # Compile TypeScript under src/
```

---

## Key Rules

1. **API Keys** — Never commit `.env`. Always use `.env.example` as the template.
2. **Models** — Use non-dated aliases: `claude-opus-4-6`, `claude-sonnet-4-6`, `claude-haiku-4-5`.
3. **Notebooks** — One concept per notebook. Keep outputs for demonstration purposes.
4. **TypeScript** — Strict mode is on. Type all function parameters and return values.
