#!/bin/bash

echo "installing package dependencies"
yarn workspaces foreach --all install
sleep .5


echo "building web-components"
cd packages/web-components
yarn build
sleep .5

echo "building core package"
cd ../core
yarn build
sleep .5

echo "starting storybook"
cd ../storybook
yarn storybook
