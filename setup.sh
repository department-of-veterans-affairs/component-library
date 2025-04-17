#!/bin/bash

echo "Installing package dependencies"
yarn workspaces foreach --all install
sleep .5

echo "Building web-components"
cd packages/web-components
yarn build
sleep .5

echo "Building core package"
cd ../core
yarn build
sleep .5

echo "Starting storybook"
cd ../storybook
yarn storybook
