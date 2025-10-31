# GitHub Actions Workflows Documentation

## Overview
This repository contains 7 comprehensive GitHub Actions workflows designed to automate various aspects of the development lifecycle for the heavens-above project.

## Workflow Details

### 1. Continuous Integration (`.github/workflows/ci.yml`)

**Purpose:** Automates testing, linting, and code quality checks on every push and pull request.

**Triggers:**
- Push to `main` or `master` branch
- Pull requests to `main` or `master` branch

**Jobs:**
- **test**: Runs tests across multiple Node.js versions (12.x, 14.x, 16.x, 18.x)
  - Installs dependencies
  - Runs ESLint
  - Executes Jest tests
  - Generates coverage reports
  - Uploads artifacts
  
- **lint**: Dedicated linting job
  - Checks code style and syntax
  - Enforces coding standards

**How to Interpret Results:**
- ✅ Green checkmark = All checks passed
- ❌ Red X = One or more checks failed
- Yellow circle = Workflow is running
- Click on the check to see detailed logs

**Troubleshooting:**
- If tests fail: Check the "Run tests" step logs
- If linting fails: Run `npm run lint:fix` locally
- If Node version fails: Check compatibility in package.json

---

### 2. Deployment Pipeline (`.github/workflows/deploy.yml`)

**Purpose:** Automates building and deploying the application to GitHub Pages.

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch with environment selection

**Stages:**
1. **Build**: Installs dependencies and prepares application
2. **Test**: Runs tests before deployment
3. **Deploy**: Publishes to GitHub Pages

**Configuration:**
- Deployment URL: `https://[username].github.io/[repository-name]`
- Uses `peaceiris/actions-gh-pages@v3` for deployment

**How to Interpret Results:**
- Success: Application deployed to GitHub Pages
- Failure: Check build/test logs
- Manual deployment: Use "Run workflow" button in Actions tab

**Security Notes:**
- Uses `GITHUB_TOKEN` (automatically provided)
- No sensitive data exposed
- Public deployment

---

### 3. Scheduled Tasks (`.github/workflows/scheduled-tasks.yml`)

**Purpose:** Automates daily maintenance tasks including data scraping.

**Triggers:**
- Daily at 2:00 AM UTC (cron: `0 2 * * *`)
- Manual workflow dispatch

**Tasks:**
- Runs data scraping (`node run.js`)
- Commits updated data to repository
- Generates status reports
- Creates issue notification on failure

**How to Interpret Results:**
- Check workflow runs in Actions tab
- Success = Task completed without errors
- Failure = Issue created automatically
- Review commit history for data updates

**Modifying Schedule:**
Edit the cron expression in the workflow file:
- Format: `minute hour day month weekday`
- Example: `0 2 * * *` = Daily at 2 AM UTC

---

### 4. Dependency Updates (`.github/workflows/dependency-updates.yml`)

**Purpose:** Automates dependency monitoring and testing updates.

**Configuration:**
- **Dependabot** (`.github/dependabot.yml`): Automatically creates PRs for dependency updates
  - Runs weekly on Mondays at 9:00 AM
  - Creates up to 10 PRs at once
  - Labels PRs with "dependencies"

**Workflow Actions:**
- Tests dependency updates in PRs
- Runs security audits
- Validates compatibility
- Posts PR comments with results

**How to Interpret Results:**
- Check Dependabot PRs in Pull Requests tab
- Review PR comments for test results
- Merge PRs that pass all checks
- Review security audit results

**Best Practices:**
- Review each PR before merging
- Test locally if needed
- Keep dependencies updated regularly

---

### 5. Code Review Workflow (`.github/workflows/code-review.yml`)

**Purpose:** Automates code review tasks for pull requests.

**Triggers:**
- Pull request opened, synchronized, or reopened

**Checks:**
- ESLint code analysis
- Security vulnerability scanning
- Code complexity analysis
- Automated PR comments

**How to Interpret Results:**
- Review PR comments for automated feedback
- Check artifacts for detailed reports
- Fix issues marked by ESLint
- Address security vulnerabilities

**Required Checks:**
- This workflow should be set as required in branch protection rules
- Prevents merging if code quality checks fail

---

### 6. Documentation Deployment (`.github/workflows/documentation.yml`)

**Purpose:** Automatically builds and deploys project documentation.

**Triggers:**
- Push to `main` branch (only when README.md or docs/ changes)
- Manual workflow dispatch

**Process:**
- Copies README.md and docs/ files
- Generates HTML documentation
- Deploys to GitHub Pages

**How to Interpret Results:**
- Documentation available at: `https://[username].github.io/[repository-name]/docs/`
- Check Actions tab for deployment status
- View generated HTML in artifacts

**Customization:**
- Add files to `docs/` directory for additional documentation
- Modify HTML template in workflow file

---

### 7. Custom Workflow - Release Notes (`.github/workflows/release-notes.yml`)

**Purpose:** Automatically generates and publishes release notes.

**Triggers:**
- Tag push (tags starting with `v*`, e.g., `v1.0.0`)
- Manual workflow dispatch with tag input

**Actions:**
- Extracts commit messages since last tag
- Generates formatted release notes
- Creates GitHub release
- Attaches source code archive

**How to Use:**
1. **Via Tag:**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   