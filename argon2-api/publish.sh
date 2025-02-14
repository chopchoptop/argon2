#!/bin/bash

pnpm i

pnpm run build

npm publish --access public
