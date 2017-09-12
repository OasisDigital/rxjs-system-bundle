const fs = require('fs');
const api = require('api-npm');

const matchVersion = require('./match_version');

const packageFileName = '../package.json';
const package = require(packageFileName);
const rxjsVersion = package.devDependencies.rxjs;

api.getdetails('rxjs', data => {
  const versionList = Object.keys(data.versions);
  console.log('Available versions', versionList);
  console.log('Using version', rxjsVersion);
  const currentIndex = versionList.indexOf(rxjsVersion);
  if (currentIndex == -1) {
    console.error("current version not in the list");
    process.exit(50);
  }
  if (currentIndex == versionList.length - 1) {
    console.error("At most recent version");
    process.exit(51);
  }
  const nextVersion = versionList[currentIndex + 1];

  console.log("Writing package.json with new version", nextVersion);
  package.devDependencies.rxjs = nextVersion;
  fs.writeFileSync(packageFileName, JSON.stringify(package, null, 2) + '\n');

  matchVersion(err => {
    if (err) {
      console.error(err);
      process.exit(60);
    }
  });
});
