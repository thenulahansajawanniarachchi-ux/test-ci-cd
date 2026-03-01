# GitHub Actions CI/CD Workflows

This repository contains a comprehensive CI/CD pipeline using GitHub Actions for the React application.

## 🚀 Workflow Files

### 1. `ci-cd.yml` - Main CI/CD Pipeline
**Triggers**: Push to `main`/`develop` branches, Pull Requests to `main`

**Jobs**:
- **test**: Runs tests on Node.js 18.x & 20.x
  - Linting
  - Unit tests
  - Integration tests  
  - UI tests
  - Coverage reporting
- **build**: Builds the application
- **deploy-staging**: Deploys to staging (develop branch)
- **deploy-production**: Deploys to production (main branch)
- **security-scan**: Security audits and Snyk scanning
- **performance-test**: Lighthouse CI performance testing
- **notify**: Sends notifications on pipeline completion

### 2. `code-quality.yml` - Code Quality Checks
**Triggers**: Push to `main`/`develop`, PRs to `main`

**Features**:
- ESLint analysis
- Prettier formatting check
- SonarCloud code analysis
- Bundle size analysis
- TypeScript checking (if applicable)

### 3. `dependabot.yml` - Dependency Updates
**Triggers**: Weekly on Mondays at 09:00 UTC

**Features**:
- Automatic npm dependency updates
- GitHub Actions updates
- Pull request creation with reviewers/assignees

### 4. `release.yml` - Release Management
**Triggers**: Git tags (v*)

**Features**:
- Automated release creation
- Build artifact upload
- Release asset management

## 🔧 Required Secrets

Configure these secrets in your GitHub repository settings:

### Required for all workflows:
- `GITHUB_TOKEN`: Automatically provided by GitHub Actions

### Optional but recommended:
- `SONAR_TOKEN`: For SonarCloud code analysis
- `SNYK_TOKEN`: For Snyk security scanning
- `SLACK_WEBHOOK`: For Slack notifications
- `DISCORD_WEBHOOK`: For Discord notifications

### Deployment secrets (configure based on your hosting):
- `NETLIFY_AUTH_TOKEN`: Netlify deployment
- `NETLIFY_SITE_ID`: Netlify site ID
- `VERCEL_TOKEN`: Vercel deployment
- `AWS_ACCESS_KEY_ID`: AWS S3 deployment
- `AWS_SECRET_ACCESS_KEY`: AWS S3 deployment
- `AWS_S3_BUCKET`: AWS S3 bucket name

## 🌍 Environments

### Staging
- **Trigger**: Push to `develop` branch
- **URL**: Configure based on your hosting provider
- **Protection**: Optional deployment protection rules

### Production
- **Trigger**: Push to `main` branch
- **URL**: Configure based on your hosting provider
- **Protection**: Required reviewers, wait timer, deployment protection

## 📊 Monitoring & Reporting

### Code Coverage
- Generated with Vitest
- Uploaded to Codecov
- View in PR checks and Codecov dashboard

### Code Quality
- SonarCloud analysis
- ESLint reports
- Prettier formatting checks

### Performance
- Lighthouse CI scores
- Bundle size monitoring
- Performance budgets

### Security
- npm audit reports
- Snyk vulnerability scanning
- Dependency update monitoring

## 🔄 Customization

### Adding Deployment Steps
Update the deployment jobs in `ci-cd.yml`:

```yaml
- name: Deploy to [Your Platform]
  run: |
    # Add your deployment commands here
    echo "Deploying to [Your Platform]..."
```

### Custom Notifications
Modify the `notify` job to add your preferred notification service:

```yaml
- name: Send Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Environment-Specific Config
Create environment-specific configuration files:
- `.env.staging`
- `.env.production`

## 🛠️ Local Development

### Setup
```bash
# Install dependencies
npm install

# Run tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:ui

# Code quality checks
npm run lint
npm run format:check

# Build application
npm run build
```

### Pre-commit Hooks
```bash
# Install husky hooks
npm run prepare

# Lint-staged will run on commit
git add .
git commit -m "feat: add new feature"
```

## 📈 Performance Metrics

### Lighthouse CI Thresholds
- Performance: 80+ (warn)
- Accessibility: 90+ (error)
- Best Practices: 80+ (warn)
- SEO: 80+ (warn)

### Bundle Size Limits
- JavaScript: 200KB (gzipped)
- CSS: 50KB (gzipped)

## 🔍 Troubleshooting

### Common Issues
1. **Tests failing**: Check test logs and ensure all dependencies are installed
2. **Build failures**: Verify build configuration and dependencies
3. **Deployment issues**: Check deployment secrets and environment configuration
4. **Performance failures**: Review Lighthouse reports and optimize assets

### Debugging
- Check the Actions tab in GitHub for detailed logs
- Use `act` for local GitHub Actions testing
- Review SonarCloud for code quality issues
- Check Codecov for coverage reports

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SonarCloud Documentation](https://docs.sonarcloud.io/)
- [Codecov Documentation](https://docs.codecov.com/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Snyk Documentation](https://support.snyk.io/hc/en-us)
