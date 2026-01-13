#!/bin/bash

# Parse command line arguments
SETUP_DOCS=false
SETUP_STORYBOOK=true

while [[ "$#" -gt 0 ]]; do
    case $1 in
        --docs) SETUP_DOCS=true; SETUP_STORYBOOK=false ;;
        --all) SETUP_DOCS=true; SETUP_STORYBOOK=true ;;
        --help)
            echo "Usage: ./setup.sh [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --docs    Set up and start the documentation site only"
            echo "  --all     Set up everything (Storybook + docs)"
            echo "  --help    Show this help message"
            echo ""
            echo "Default: Set up and start Storybook"
            exit 0
            ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

echo "Installing package dependencies"
yarn workspaces foreach --all install
sleep .5

echo "Building web-components"
cd packages/web-components
yarn build
yarn build-bindings
sleep .5

echo "Building react-components"
cd ../react-components
yarn build
sleep .5

echo "Building core package"
cd ../core
yarn build
sleep .5

cd ../..

if [ "$SETUP_STORYBOOK" = true ]; then
    echo "Starting storybook"
    cd packages/storybook
    yarn storybook
fi

if [ "$SETUP_DOCS" = true ] && [ "$SETUP_STORYBOOK" = false ]; then
    echo "Starting documentation site"
    yarn docs
fi
