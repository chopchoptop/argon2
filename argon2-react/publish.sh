#!/bin/bash

pnpm i

pnpm run package

npm publish --access public
