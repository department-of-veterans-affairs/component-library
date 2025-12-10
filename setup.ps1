#!/usr/bin/env pwsh

# PowerShell script to set up the development environment on Windows. Replicates
# the functionality of setup.sh for non-Unix-based systems.

Write-Host "Installing package dependencies"
yarn workspaces foreach --all install
Start-Sleep -Milliseconds 500

Write-Host "Building web-components"
Set-Location packages/web-components
yarn build
yarn build-bindings
Start-Sleep -Milliseconds 500

Write-Host "Building react-components"
Set-Location ../react-components
yarn build
Start-Sleep -Milliseconds 500

Write-Host "Building core package"
Set-Location ../core
yarn build
Start-Sleep -Milliseconds 500

Write-Host "Starting storybook"
Set-Location ../storybook
yarn storybook
