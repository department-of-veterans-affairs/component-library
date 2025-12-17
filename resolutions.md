# Package Resolutions Documentation

This document explains the Yarn resolutions defined in the root `package.json` and when they can be safely removed.

## Added Resolutions (Branch: 5257-dependabot-vulnerabilities)

### cheerio@1.0.0-rc.12
- **Why Added**: Compatibility pin for `enzyme@3.11.0` test stability
- **Security Related**: No - this is a compatibility resolution, not a security fix
- **When to Remove**: When enzyme is removed or upgraded to a version that supports newer cheerio versions
- **Related Packages**: `packages/react-components` (enzyme@3.11.0)

### minimatch@3.1.2
- **Why Added**: Security fix for ReDoS (Regular Expression Denial of Service) vulnerabilities
- **Security Related**: Yes - addresses CVEs in minimatch 3.0.4 and earlier
- **Architectural Constraint**: Cannot upgrade to minimatch 9.x (ESM-only) because karma@6.4.4 requires CommonJS function API
- **When to Remove**: When karma is replaced with a modern test runner that supports ESM, or when karma adds ESM support
- **Related Packages**: `packages/react-components` (karma@6.4.4, karma-webpack@5.0.0)

### semver@7.7.3
- **Why Added**: Security fix for ReDoS vulnerabilities in older semver versions
- **Security Related**: Yes - addresses CVEs in semver 7.x prior to 7.7.3
- **When to Remove**: When all workspace packages naturally resolve to semver@7.7.3 or higher (check with `yarn why semver`)
- **Related Packages**: Multiple packages across the monorepo

### tar-fs@3.1.1
- **Why Added**: Security fix for tar extraction vulnerabilities
- **Security Related**: Yes - addresses tar extraction path traversal vulnerabilities
- **Note**: 3.1.1 is the final release in the 3.x line (no 4.x version exists)
- **When to Remove**: When all workspace packages naturally resolve to tar-fs@3.1.1 or higher
- **Related Packages**: Multiple packages with transitive dependencies on tar-fs

## Pre-existing Resolutions (Already on main branch)

### ansi-regex@5.0.1
- **Why Added**: Security fix for ReDoS vulnerability
- **When to Remove**: When all packages naturally resolve to 5.0.1+

### diff@3.5.0
- **Why Added**: Security fix
- **When to Remove**: When all packages naturally resolve to 3.5.0+

### glob-parent@5.1.2
- **Why Added**: Security fix for ReDoS vulnerability
- **When to Remove**: When all packages naturally resolve to 5.1.2+

### json-schema@0.4.0
- **Why Added**: Security fix
- **When to Remove**: When all packages naturally resolve to 0.4.0+

### minimist@1.2.6
- **Why Added**: Security fix for prototype pollution
- **When to Remove**: When all packages naturally resolve to 1.2.6+

### node-fetch@2.6.7
- **Why Added**: Security fix
- **When to Remove**: When all packages naturally resolve to 2.6.7+

### trim@0.0.3
- **Why Added**: Security fix
- **When to Remove**: When all packages naturally resolve to 0.0.3+

### prism@1.27.0
- **Why Added**: Security fix
- **When to Remove**: When all packages naturally resolve to 1.27.0+

## How to Verify When Resolutions Can Be Removed

To check if a resolution is still needed:

```bash
# Check all versions of a package in use
yarn why <package-name>

# Example:
yarn why minimatch
```

If all instances resolve to the pinned version or higher naturally (without the resolution), the resolution can be safely removed.

## Related Documentation

- [Yarn Resolutions Documentation](https://yarnpkg.com/configuration/manifest#resolutions)
