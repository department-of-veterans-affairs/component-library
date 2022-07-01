/* eslint-disable no-console */
/**
 * Ensure that we're publishing from the main branch.
 */

const { execSync } = require('child_process');
const chalk = require('chalk');

const branchName = execSync('git branch --show-current')
  .toString('utf8')
  .trim();

if (branchName !== 'main') {
  console.log(
    chalk.yellow(
      `You're currently on branch ${chalk.cyan(
        branchName,
      )}\nPlease check out ${chalk.cyan('main')} before publishing.\n`,
    ),
  );
  process.exit(1);
}
