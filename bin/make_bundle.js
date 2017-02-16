const Builder = require('systemjs-builder');
const matchVersion = require('./match_version');

function bundle() {
  const builder = new Builder('./');
  builder.config({
    paths: {
      'rxjs/*': 'node_modules/rxjs/*.js',
      'symbol-observable/*': 'node_modules/symbol-observable/*',
    },
    map: {
      'rxjs': 'node_modules/rxjs'
    },
    packages: {
      'rxjs': {
        main: 'Rx.js',
        defaultExtension: 'js'
      },
      'symbol-observable': {
        main: 'index.js'
      }
    }
  });

  console.log("Bundling Rx");
  return builder.bundle('rxjs', 'Rx.system.js', {
    sourceMaps: true
  }).then(ignored => {
    builder.bundle('rxjs', 'Rx.system.min.js', {
      sourceMaps: true,
      minify: true
    });
  });
}

matchVersion(err => {
  if (err) {
    console.error(err);
    exit(60);
  } else {
    bundle();
  }
});
