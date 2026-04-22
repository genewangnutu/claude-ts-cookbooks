Reset the worktree to the current commit of the main repo's active branch by following these steps:

**Step 1** — Gather current environment information:

```bash
CURRENT_WT=$(pwd)
MAIN_GIT=$(git rev-parse --git-common-dir)
MAIN_REPO=$(dirname "$MAIN_GIT")
WORKTREES_DIR="$MAIN_REPO/.claude/worktrees"
ACTIVE_BRANCH=$(git -C "$MAIN_REPO" branch --show-current)
CURRENT_COMMIT=$(git -C "$MAIN_REPO" rev-parse HEAD)
NEW_NAME="local-$(date +%Y%m%d%H%M%S)"
NEW_BRANCH="claude/$NEW_NAME"
NEW_PATH="$WORKTREES_DIR/$NEW_NAME"
echo "Repo       : $MAIN_REPO"
echo "Branch     : $ACTIVE_BRANCH"
echo "Commit     : $CURRENT_COMMIT"
echo "New path   : $NEW_PATH"
echo "New branch : $NEW_BRANCH"
```

**Step 2** — Create a new worktree based on the active branch's current commit:

```bash
git -C "$MAIN_REPO" worktree add -b "$NEW_BRANCH" "$NEW_PATH" "$CURRENT_COMMIT"
```

**Step 3** — If the current session is already inside a worktree, run the command below to get the old worktree's absolute path in Windows format and note it in the conversation context, then exit the old worktree using the ExitWorktree tool (action: "keep"), and proceed to Step 4. If not inside a worktree, skip this step.

```bash
echo "G:$(pwd | sed 's|/g||')"
```

**Step 4** — Use the EnterWorktree tool to switch to the new worktree (path in Windows format, e.g. `G:/mtrow_daemon/.claude/worktrees/<NEW_NAME>`).

**Step 5** — Delete the old worktree using the absolute path noted in Step 3:

```bash
git -C "$MAIN_REPO" worktree remove "<path noted in Step 3>" --force
```

**Step 6** — Report completion: display the new worktree path, branch name, base commit hash, and active branch name.
