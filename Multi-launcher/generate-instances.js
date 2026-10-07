const fs = require('fs');
const path = require('path');

const INSTANCE_COUNT = 10;
const BASE_PORT = 1990;

// Resolve the base directory dynamically (portable)
const baseDir = path.resolve(__dirname, '..');
const settingsDir = path.join(__dirname, 'settings');
const userDirRoot = path.join(baseDir, 'userDir');

function removeIfExists(targetPath) {
  if (fs.existsSync(targetPath)) {
    fs.rmSync(targetPath, { recursive: true, force: true });
  }
}

fs.mkdirSync(settingsDir, { recursive: true });

for (const entry of fs.readdirSync(settingsDir, { withFileTypes: true })) {
  const match = entry.name.match(/^settings_(\d+)\.js$/);
  if (entry.isFile() && match && Number(match[1]) >= INSTANCE_COUNT) {
    removeIfExists(path.join(settingsDir, entry.name));
  }
}

if (fs.existsSync(userDirRoot)) {
  for (const entry of fs.readdirSync(userDirRoot, { withFileTypes: true })) {
    const match = entry.name.match(/^instance_(\d+)$/);
    if (entry.isDirectory() && match && Number(match[1]) >= INSTANCE_COUNT) {
      removeIfExists(path.join(userDirRoot, entry.name));
    }
  }
}

for (let i = 0; i < INSTANCE_COUNT; i += 1) {
  const port = BASE_PORT + i;
  const instance = `instance_${i}`;

  // Define full paths for userDir and settings
  const userDir = path.join(baseDir, 'userDir', instance);
  const settingsFile = path.join(__dirname, 'settings', `settings_${i}.js`);

  // Ensure user directory exists
  fs.mkdirSync(userDir, { recursive: true });

  // Generate the settings content with absolute, escaped path
  const settings = `
module.exports = {
    uiPort: ${port},
    userDir: "${path.resolve(userDir).replace(/\\/g, '\\\\')}",
    flowFile: "flows_${instance}.json",
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    }
};`;

  // Ensure settings folder exists and write the file
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });
  fs.writeFileSync(settingsFile, settings);
}
