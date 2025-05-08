const fs = require('fs');
const path = require('path');

for (let i = 0; i < 10; i++) {
  const port = 1880 + i; // updated port range: 1880–1889
  const instance = `instance_${i}`;

  // Resolve the base directory dynamically (portable)
  const baseDir = path.resolve(__dirname, '..');

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