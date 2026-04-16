const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const INSTANCE_COUNT = 10;
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

try {
  for (let i = 0; i < INSTANCE_COUNT; i += 1) {
    removeIfExists(path.join(userDirRoot, `instance_${i}`));
    removeIfExists(path.join(settingsDir, `settings_${i}.js`));
  }

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
