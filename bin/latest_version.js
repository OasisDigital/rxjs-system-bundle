const fs = require('fs');
const api = require('api-npm');

const packageFileName = '../package.json';
const package = require(packageFileName);

const matchVersion = require('./match_version');

const latest = package => package['dist-tags'].latest;

api.getdetails('rxjs', rxjs => {
  api.getdetails(package.name, systemBundle => {

    if (latest(rxjs) == latest(systemBundle)) {
      console.error("At most recent version");
      process.exit(0);
    }

    const lastVersion = latest(rxjs);
    console.log("Writing package.json with latest version", lastVersion);
    package.devDependencies.rxjs = lastVersion;
    fs.writeFileSync(packageFileName, JSON.stringify(package, null, 2) + '\n');

    matchVersion(err => {
      if (err) {
        console.error(err);
        process.exit(60);
      }
    });

    fs.writeFileSync('RESULT', 'deploy');
  });
});
