#!/bin/sh

echo "Make sure you have the latest changes in your vets-website and content-build repos, and that they are locally on the 'main' branch!\n\n"
cd packages/design-system-dashboard-cli
yarn report
echo "\n\n"
yarn get-sheets
