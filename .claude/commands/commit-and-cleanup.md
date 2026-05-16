# /commit-and-cleanup

Commit all uncommitted changes with an appropriate message, then clean up any stale Claude Code worktrees.

## Steps

### 1. Check for uncommitted changes

This command may run inside a git worktree. Always check **both** the current worktree and the main worktree:

```bash
git worktree list                        # identify main worktree path (first entry)
git status                               # current worktree
git -C <main-worktree-path> status       # main worktree
```

- If **both** are clean (nothing to commit), skip to Step 3.
- If **either** has staged, modified, or untracked files, continue to Step 2 for that worktree.
- Commit each worktree separately if both have changes.

### 2. Stage and commit

1. Run `git diff HEAD` and `git status` (and `git -C <main-worktree-path> diff HEAD` / `status` for the main worktree) to read and understand all uncommitted changes.
2. Compose a concise, conventional-commit style message that accurately describes the changes:
   - Format: `<type>(<scope>): <short description>`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
   - Keep the subject line under 72 characters
   - If changes span multiple concerns, write a multi-line body
3. **If any `.ipynb` files are being committed, strip outputs BEFORE staging — this is mandatory:**

   > **Why this matters:** `.gitattributes` may reference a `nbstripout` git filter, but if the filter is not configured in git config, `git add` will silently stage notebooks with outputs intact. Always strip manually to guarantee clean commits.

   a. Find the Python executable that has nbstripout installed:
      ```bash
      python3.10 -m nbstripout --version   # try until one works
      python3 -m nbstripout --version
      python -m nbstripout --version
      ```
      **If none work:** install nbstripout (`pip install nbstripout`) before proceeding. Do not skip this.

   b. **Strip every `.ipynb` in the changeset in-place before staging:**
      ```bash
      python3.10 -m nbstripout {path}/my_notebook.ipynb   # repeat for each .ipynb
      ```

   c. Verify each stripped notebook has no outputs:
      ```bash
      python3.10 -c "
      import json
      nb = json.load(open('{path}/my_notebook.ipynb', encoding='utf-8'))
      cells = [c for c in nb['cells'] if c.get('cell_type')=='code']
      assert all(c.get('outputs') == [] for c in cells), 'outputs not stripped!'
      assert all(c.get('execution_count') is None for c in cells), 'exec_count not stripped!'
      print('nbstripout OK: all outputs cleared')
      "
      ```
      **If the assertion fails, do not proceed — re-run step 3b and check again.**

   d. Optionally check git filter status (informational only — manual strip above is the real enforcement):
      ```bash
      git config filter.nbstripout.clean   # empty = filter not configured (OK, we already stripped manually)
      ```

4. Run `git add .`
5. Run `git commit -m "<message>"`
6. **After committing, verify the committed notebook is clean:**
   ```bash
   python3.10 -c "
   import subprocess, json
   raw = subprocess.check_output(['git', 'show', 'HEAD:thinking/my_notebook.ipynb'])
   nb = json.loads(raw)
   cells = [c for c in nb['cells'] if c.get('cell_type')=='code']
   dirty = [i for i,c in enumerate(cells) if c.get('outputs') or c.get('execution_count') is not None]
   if dirty:
       print('WARNING: committed notebook still has outputs in cells:', dirty)
   else:
       print('committed notebook is clean')
   "
   ```

### 3. Clean up stale worktrees

Run `/refresh-worktree` to create a fresh worktree based on the main branch's current commit, exit the current worktree, and delete both the old worktree directory and its branch. Follow all steps in that command, including Step 7 (delete old branch).

### 4. Report

Print a summary:
- Commit hash and message (or "nothing to commit")
- nbstripout verification result for any committed notebooks
- List of worktrees removed
