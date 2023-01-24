const { spawnSync } = require('child_process');
const { repos } = require('./env');

const verbose = true;
const vLog = stuff => (verbose ? console.log(stuff) : '');

Object.keys(repos).forEach((/** @type {string} */ repo) => {
  vLog(`Repo: ${repo}`);
  const spawnOptions = { cwd: repos[repo] };

  let gitResult;
  try {
    vLog('Trying git pull');
    gitResult = spawnSync('git', ['pull'], spawnOptions);
    vLog(gitResult.output.toString());
  } catch (err) {
    console.log('Git Error:', err);
  }

  let yarnResult;
  try {
    vLog('Trying yarn');
    yarnResult = spawnSync('yarn', spawnOptions);
    vLog(yarnResult.stdout.toString());
  } catch (err) {
    console.log('Yarn Error:', err);
  }
});
