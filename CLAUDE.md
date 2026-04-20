# Claude TypeScript Cookbooks

A collection of Jupyter notebooks and TypeScript examples for building with the Claude API.

## Quick Start

```bash
# Install dependencies
npm install

# Set up API key
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

## Development Commands

```bash
npm run format      # Format code with Prettier
npm run lint        # Run ESLint
npm run check       # Run type-check + lint
npm run fix         # Auto-fix ESLint issues + format
npm run test        # Run Jest tests
npm run build       # Compile TypeScript
```

Or directly with npx:

```bash
npx prettier --write .         # Format
npx eslint .                   # Lint
npx eslint --fix .             # Auto-fix
npx tsc --noEmit               # Type-check only
```

## Code Style

- **Line length:** 100 characters
- **Quotes:** Single quotes
- **Formatter:** Prettier
- **Linter:** ESLint with `@typescript-eslint`

Notebooks use the Deno kernel (`typescript` language) for in-notebook TypeScript execution.

## Git Workflow

**Branch naming:** `<username>/<feature-description>`

**Commit format (conventional commits):**
```
feat(scope): add new feature
fix(scope): fix bug
docs(scope): update documentation
style: lint/format
```

## Key Rules

1. **API Keys:** Never commit `.env` files. Use `dotenv` then access keys via `process.env.ANTHROPIC_API_KEY`.

2. **Dependencies:** Use `npm install <package>` or `npm install --save-dev <package>`. Keep `package.json` and `package-lock.json` in sync.

3. **Models:** Use current Claude models. Check docs.anthropic.com for latest versions.
   - Sonnet: `claude-sonnet-4-6`
   - Haiku: `claude-haiku-4-5`
   - Opus: `claude-opus-4-6`
   - **Never use dated model IDs** (e.g., `claude-sonnet-4-6-20250514`). Always use the non-dated alias.

4. **Notebooks:**
   - Use the Deno kernel for TypeScript notebooks (language: `typescript`)
   - Keep outputs in notebooks (intentional for demonstration)
   - One concept per notebook
   - Test that notebooks run top-to-bottom without errors
   - Import `@anthropic-ai/sdk` at the top of the first code cell

5. **TypeScript:**
   - Strict mode enabled (`"strict": true` in tsconfig.json)
   - Prefer `const` over `let`; avoid `var`
   - Always type function parameters and return values explicitly
   - Use `async/await` over raw Promises

6. **Quality checks:** Run `npm run check` before committing.

## Slash Commands

These commands are available in Claude Code and CI:

- `/notebook-review` - Review notebook quality
- `/model-check` - Validate Claude model references
- `/link-review` - Check links in changed files

## Project Structure

```
misc/              # Batch processing, JSON mode, caching, utilities
tool_use/          # Tool use and integration patterns
capabilities/      # Core Claude capabilities (RAG, classification, etc.)
extended_thinking/ # Extended reasoning patterns
multimodal/        # Vision and image processing
src/               # Shared TypeScript utility modules
```