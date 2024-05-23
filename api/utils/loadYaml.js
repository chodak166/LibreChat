const fs = require('fs');
const yaml = require('js-yaml');

function loadYaml(filepath) {
  try {
    let fileContents = fs.readFileSync(filepath, 'utf8');

    // Replace expressions like ${env:MY_VARIABLE} with actual environment variables
    fileContents = fileContents.replace(/\${env:([^}]+)}/g, (match, envVar) => {
      return process.env[envVar] || match; // Replace with env var value or keep the original if not defined
    });

    return yaml.load(fileContents);
  } catch (e) {
    return e;
  }
}

module.exports = loadYaml;
