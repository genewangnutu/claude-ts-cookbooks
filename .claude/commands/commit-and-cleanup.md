# /commit-and-cleanup

Commit all uncommitted changes with an appropriate message, then clean up any stale Claude Code worktrees.

## Steps

### 1. Check for uncommitted changes

Run `git status` to see the current state of the working tree.

- If the working tree is **clean** (nothing to commit), skip to Step 3.
- If there are **untracked or modified files**, continue to Step 2.

### 2. Stage and commit

1. Run `git diff HEAD` and `git status` to read and understand all uncommitted changes.
2. Compose a concise, conventional-commit style message that accurately describes the changes:
   - Format: `<type>(<scope>): <short description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
   - Keep the subject line under 72 characters
   - If changes span multiple concerns, write a multi-line body
3. **If any `.ipynb` files are being committed, verify nbstripout before staging:**
   a. Check that nbstripout is installed and reachable via the configured Python:
      ```bash
      git config filter.nbstripout.clean   # shows the configured command
      <python> -m nbstripout --version     # must succeed
      ```
   b. For each `.ipynb` in the changeset, confirm the filter strips correctly:
      ```bash
      <python> -m nbstripout < notebook.ipynb | <python> -c "
      import sys, json; nb = json.load(sys.stdin)
      cells = [c for c in nb['cells'] if c['cell_type']=='code']
      assert all(c['outputs'] == [] for c in cells), 'outputs not stripped!'
      assert all(c['execution_count'] is None for c in cells), 'exec_count not stripped!'
      print('nbstripout OK')
      "
      ```
   c. If nbstripout is missing or the assertion fails, **do not commit** — fix the filter first.
4. Run `git add .`
5. Run `git commit -m "<message>"`
6. **After committing, verify the committed notebook is clean:**
   ```bash
   git show HEAD:<path/to/notebook.ipynb> | <python> -m nbstripout > /tmp/_stripped.ipynb
   diff <(git show HEAD:<path/to/notebook.ipynb>) /tmp/_stripped.ipynb \
     && echo "committed notebook is clean" \
     || echo "WARNING: committed notebook differs from nbstripout output"
   ```

### 3. Clean up stale worktrees

1. Run `git worktree list` to list all worktrees.
2. For each worktree whose path is under `.claude/worktrees/`:
   a. Run `git worktree remove "<path>" --force`
   b. If the directory still exists (e.g. locked by OS), delete it with:
      - Windows: `Remove-Item -Recurse -Force "<path>"`
      - Unix: `rm -rf "<path>"`
3. Run `git worktree prune` to clean up any leftover metadata.
4. Confirm with a final `git worktree list` — only the main worktree should remain.

### 4. Report

Print a summary:
- Commit hash and message (or "nothing to commit")
- nbstripout verification result for any committed notebooks
- List of worktrees removed
