#!/bin/sh

cd packages/web-components
yarn install
yarn build
yarn build-bindings
cd ../react-components
yarn install
yarn build
cd ../core
yarn install
yarn build
cd ../design-system-dashboard-cli
yarn report
