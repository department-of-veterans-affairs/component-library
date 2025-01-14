## Background
In December 2024 the design system team sunsetted Formation in vets-website in favor of [css library](https://github.com/department-of-veterans-affairs/component-library/tree/main/packages/css-library). Though migration has been completed for vets-website, content-build, and next-build, there may be some external teams that are still looking to migrate over. This documentation outlines necessary configuration for integrating css library into a stand alone project. 

## Installation
We recommend installing css-library as a dependency in your package.json file. It can be installed [via npm](https://www.npmjs.com/package/@department-of-veterans-affairs/css-library?activeTab=readme). If you're unable to use a package.json file to manage dependencies, then you may be able to import stylesheets using a cdn like unpkg. Files can be grabbed [here](https://unpkg.com/browse/@department-of-veterans-affairs/css-library@0.16.1-rc1/dist/). 

## Stylesheet import paths
In general, css library has been structured in a way so that ideally the main things that need to be updated are import paths. For example, if a project is using Formation's core.scss file and importing it like this: 

`@import "~@department-of-veterans-affairs/formation/sass/...";`

The import path can be updated to this: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/..."` 

And styles should continue to work as normal. 

## Core Styles
If your project was relying Formation's core stylesheet update this: 

`@import "~@department-of-veterans-affairs/formation/sass/core";`

To these: 

```
@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/override-function";
@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/formation-overrides/variables";
@import "~@department-of-veterans-affairs/css-library/dist/tokens/scss/variables";

@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/core";
```

One thing to note here is that the core file import includes a plethora of style rules that are specific to va.gov. If your project only needs to use aspects of the VADS styles such as utilities or modules, checkout the guidance below for importing individual stylesheets. 
## Utilities
In Formation, utilities were bundled into the core stylesheet. In css-library the utilities import was extracted from the core stylesheet and is imported on its own. This change was to reduce some redundant imports across vfs applications. 

If your application needs VADS utility classes, add this import to your application stylesheet: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/utilities`

For more information on the utility classes offered be the VADS, [checkout the documentation here](https://design.va.gov/foundation/utilities/).

## Shared Variables
With Formation, vfs applications imported a shared-variables stylesheet. The import looked like this: 

`@import "~@department-of-veterans-affairs/formation/sass/shared-variables";`

In css-library, this import has been removed, and elements from it should be imported individually as needed. 

### Design Tokens
If your project needs VADS design tokens use this import for scss variables: 

`@import "~@department-of-veterans-affairs/css-library/dist/tokens/scss/variables";`

or this import for CSS custom properties: 

`@import "~@department-of-veterans-affairs/css-library/dist/tokens/css/variables";`

In general, we recommend using native CSS custom properties unless your application has a specific need for scss. 

### Mixins
If your application makes use of mixins, you'll need to import the mixins stylesheet: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/mixins";`

For a list of mixins ported from Formation to css-library [checkout the source file](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/css-library/dist/stylesheets/_mixins.scss)

### Functions
In some instances your application may be using the `@units` or `@units-px` functions. These were included in the Formation shared-variables import. 

In css-library, to use these, import the functions stylesheet: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/functions";`

For a list of functions ported from Formation to css-library [checkout the source file](https://github.com/department-of-veterans-affairs/component-library/blob/main/packages/css-library/dist/stylesheets/_functions.scss)

## Typography
css-library relies on USWDS v3 for typographic styles. To leverage the same settings in your own project, import this into your app stylesheet: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/uswds-typography";`

## Modules
Some applications may rely on scss modules. With Formation, these typically had an import path like this: 

`@import "~@department-of-veterans-affairs/formation/sass/modules/m-process-list";`

With css-library modules, you just need to update the import path: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-process-list";`

In general, we recommend using [VADS Web Components](https://design.va.gov/components/) when possible, and only relying on scss module styles where necessary. 

## Shame
If your project is using the shame.scss file from Formation update this import: 

`@import "~@department-of-veterans-affairs/formation/sass/shame";`

To this: 

`@import "~@department-of-veterans-affairs/css-library/dist/stylesheets/shame";`

**Caution:** The shame.scss file was intended to be a temporary fix for things that needed immediate attention. Avoid using this if possible as style rules in here will be actively refactored and removed when more permanent solutions are created for the problems this file addresses. 
