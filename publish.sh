#!/bin/bash

sh ./build.sh

cd pkg

npm publish --access public

cd -
