#/bin/bash
set -e

echo no-need-to-deploy >RESULT
node bin/latest_version.js
RESULT=$(cat RESULT)
npm install
npm update
# Former workaround for missing operators.js file
# sed -e "s/'\./'.\/operators/" <node_modules/rxjs/operators/index.js >node_modules/rxjs/operators.js
node bin/make_bundle.js
