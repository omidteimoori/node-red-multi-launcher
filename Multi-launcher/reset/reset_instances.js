const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const multiLauncherDir = path.resolve(__dirname, '..');
const baseDir = path.resolve(multiLauncherDir, '..');
const userDirRoot = path.join(baseDir, 'userDir');
const settingsDir = path.join(multiLauncherDir, 'settings');
const generatorScript = path.join(multiLauncherDir, 'generate-instances.js');

function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

function removeMatchingEntries(rootDir, pattern) {
  if (!fs.existsSync(rootDir)) {
    return;
  }

  for (const entry of fs.readdirSync(rootDir, { withFileTypes: true })) {
    if (pattern.test(entry.name)) {
      removeIfExists(path.join(rootDir, entry.name));
    }
  }
}

try {
  removeMatchingEntries(userDirRoot, /^instance_\d+$/);
  removeMatchingEntries(settingsDir, /^settings_\d+\.js$/);

  if (fs.existsSync(settingsDir) && fs.readdirSync(settingsDir).length === 0) {
    fs.rmdirSync(settingsDir);
  }

  const result = spawnSync(process.execPath, [generatorScript], {
    cwd: baseDir,
    stdio: 'inherit',
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }

  console.log('All Node-RED instance data has been reset to a clean state.');
  console.log('The next launch will start with empty flows and no user-installed instance nodes.');
} catch (error) {
  console.error('Failed to reset the Node-RED instances.');
  console.error(error.message);
  process.exit(1);
}
