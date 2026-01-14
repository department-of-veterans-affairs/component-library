# Multi-Team Issue Tracking & Project Management in Monorepo

**Document Version:** 1.0  
**Date:** January 13, 2026  
**For:** Product Managers & Team Leads  
**Purpose:** How to manage issues, projects, and workflows when multiple teams share one repository

---

## Executive Summary

When multiple teams work in a single monorepo, issue tracking can become chaotic without proper organization. This guide provides a practical system for maintaining team autonomy while benefiting from shared infrastructure.

**Key Strategy:** Use GitHub's built-in features (labels, projects, teams, CODEOWNERS) to create virtual boundaries within the shared repository.

---

## The Problem: Issue Overload

**Scenario:** You have 10 teams in one repo, each creating issues.

**Without Organization:**
- Issues list has 500+ issues
- Teams see everyone's issues
- Notifications are overwhelming
- Hard to find relevant issues
- Product managers can't filter effectively

**With Organization:**
- Each team sees only their issues
- Automated routing and assignment
- Clear ownership
- Easy filtering and reporting
- Team autonomy maintained

---

## Solution: Label-Based Organization System

### Core Concept

Use a **hierarchical label system** to create team boundaries:

```
team/benefits          ← Team identifier
team/claims
team/health
team/facilities

area/documentation     ← Content area
area/api
area/components
area/design-system

type/bug              ← Issue type
type/feature
type/docs
type/question

priority/high         ← Priority level
priority/medium
priority/low
```

### Why Labels?

✅ **Filterable** - Click a label to see only those issues  
✅ **Searchable** - `is:issue label:team/benefits label:type/bug`  
✅ **Automatable** - GitHub Actions can auto-apply labels  
✅ **Visual** - Color-coded for quick scanning  
✅ **Flexible** - Add/remove as needed

---

## Implementation Guide

### Step 1: Create Label Taxonomy

**1.1 Create Team Labels**

Create a label for each team:

```bash
# Using GitHub CLI
gh label create "team/benefits" --color "0E8A16" --description "Benefits team issues"
gh label create "team/claims" --color "1D76DB" --description "Claims team issues"
gh label create "team/health" --color "D93F0B" --description "Health team issues"
gh label create "team/facilities" --color "FBCA04" --description "Facilities team issues"
gh label create "team/design-system" --color "5319E7" --description "Design System team issues"
```

**1.2 Create Area Labels**

For different content areas in the monorepo:

```bash
gh label create "area/documentation" --color "C5DEF5" --description "Documentation site issues"
gh label create "area/api-docs" --color "BFD4F2" --description "API documentation"
gh label create "area/components" --color "D4C5F9" --description "Component library"
gh label create "area/web-components" --color "E99695" --description "Web components"
gh label create "area/storybook" --color "F9D0C4" --description "Storybook"
gh label create "area/ci-cd" --color "C2E0C6" --description "CI/CD pipelines"
```

**1.3 Create Type Labels**

Standard issue types:

```bash
gh label create "type/bug" --color "D73A4A" --description "Something isn't working"
gh label create "type/feature" --color "A2EEEF" --description "New feature request"
gh label create "type/docs" --color "0075CA" --description "Documentation improvement"
gh label create "type/question" --color "D876E3" --description "Question or discussion"
gh label create "type/chore" --color "FEF2C0" --description "Maintenance or refactoring"
```

**1.4 Create Priority Labels**

```bash
gh label create "priority/critical" --color "B60205" --description "Critical priority"
gh label create "priority/high" --color "D93F0B" --description "High priority"
gh label create "priority/medium" --color "FBCA04" --description "Medium priority"
gh label create "priority/low" --color "0E8A16" --description "Low priority"
```

**1.5 Create Status Labels (Optional)**

```bash
gh label create "status/blocked" --color "D73A4A" --description "Blocked by something"
gh label create "status/in-progress" --color "FBCA04" --description "Currently being worked on"
gh label create "status/needs-review" --color "0E8A16" --description "Needs review"
gh label create "status/ready" --color "1D76DB" --description "Ready to work on"
```

### Step 2: Create Issue Templates

**2.1 Create Team-Specific Issue Templates**

Create `.github/ISSUE_TEMPLATE/benefits-bug.yml`:

```yaml
name: 🐛 Benefits Team - Bug Report
description: Report a bug in Benefits team applications
title: "[Benefits] "
labels: ["team/benefits", "type/bug"]
assignees:
  - benefits-team-lead

body:
  - type: markdown
    attributes:
      value: |
        ## Benefits Team Bug Report
        
        This issue will be automatically assigned to the Benefits team.

  - type: input
    id: application
    attributes:
      label: Application
      description: Which Benefits application is affected?
      placeholder: ex. Benefits Intake, Disability Compensation
    validations:
      required: true

  - type: textarea
    id: bug-description
    attributes:
      label: Bug Description
      description: What's the bug?
      placeholder: A clear description of what the bug is
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Steps to Reproduce
      description: How do we reproduce this?
      placeholder: |
        1. Go to '...'
        2. Click on '...'
        3. See error
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Expected Behavior
      description: What should happen?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Actual Behavior
      description: What actually happens?
    validations:
      required: true

  - type: dropdown
    id: priority
    attributes:
      label: Priority
      options:
        - Low
        - Medium
        - High
        - Critical
    validations:
      required: true

  - type: input
    id: team-contact
    attributes:
      label: Your Email (optional)
      description: In case we need to follow up
      placeholder: your.name@va.gov
```

**2.2 Create Generic Template for Design System Issues**

Create `.github/ISSUE_TEMPLATE/design-system-feature.yml`:

```yaml
name: ✨ Design System - Feature Request
description: Request a new component or pattern
title: "[DS] "
labels: ["team/design-system", "type/feature"]
assignees:
  - design-system-team-lead

body:
  - type: markdown
    attributes:
      value: |
        ## Design System Feature Request
        
        Request a new component, pattern, or enhancement to the design system.

  - type: dropdown
    id: request-type
    attributes:
      label: Request Type
      options:
        - New Component
        - New Pattern
        - Component Enhancement
        - Documentation Improvement
    validations:
      required: true

  - type: textarea
    id: use-case
    attributes:
      label: Use Case
      description: What problem are you trying to solve?
      placeholder: Describe the use case that requires this feature
    validations:
      required: true

  - type: textarea
    id: proposed-solution
    attributes:
      label: Proposed Solution
      description: How would you like this to work?

  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives Considered
      description: Have you considered other approaches?

  - type: input
    id: team
    attributes:
      label: Your Team
      description: Which team is requesting this?
      placeholder: ex. Benefits, Claims, Health
    validations:
      required: true
```

**2.3 Create Configuration File**

Create `.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: false
contact_links:
  - name: 📖 Documentation
    url: https://design.va.gov
    about: Visit our documentation site for guides and API reference
  
  - name: 💬 Slack Support
    url: https://dsva.slack.com/archives/C0123456789
    about: Get help in the #platform-design-system Slack channel
  
  - name: 🔐 Security Issues
    url: https://github.com/department-of-veterans-affairs/component-library/security/advisories
    about: Report security vulnerabilities privately
```

### Step 3: Set Up GitHub Projects (Team Boards)

**3.1 Create Team-Specific Project Boards**

Each team gets their own project board:

**Benefits Team Board:**
1. Go to repository → Projects → New project
2. Name: "Benefits Team Board"
3. Template: "Team backlog"
4. Configure columns:
   - 📥 Triage (new issues)
   - 📋 Backlog
   - 🏃 In Progress
   - 👀 In Review
   - ✅ Done

**3.2 Configure Automatic Issue Addition**

Set up automation so team issues automatically appear on team board:

```yaml
# Project automation settings
Workflows:
  - Item added to project:
      When: Issues are created or reopened
      Condition: label:team/benefits
      Action: Add to project "Benefits Team Board"
      Set status: Triage

  - Item closed:
      When: Issues are closed
      Action: Set status to Done
```

**3.3 Create Views for Different Perspectives**

On each team project board, create multiple views:

1. **Backlog View** (Board)
   - Filter: `label:team/benefits is:open`
   - Grouped by: Priority
   - Sorted by: Created date

2. **Sprint View** (Board)
   - Filter: `label:team/benefits label:status/in-progress`
   - Grouped by: Assignee
   - Sorted by: Priority

3. **Bug Tracker** (Table)
   - Filter: `label:team/benefits label:type/bug is:open`
   - Columns: Title, Priority, Assignee, Created, Updated
   - Sorted by: Priority (High → Low)

4. **Feature Requests** (Table)
   - Filter: `label:team/benefits label:type/feature`
   - Columns: Title, Assignee, Status, Priority
   - Sorted by: Priority

### Step 4: Configure CODEOWNERS for Auto-Assignment

**4.1 Create/Update CODEOWNERS File**

Create `.github/CODEOWNERS`:

```bash
# Default owners for everything (Design System team)
* @department-of-veterans-affairs/design-system-team

# Team-specific documentation
/teams/benefits/ @department-of-veterans-affairs/benefits-team
/teams/claims/ @department-of-veterans-affairs/claims-team
/teams/health/ @department-of-veterans-affairs/health-team
/teams/facilities/ @department-of-veterans-affairs/facilities-team

# API documentation
/docs/api/ @department-of-veterans-affairs/api-team

# Component packages
/packages/web-components/ @department-of-veterans-affairs/design-system-team
/packages/css-library/ @department-of-veterans-affairs/design-system-team
/packages/storybook/ @department-of-veterans-affairs/design-system-team

# Docusaurus portal
/apps/docs-portal/ @department-of-veterans-affairs/design-system-team

# CI/CD configuration
/.github/ @department-of-veterans-affairs/platform-team
```

**4.2 Configure Auto-Assignment via GitHub Actions**

Create `.github/workflows/auto-assign-issues.yml`:

```yaml
name: Auto-assign Issues

on:
  issues:
    types: [opened]

jobs:
  auto-assign:
    runs-on: ubuntu-latest
    steps:
      - name: Assign issue based on labels
        uses: actions/github-script@v7
        with:
          script: |
            const issue = context.payload.issue;
            const labels = issue.labels.map(l => l.name);
            
            // Team assignment mapping
            const teamAssignments = {
              'team/benefits': ['benefits-pm', 'benefits-tech-lead'],
              'team/claims': ['claims-pm', 'claims-tech-lead'],
              'team/health': ['health-pm', 'health-tech-lead'],
              'team/design-system': ['ds-pm', 'ds-tech-lead']
            };
            
            // Find team label and assign
            for (const [label, assignees] of Object.entries(teamAssignments)) {
              if (labels.includes(label)) {
                await github.rest.issues.addAssignees({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  issue_number: issue.number,
                  assignees: assignees
                });
                
                // Add comment
                await github.rest.issues.createComment({
                  owner: context.repo.owner,
                  repo: context.repo.repo,
                  issue_number: issue.number,
                  body: `👋 This issue has been automatically assigned to the ${label.replace('team/', '')} team. A team member will review it shortly.`
                });
                break;
              }
            }
```

### Step 5: Set Up Saved Filters for Product Managers

**5.1 Create Saved Searches**

Product managers can save common searches:

**Benefits PM's Saved Searches:**

1. **My Team's Open Issues:**
   ```
   is:issue is:open label:team/benefits
   ```
   Bookmark as: `https://github.com/department-of-veterans-affairs/component-library/issues?q=is%3Aissue+is%3Aopen+label%3Ateam%2Fbenefits`

2. **High Priority Bugs:**
   ```
   is:issue is:open label:team/benefits label:type/bug label:priority/high
   ```

3. **Feature Requests Needing Triage:**
   ```
   is:issue is:open label:team/benefits label:type/feature no:assignee
   ```

4. **My Assigned Issues:**
   ```
   is:issue is:open assignee:@me label:team/benefits
   ```

5. **Recently Updated:**
   ```
   is:issue label:team/benefits sort:updated-desc
   ```

**5.2 Create GitHub Search Shortcuts**

Create a wiki page or doc with quick links:

```markdown
# Benefits Team - Quick Issue Links

## Issue Filters
- [📋 All Open Issues](link)
- [🐛 Open Bugs](link)
- [✨ Feature Requests](link)
- [🔥 High Priority](link)
- [❓ Questions](link)

## Project Board
- [📊 Benefits Team Board](link)

## Reports
- [📈 Issue Velocity](link) (last 30 days)
- [📊 Open vs Closed](link) (monthly)
```

### Step 6: Configure Notifications

**6.1 Team Notification Settings**

Each team should configure GitHub Team notifications:

1. Go to GitHub Organization → Teams → [Team Name]
2. Settings → Notifications
3. Configure:
   - ✅ Enable team mentions
   - ✅ Issues with team label
   - ✅ Pull requests in team directories
   - ❌ All repository activity (too noisy)

**6.2 Individual Notification Strategies**

**Product Manager Settings:**
```
Watch: Custom
├── ✅ Issues (only issues with team label)
├── ✅ Pull requests (in team directories)
├── ❌ Releases
├── ❌ Discussions
└── ❌ Security alerts
```

**Developer Settings:**
```
Watch: Custom
├── ✅ Issues (assigned or mentioned)
├── ✅ Pull requests (assigned, mentioned, or in team directories)
├── ✅ Your review is requested
├── ❌ Everything else
```

**6.3 Email Filters**

Set up email filters to organize notifications:

**Gmail Filter Example:**
```
From: notifications@github.com
Subject: [department-of-veterans-affairs/component-library] 
Label: [team/benefits]

→ Apply label: "GitHub/Benefits Team"
→ Skip inbox (optional)
```

---

## Day-to-Day Workflows

### For Product Managers

**Daily Routine:**

1. **Morning: Triage New Issues (10 min)**
   - Visit team project board
   - Check "Triage" column
   - Add priority labels
   - Assign or move to backlog

2. **Check High Priority Items (5 min)**
   - Filter: `label:team/benefits label:priority/high`
   - Ensure someone is working on each
   - Unblock if needed

3. **Review In Progress (5 min)**
   - Check "In Progress" column
   - Update stakeholders
   - Note any blockers

**Weekly Routine:**

1. **Sprint Planning (1 hour)**
   - Review backlog
   - Set priorities
   - Assign issues to sprint

2. **Metrics Review (30 min)**
   - Issues opened vs closed
   - Average time to close
   - Bug rate trends

### For Team Members

**When Starting Work:**

1. Check team project board
2. Pick item from "Ready" column
3. Add `status/in-progress` label
4. Assign to self
5. Move card to "In Progress"

**When Completing Work:**

1. Create PR (automatically links to issue if you use "Closes #123")
2. Move issue to "In Review"
3. Request review from team

**When Issues Arise:**

1. Create issue using team template
2. Team label is auto-applied
3. Issue appears on team board
4. PM triages during daily check

---

## Automation Examples

### Auto-Label Based on Title

```yaml
name: Auto-label Issues

on:
  issues:
    types: [opened]

jobs:
  auto-label:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const title = context.payload.issue.title.toLowerCase();
            const labels = [];
            
            // Auto-detect issue type
            if (title.includes('bug') || title.includes('error') || title.includes('broken')) {
              labels.push('type/bug');
            } else if (title.includes('feature') || title.includes('add') || title.includes('new')) {
              labels.push('type/feature');
            } else if (title.includes('doc') || title.includes('documentation')) {
              labels.push('type/docs');
            }
            
            // Auto-detect team from title prefix
            if (title.startsWith('[benefits]')) {
              labels.push('team/benefits');
            } else if (title.startsWith('[claims]')) {
              labels.push('team/claims');
            }
            
            if (labels.length > 0) {
              await github.rest.issues.addLabels({
                owner: context.repo.owner,
                repo: context.repo.repo,
                issue_number: context.payload.issue.number,
                labels: labels
              });
            }
```

### Stale Issue Management

```yaml
name: Close Stale Issues

on:
  schedule:
    - cron: '0 0 * * *' # Daily

jobs:
  stale:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/stale@v9
        with:
          stale-issue-message: |
            This issue has been automatically marked as stale because it has not had 
            recent activity. It will be closed in 7 days if no further activity occurs.
            
            If this issue is still relevant, please comment to keep it open.
          
          close-issue-message: |
            This issue has been automatically closed due to inactivity. 
            If you still need this addressed, please reopen or create a new issue.
          
          days-before-stale: 60
          days-before-close: 7
          exempt-issue-labels: 'priority/high,priority/critical,status/blocked'
          stale-issue-label: 'status/stale'
```

### Auto-close Duplicate Issues

```yaml
name: Close Duplicates

on:
  issue_comment:
    types: [created]

jobs:
  close-duplicate:
    runs-on: ubuntu-latest
    if: contains(github.event.comment.body, 'duplicate of #')
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.update({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              state: 'closed',
              labels: ['duplicate']
            });
            
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: '✅ Closed as duplicate.'
            });
```

---

## Reporting & Analytics

### Built-in GitHub Insights

Navigate to: Repository → Insights → Community

**Useful Reports:**
- Issue velocity (opened vs closed)
- Time to close issues
- Most active contributors
- Label distribution

### Custom Dashboards with GitHub API

Create `scripts/generate-team-report.js`:

```javascript
#!/usr/bin/env node

/**
 * Generate team issue report
 * Usage: node scripts/generate-team-report.js benefits
 */

const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const teamName = process.argv[2];
if (!teamName) {
  console.error('Usage: node scripts/generate-team-report.js <team-name>');
  process.exit(1);
}

async function generateReport() {
  const owner = 'department-of-veterans-affairs';
  const repo = 'component-library';
  const teamLabel = `team/${teamName}`;
  
  // Fetch issues
  const { data: issues } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    labels: teamLabel,
    state: 'all',
    per_page: 100
  });
  
  // Calculate metrics
  const open = issues.filter(i => i.state === 'open');
  const closed = issues.filter(i => i.state === 'closed');
  const bugs = issues.filter(i => i.labels.some(l => l.name === 'type/bug'));
  const features = issues.filter(i => i.labels.some(l => l.name === 'type/feature'));
  
  // High priority issues
  const highPriority = open.filter(i => 
    i.labels.some(l => l.name === 'priority/high' || l.name === 'priority/critical')
  );
  
  // Average time to close (for closed issues in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  const recentlyClosed = closed.filter(i => 
    new Date(i.closed_at) > thirtyDaysAgo
  );
  
  const avgDaysToClose = recentlyClosed.reduce((sum, issue) => {
    const created = new Date(issue.created_at);
    const closed = new Date(issue.closed_at);
    const days = (closed - created) / (1000 * 60 * 60 * 24);
    return sum + days;
  }, 0) / recentlyClosed.length || 0;
  
  // Generate report
  console.log(`
# ${teamName.toUpperCase()} Team Issue Report
Generated: ${new Date().toLocaleDateString()}

## Summary
- **Total Issues:** ${issues.length}
- **Open:** ${open.length}
- **Closed:** ${closed.length}

## By Type
- **Bugs:** ${bugs.length} (${bugs.filter(i => i.state === 'open').length} open)
- **Features:** ${features.length} (${features.filter(i => i.state === 'open').length} open)

## Priority
- **High/Critical Priority Open:** ${highPriority.length}

## Velocity (Last 30 Days)
- **Issues Closed:** ${recentlyClosed.length}
- **Average Time to Close:** ${avgDaysToClose.toFixed(1)} days

## Top Open Issues
${open.slice(0, 5).map(i => `- [#${i.number}](${i.html_url}) ${i.title}`).join('\n')}

---
View all issues: https://github.com/${owner}/${repo}/issues?q=is%3Aissue+label%3A${teamLabel}
  `);
}

generateReport().catch(console.error);
```

Run weekly:
```bash
node scripts/generate-team-report.js benefits > reports/benefits-weekly.md
```

---

## Best Practices

### For Product Managers

✅ **DO:**
- Triage new issues within 24 hours
- Use consistent labeling
- Keep team board up to date
- Review metrics weekly
- Communicate with other PMs about cross-team issues

❌ **DON'T:**
- Leave issues unlabeled
- Assign issues without checking with team
- Let high-priority issues sit unassigned
- Ignore old/stale issues

### For Teams

✅ **DO:**
- Use issue templates
- Reference issues in PRs (`Closes #123`)
- Update issue status when starting work
- Comment on issues when blocked
- Close issues when complete

❌ **DON'T:**
- Create issues without labels
- Work on issues not in your team's scope without coordination
- Leave issues open after work is done
- Skip the issue entirely (no "surprise PRs")

### For Everyone

✅ **DO:**
- Search for duplicates before creating issues
- Provide clear descriptions
- Tag relevant people
- Keep discussions focused
- Use reactions instead of "+1" comments

❌ **DON'T:**
- Create duplicate issues
- Use issues for general questions (use Slack)
- Have off-topic discussions in issues
- @mention entire teams unnecessarily

---

## Troubleshooting

### Issue: Too Many Notifications

**Solution 1: Adjust Watch Settings**
- Go to repository page
- Click "Watch" → "Custom"
- Select only relevant notification types

**Solution 2: Use Email Filters**
- Filter by `label:team/yourteam`
- Auto-label or skip inbox

**Solution 3: GitHub Notification Settings**
- Settings → Notifications
- Enable "Custom routing"
- Route by team label to specific email

### Issue: Can't Find Team's Issues

**Solution: Use Saved Searches**
```
is:issue label:team/yourteam
```
Bookmark this URL for quick access.

### Issue: Issues Not Appearing on Project Board

**Checklist:**
1. Does issue have team label?
2. Is automation enabled on project?
3. Check project filters
4. Manually add issue to project

### Issue: Wrong Team Assigned

**Solution:**
1. Remove incorrect team label
2. Add correct team label
3. Re-assign to correct team members
4. Comment explaining the change

### Issue: Duplicate Issues Created

**Solution:**
1. Mark one as duplicate: Comment "Duplicate of #123"
2. Close duplicate with "duplicate" label
3. Link to the original issue
4. Consider improving search/templates

---

## Appendix A: Quick Reference

### Common Filter Syntax

```bash
# Team-specific
is:issue label:team/benefits

# By status
is:open
is:closed

# By type
label:type/bug
label:type/feature

# By priority
label:priority/high

# By assignee
assignee:@me
no:assignee

# By date
created:>2024-01-01
updated:<2024-01-01

# Combine filters
is:issue is:open label:team/benefits label:type/bug label:priority/high
```

### Label Quick Reference

| Label Category | Purpose | Examples |
|---------------|---------|----------|
| `team/*` | Team ownership | `team/benefits`, `team/claims` |
| `area/*` | Content area | `area/documentation`, `area/api-docs` |
| `type/*` | Issue type | `type/bug`, `type/feature` |
| `priority/*` | Priority level | `priority/high`, `priority/low` |
| `status/*` | Work status | `status/blocked`, `status/in-progress` |

### GitHub CLI Commands

```bash
# Create issue
gh issue create --label "team/benefits,type/bug" --title "Bug title"

# List team issues
gh issue list --label "team/benefits"

# View issue
gh issue view 123

# Close issue
gh issue close 123

# Assign issue
gh issue edit 123 --add-assignee username

# Add labels
gh issue edit 123 --add-label "priority/high"
```

---

## Appendix B: Team Onboarding Checklist

When onboarding a new team to the monorepo:

- [ ] Create team GitHub team: `@department-of-veterans-affairs/team-name`
- [ ] Create team label: `team/team-name`
- [ ] Add team to CODEOWNERS for their directory
- [ ] Create issue templates for team
- [ ] Create team project board
- [ ] Configure automation for team board
- [ ] Add team to documentation
- [ ] Train PM on issue management
- [ ] Train team on workflow
- [ ] Set up saved searches for PM
- [ ] Add team to metrics dashboard

---

## Summary

**Key Takeaway:** Labels + Projects + Automation = Team Autonomy in Shared Repo

**For Product Managers:**
- Use labels to filter your team's issues
- Use project boards for visualization
- Use saved searches for quick access
- Automate routine tasks

**For Teams:**
- Use templates to create issues
- Work from your team's project board
- Issues automatically routed to your team
- CODEOWNERS protects your code

**For Everyone:**
- One repo, but each team has their own "space"
- Shared infrastructure, separate workflows
- Better discoverability across teams
- Unified search and reporting

---

**Questions?**

Post in #platform-design-system or create an issue with label `type/question`!
