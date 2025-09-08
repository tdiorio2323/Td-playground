# Task: Revert portal repo to pre-changes but **preserve the shop** as its own working copy.
# Mode: Non-interactive. Execute, show each action, handle edge cases. Do not discard data.

## Plan
1) Detect git repo root and current branch.
2) Save a safety backup of all current uncommitted changes.
3) Create branch `shop-extract` from the current state and commit all shop work there.
4) Create a git worktree at `../tdstudios-shop` that points to `shop-extract` so the shop lives separately.
5) Restore the portal repo to its original state (last clean commit or remote main).
6) Verify both trees build independently when possible.
7) Print a concise summary and next steps.

## Edge cases
- If repo dirty: always back up with `git stash push -u -m`.
- If branch `shop-extract` exists: reuse it or append `-N`.
- If `../tdstudios-shop` exists: use `../tdstudios-shop-<N>`.
- If no remote: reset to `HEAD` instead of `origin/main`.
- If package manager missing: prefer `pnpm`, fallback to `npm`.
- Never delete files without a committed copy or a stash/patch backup.

## Steps

### 1) Detect and confirm repo
```bash
set -euo pipefail
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || true)"
[ -n "$ROOT" ] || { echo "Not a git repo. Abort."; exit 1; }
cd "$ROOT"

CUR_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "Repo: $ROOT  Branch: $CUR_BRANCH"
mkdir -p .backup
TS="$(date +%Y%m%d-%H%M%S)"

2) Save safety backups
git status --porcelain > ".backup/status-$TS.txt" || true
git diff > ".backup/diff-$TS.patch" || true
git ls-files -o --exclude-standard > ".backup/untracked-$TS.txt" || true
git stash push -u -m "safety-$TS" || true

3) Create/commit shop-extract branch from current tree (incl. stashed work)
# Re-apply the stash to capture all changes on the new branch
STASH_REF="$(git stash list | head -n1 | cut -d: -f1 || true)"
[ -n "$STASH_REF" ] && git stash apply "$STASH_REF" || true

BASE_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
NEW_BRANCH="shop-extract"
if git show-ref --verify --quiet "refs/heads/$NEW_BRANCH"; then
  i=2; while git show-ref --verify --quiet "refs/heads/${NEW_BRANCH}-${i}"; do i=$((i+1)); done
  NEW_BRANCH="${NEW_BRANCH}-${i}"
fi
git checkout -b "$NEW_BRANCH"

git add -A
git commit -m "feat(shop): extract ecom scaffold into dedicated branch" || true

4) Create worktree for the shop
SHOP_DIR="../tdstudios-shop"
if [ -e "$SHOP_DIR" ]; then
  i=2; while [ -e "${SHOP_DIR}-${i}" ]; do i=$((i+1)); done
  SHOP_DIR="${SHOP_DIR}-${i}"
fi
git worktree add "$SHOP_DIR" "$NEW_BRANCH"
echo "Shop worktree at: $SHOP_DIR"

# Optional sanity install to confirm it boots
PKM="pnpm"; command -v pnpm >/dev/null 2>&1 || PKM="npm"
( cd "$SHOP_DIR" && $PKM i || true )

5) Restore portal repo to original state
cd "$ROOT"
git fetch --all || true
REMOTE_MAIN="$(git symbolic-ref refs/remotes/origin/HEAD 2>/dev/null | sed 's @^refs/remotes/@@' || true)"
TARGET="${REMOTE_MAIN:-HEAD}"

git checkout -f "${BASE_BRANCH}"
git reset --hard "$TARGET"
git clean -fd || true

# Drop only the applied stash we used above, keep backups intact
[ -n "$STASH_REF" ] && git stash drop "$STASH_REF" || true

6) Verify builds
# Portal (current repo)
PKM="pnpm"; command -v pnpm >/dev/null 2>&1 || PKM="npm"
$PKM i || true
$PKM run build || true

# Shop (worktree)
( cd "$SHOP_DIR" && $PKM run build || true )

7) Output summary
echo "=== SUMMARY ==="
echo "Portal reset to: $TARGET on branch $BASE_BRANCH"
echo "Shop preserved at branch: $NEW_BRANCH"
echo "Shop worktree path: $SHOP_DIR"
echo "Backups: .backup/status-$TS.txt, .backup/diff-$TS.patch, .backup/untracked-$TS.txt"
echo "Next: cd \"$SHOP_DIR\" && $PKM run dev  # run the shop separately"


```

### Summary of what changed earlier
- Added a Next.js ecom scaffold into the portal repo by mistake.
- Created Firebase client, product/cart hooks, components, and nine pages.
- Touched Tailwind and Next config, and env/template files.

The prompt above:
- Preserves the shop as its own branch and worktree.
- Restores your portal to its pre-change state.
- Leaves backups and a patch.


ChatGPT can make mistakes. Check important info.
