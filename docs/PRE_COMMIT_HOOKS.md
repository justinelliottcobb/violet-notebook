# Pre-Commit Hooks

This project uses automated pre-commit hooks to ensure code quality and consistency.

## What happens on commit

Every time you run `git commit`, the following checks run automatically:

1. **TypeScript Check** - Runs `tsc` to verify all TypeScript code compiles without errors
2. **ESLint** - Runs `eslint --fix` on staged JavaScript/TypeScript files to catch and auto-fix issues

## Setup

The hooks are automatically installed when you run `npm install` (via the `prepare` script).

### Manual setup (if needed)
```bash
npm install
npx husky init
```

## Configuration

- **Husky**: Manages git hooks (`.husky/pre-commit`)
- **lint-staged**: Runs linters only on staged files (`package.json` → `lint-staged`)

## Scripts

- `npm run pre-commit` - Manually run the pre-commit checks
- `npm run typecheck` - Run TypeScript compiler check  
- `npm run lint` - Run ESLint on all files

## Bypassing hooks (emergency only)

If you absolutely need to bypass the hooks:
```bash
git commit --no-verify -m "your message"
```

**⚠️ Warning**: Only use `--no-verify` in emergencies. All commits should pass quality checks.

## Troubleshooting

### "TypeScript errors prevent commit"
Fix the TypeScript errors shown in the output, then try committing again.

### "ESLint errors prevent commit"  
Most ESLint issues are auto-fixed. For remaining issues, fix them manually then commit again.

### "Hook takes too long"
The TypeScript check runs on the entire project. For large codebases, this is normal and ensures type safety.