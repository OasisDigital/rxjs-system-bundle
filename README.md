# RxJS System Bundle

This package provides a System bundle of RxJS. This is only a convenience
package, it does **not** add or change any functionality.

RxJS itself is found here:

https://github.com/ReactiveX/rxjs

The official NPM package provided by the RxJS project provide only source files
and a UMD bundle. For reasons discussed in the RxJS issue tracker, the project
no longer provides its own System bundles.

##  Where is this useful?

An NPM-published System bundle is very convenient for use in a Plunkr or other
contexts where a local build process is avoided. All of this probably makes a
lot of sense to you if you are familiar with Angular 2+ (which depends on RxJS)
and SystemJS. However, neither RxJS nor this repackaging are specific to
Angular.

## Versions

I will attempt to update this package for each new version of RxJS, from 5.0.1
onward. Each version of this bundle package exactly matching each underlying
RxJS version. Sometime there is -N added to the end of the version, for tweaks
to this bundling mechanism/repo which don't affect the RxJS version.

To list all available versions, use npm:

```
npm show rxjs-system-bundle@* version
```

## CDN

Conveniently, the Unpkg service provides a CDN for NPM package contents.
Therefore the System bundle is available at a URL like this:

https://unpkg.com/rxjs-system-bundle@VERSIONHERE/Rx.system.min.js

(Change VERSIONHERE to the RxJS version).

Both minified and plain variations are published, both including source maps. To
see the exact filenames available, install the package locally:

```
npm install rxjs-system-bundle
```

and look in node_modules/rxjs-system-bundle, or look at:

https://unpkg.com/rxjs-system-bundle@VERSIONHERE/

(The set of files is the same for each version.)

## See it in action

The following Plunkr illustrates use of this package. Of course there are many
other practical uses, but this one can be seen with one click. Unlike a default
Angular 2+ plunker, this one uses only a single request for all of RxJS.

https://plnkr.co/edit/Fy0jvu?p=preview

To see how to configure System to use this RxJS System bundle, see the Plunkr or
the configuration snippet below.

```
System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  bundles: {
    "npm:rxjs-system-bundle@5.3.1/Rx.system.js": [
      "rxjs",
      "rxjs/*",
      "rxjs/operator/*",
      "rxjs/observable/*",
      "rxjs/scheduler/*",
      "rxjs/symbol/*",
      "rxjs/add/operator/*",
      "rxjs/add/observable/*",
      "rxjs/util/*"
    ]
  },
  map: {
    'app': './src',

    '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',

    'typescript': 'npm:typescript@2.0.2/lib/typescript.js'
  },
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: false
    }
  }
});
```
