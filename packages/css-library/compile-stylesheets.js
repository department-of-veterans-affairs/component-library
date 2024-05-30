const util = require('util');
const exec = util.promisify(require('child_process').exec)
const fs = require('fs');

const compileStylesheets = async () => {
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/_core.scss:dist/stylesheets/_core.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/_shame.scss:dist/stylesheets/_shame.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-action-link.scss:dist/stylesheets/modules/_m-action-link.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-additional-info.scss:dist/stylesheets/modules/_m-additional-info.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-alert.scss:dist/stylesheets/modules/_m-alert.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-breadcrumbs.scss:dist/stylesheets/modules/_m-breadcrumbs.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-button.scss:dist/stylesheets/modules/_m-button.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-dropdown.scss:dist/stylesheets/modules/_m-dropdown.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-emergency-banner.scss:dist/stylesheets/modules/_m-emergency-banner.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-external-link.scss:dist/stylesheets/modules/_m-external-link.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-form-elements.scss:dist/stylesheets/modules/_m-form-elements.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-form-process.scss:dist/stylesheets/modules/_m-form-process.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-homepage-hero.scss:dist/stylesheets/modules/_m-homepage-hero.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-hub-page-link-list.scss:dist/stylesheets/modules/_m-hub-page-link-list.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-loading-indicator.scss:dist/stylesheets/modules/_m-loading-indicator.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-maintenance-banner.scss:dist/stylesheets/modules/_m-maintenance-banner.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-megamenu.scss:dist/stylesheets/modules/_m-megamenu.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-modal.scss:dist/stylesheets/modules/_m-modal.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-nav-linklist.scss:dist/stylesheets/modules/_m-nav-linklist.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-nav-sidebar.scss:dist/stylesheets/modules/_m-nav-sidebar.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-omb-info.scss:dist/stylesheets/modules/_m-omb-info.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-overlay.scss:dist/stylesheets/modules/_m-overlay.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-print.scss:dist/stylesheets/modules/_m-print.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_m-process-list.scss:dist/stylesheets/modules/_m-process-list.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_va-pagination.scss:dist/stylesheets/modules/_va-pagination.css");
    await exec("sass --load-path=../../node_modules/@uswds/uswds/packages/ src/stylesheets/modules/_va-tabs.scss:dist/stylesheets/modules/_va-tabs.css");

    fs.copyFileSync(`${__dirname}/src/stylesheets/_mixins.scss`, `${__dirname}/dist/stylesheets/_mixins.scss`);
}

compileStylesheets();