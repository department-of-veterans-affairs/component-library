const fs = require('fs');
const path = require('path');

/**
 * Why this file exists:
 *
 * `va-combo-box-library.js` imports a small set of USWDS internals from
 * `@uswds/uswds/packages/uswds-core/src/js/*`.
 *
 * During Stencil builds, Rollup resolves those package subpaths using USWDS
 * `package.json` `exports`. In this environment, that resolution can fail for
 * these deep JS imports, producing warnings/errors like:
 * "Could not resolve import ... using exports defined in @uswds/uswds/package.json"
 * and "Plugin Error ... commonjs--resolver, resolveId".
 *
 * To keep va-combo-box bundled correctly, we map the affected import specifiers
 * to explicit absolute file paths in node_modules.
 */

const USWDS_ROOT = path.resolve(
	__dirname,
	'../../node_modules/@uswds/uswds/packages/uswds-core/src/js',
);

const USWDS_INTERNAL_ALIASES = {
	// Needed by va-combo-box-library keyboard/action behavior wiring.
	'@uswds/uswds/packages/uswds-core/src/js/utils/behavior':
		path.join(USWDS_ROOT, 'utils/behavior.js'),
	// Needed by va-combo-box-library event constants (e.g. CLICK).
	'@uswds/uswds/packages/uswds-core/src/js/events': path.join(
		USWDS_ROOT,
		'events.js',
	),
	// Needed by va-combo-box-library selector matching helpers.
	'@uswds/uswds/packages/uswds-core/src/js/utils/select-or-matches': path.join(
		USWDS_ROOT,
		'utils/select-or-matches.js',
	),
	// Needed by va-combo-box-library safe HTML sanitization.
	'@uswds/uswds/packages/uswds-core/src/js/utils/sanitizer': path.join(
		USWDS_ROOT,
		'utils/sanitizer.js',
	),
};

function resolveUswdsInternalModules() {
	return {
		name: 'resolve-uswds-internal-modules',
		resolveId(source) {
			const resolvedPath = USWDS_INTERNAL_ALIASES[source];
			if (!resolvedPath) {
				return null;
			}

			if (!fs.existsSync(resolvedPath)) {
				throw new Error(
					`USWDS module alias target does not exist: ${resolvedPath}`,
				);
			}

			return resolvedPath;
		},
	};
}

module.exports = {
	resolveUswdsInternalModules,
};
