const fs = require('fs');
const path = require('path');

// Loop through 10 instances
for (let i = 0; i < 10; i++) {
  const port = 1880 + i;
  const instance = `instance_${i}`;

  // Paths relative to multi-launcher/
  const userDir = path.join(__dirname, '..', 'userDir', instance);
  const settingsFile = path.join(__dirname, 'settings', `settings_${i}.js`);

  // Create the userDir folder if it doesn't exist
  fs.mkdirSync(userDir, { recursive: true });

  // Settings file content
  const settings = `
module.exports = {
    uiPort: ${port},
    userDir: "${userDir.replace(/\\/g, '\\\\')}",
    flowFile: "flows_${instance}.json",
    logging: {
        console: {
            level: "info",
            metrics: false,
            audit: false
        }
    }
};`;

  // Make sure the settings directory exists
  fs.mkdirSync(path.dirname(settingsFile), { recursive: true });

  // Write the settings file
  fs.writeFileSync(settingsFile, settings);
}
