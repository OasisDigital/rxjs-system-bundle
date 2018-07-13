const fs = require('fs');
const Builder = require('systemjs-builder');
const builder = new Builder('./');

builder.config({

  paths: {
    'rxjs/*': 'rxjs/*.js',
    'rxjs-compat/*': 'rxjs-compat/*.js',
    'rxjs/internal-compatibility': 'rxjs/internal-compatibility/index.js',
    'rxjs/testing': 'rxjs/testing/index.js',
    'rxjs/ajax': 'rxjs/ajax/index.js',
    'rxjs/operators': 'rxjs/operators/index.js',
    'rxjs/webSocket': 'rxjs/webSocket/index.js',
  },
  packages: {
    'rxjs': {
      main: 'index.js',
      defaultExtension: 'js'
    },
    'rxjs-compat': {
      main: "index.js",
      defaultExtension: "js"
    }
  },
  baseURL: "node_modules"
});

const options = {
  normalize: true,
  runtime: false,
  sourceMaps: false,
  sourceMapContents: false,
  minify: true,
  mangle: false
};

builder.bundle('rxjs + rxjs/Rx + rxjs/Observable', options).then(output => {
  let code = output.source
    .replace(/rxjs\/index/gm, 'rxjs')
    .replace(/"rxjs-compat\/add\/observable\//gm, '"rxjs/add/observable/')
    .replace(/"rxjs-compat\/add\/operator\//gm, '"rxjs/add/operator/');
  fs.writeFileSync('./Rx.system.min.js', code);
});