const fs = require('fs');

function match(cb) {
  const packageFileName = '../package.json';
  const package = require(packageFileName);
  const rxjsVersion = package.devDependencies.rxjs;
  package.version = rxjsVersion;
  fs.writeFile('package.json', JSON.stringify(package, null, 2) + '\n', cb);
}

module.exports = match;
