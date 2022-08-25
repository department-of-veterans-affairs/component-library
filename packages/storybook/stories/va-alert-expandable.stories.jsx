import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const alertExpandableDocs = getWebComponentDocs('va-alert-expandable');

export default {
  title: 'Components/va-alert-expandable',
  parameters: {
    componentSubtitle: `Alert expandable web component`,
    docs: {
      page: () => <StoryDocs data={alertExpandableDocs} />,
    },
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  'status': 'info',
  'trigger': 'Alert Headline',
  'iconless': false,
  'disable-analytics': false,
};

const Template = ({
  status,
  trigger,
  iconless,
  'disable-analytics': disableAnalytics,
}) => {
  return (
    <>
    <main class="va-l-detail-page va-facility-page">
    <div class="usa-grid usa-grid-full">
<nav data-template="navigation/facility_sidebar_nav" aria-label="secondary" data-widget-type="side-nav"><div class="medium-screen:vads-u-height--auto medium-screen:vads-u-margin-left--0 large-screen:vads-u-margin-right--2p5 medium-screen:vads-u-margin-y--0 usa-width-one-fourth va-sidenav va-sidenav-wrapper vads-u-margin--1"><button type="button" class="medium-screen:vads-u-display--none va-sidenav-default-trigger vads-u-color--primary" id="sidenav-menu" aria-label="In this section menu"><span class="sr-only">View sub-navigation for </span>In this section<i class="fa fa-bars" aria-hidden="true" role="img"></i></button><ul id="va-sidenav-ul-container" class="va-sidenav vads-u-margin-top--0 vads-u-padding--0"><li class="va-sidenav-level-1"><h2 class="va-sidenav-item-label, vads-u-font-family--sans va-sidenav-item-label-bold" style={{paddingLeft: '20px',fontSize: '14px', textTransform: 'uppercase'}}>SERVICES AND LOCATIONS</h2><ul><li class="va-sidenav-level-2"><a aria-label="Health services" class="va-sidenav-item-label" href="/alaska-health-care/health-services" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Health services </span></a></li><li class="va-sidenav-level-2 active selected"><a aria-current="page" aria-label="Locations" class="va-sidenav-item-label selected" href="/alaska-health-care/locations" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Locations </span></a><ul><li class="va-sidenav-level-3"><a aria-label="Anchorage VA Medical Center" class="va-sidenav-item-label" href="/alaska-health-care/locations/anchorage-va-medical-center" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Anchorage VA Medical Center </span></a></li><li class="va-sidenav-level-3"><a aria-label="Elmendorf-Richardson VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/elmendorf-richardson-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Elmendorf-Richardson VA Clinic </span></a></li><li class="va-sidenav-level-3"><a aria-label="Fairbanks VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/fairbanks-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Fairbanks VA Clinic </span></a></li><li class="va-sidenav-level-3"><a aria-label="Homer VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/homer-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Homer VA Clinic </span></a></li><li class="va-sidenav-level-3"><a aria-label="Juneau VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/juneau-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Juneau VA Clinic </span></a></li><li class="va-sidenav-level-3"><a aria-label="Mat-Su VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/mat-su-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Mat-Su VA Clinic </span></a></li><li class="va-sidenav-level-3"><a aria-label="Soldotna VA Clinic" class="va-sidenav-item-label" href="/alaska-health-care/locations/soldotna-va-clinic" rel="noopener noreferrer" style={{paddingLeft: '40px', pointerEvents: 'none'}}><span class=""> Soldotna VA Clinic </span></a></li></ul></li></ul></li><li class="va-sidenav-level-1"><h2 class="va-sidenav-item-label, vads-u-font-family--sans va-sidenav-item-label-bold" style={{paddingLeft: '20px', fontSize: '14px', textTransform: 'uppercase'}}>NEWS AND EVENTS</h2><ul><li class="va-sidenav-level-2"><a aria-label="Events" class="va-sidenav-item-label" href="/alaska-health-care/events" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Events </span></a></li><li class="va-sidenav-level-2"><a aria-label="News Releases" class="va-sidenav-item-label" href="/alaska-health-care/news-releases" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> News Releases </span></a></li><li class="va-sidenav-level-2"><a aria-label="Stories" class="va-sidenav-item-label" href="/alaska-health-care/stories" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Stories </span></a></li></ul></li><li class="va-sidenav-level-1"><h2 class="va-sidenav-item-label, vads-u-font-family--sans va-sidenav-item-label-bold" style={{paddingLeft: '20px', pointerEvents: 'none'}}>ABOUT VA ALASKA</h2><ul><li class="va-sidenav-level-2"><a aria-label="About us" class="va-sidenav-item-label" href="/alaska-health-care/about-us" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> About us </span></a></li><li class="va-sidenav-level-2"><a aria-label="Work with us" class="va-sidenav-item-label" href="/alaska-health-care/work-with-us" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Work with us </span></a></li><li class="va-sidenav-level-2"><a aria-label="Contact us" class="va-sidenav-item-label" href="/alaska-health-care/contact-us" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Contact us </span></a></li><li class="va-sidenav-level-2"><a aria-label="Policies" class="va-sidenav-item-label" href="/alaska-health-care/policies" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Policies </span></a></li><li class="va-sidenav-level-2"><a aria-label="Programs" class="va-sidenav-item-label" href="/alaska-health-care/programs" rel="noopener noreferrer" style={{paddingLeft: '20px', pointerEvents: 'none'}}><span class=""> Programs </span></a></li></ul></li></ul></div></nav>
    <div class="usa-width-three-fourths">
    <article class="usa-content" lang="en">
    <h1 class="vads-u-margin-bottom--2">Locations</h1>
<div class="usa-grid usa-grid-full vads-u-margin-y--1p5">
            
            <div data-template="facilities/main_buttons" class="vads-l-row">
                <div class="medium-screen:vads-l-col--4 vads-l-col--12 vads-u-margin-right--2p5">
                    <a class="usa-button vads-u-margin-top--1 vads-u-margin--0 vads-u-width--full vads-u-font-size--md" href="/alaska-health-care/make-an-appointment" hreflang="en">Make an appointment</a>
                </div>
                <div class="medium-screen:vads-l-col--4 vads-l-col--12 vads-u-margin-right--2p5">
                    <a class="usa-button vads-u-margin-top--1 vads-u-margin--0 vads-u-width--full vads-u-font-size--md" href="/alaska-health-care/health-services" hreflang="en">View all health services</a>
                </div>
                <div class="medium-screen:vads-l-col--4 vads-l-col--12 vads-u-text-align--right vads-u-flex--fill">
                    <a class="usa-button vads-u-margin-top--1 vads-u-margin--0 vads-u-margin-x--0 vads-u-width--full vads-u-font-size--md" href="/alaska-health-care/register-for-care" hreflang="en">Register for care</a>
                </div>
            </div>
                      </div>
    <h2 class="vads-u-font-size--xl vads-u-margin-top--3 medium-screen:vads-u-margin-top--5 vads-u-margin-bottom--2p5 medium-screen:vads-u-margin-bottom--3" id="main-locations">
              Main locations</h2>
    <div data-template="includes/facilityListing" class="region-list usa-width-one-whole vads-u-display--flex vads-u-flex-direction--column small-screen:vads-u-flex-direction--row facility vads-u-margin-bottom--4 medium-screen:vads-u-margin-bottom--5">
    <section class="region-grid vads-u-margin-right--2">
    <h3 class="vads-u-margin-bottom--1 vads-u-margin-top--0 vads-u-font-size--md medium-screen:vads-u-font-size--lg" id="anchorage-va-medical-center">
      <a href="/alaska-health-care/locations/anchorage-va-medical-center" hreflang="en">Anchorage VA Medical Center</a></h3>

    <va-alert-expandable data-template="components/covid-status.drupal.liquid" class="vads-u-margin-top--1 vads-u-margin-bottom--2 vamc-facility-expandable-alert hydrated" status="info" trigger="COVID-19 health protection: Levels high" id="29e56f1205bf4ed7b0814d8408d13108">

    <ul>
      <li>Everyone must wear a mask and practice physical distancing.</li>
      <li>We may screen you for COVID-19 symptoms at the entrance.</li>
      <li>Approved visitors only. Ask your care team who can visit.</li>
      <li>Ask your team about phone or video appointment options.</li>
    </ul>
    <p>Check on Mondays for each facility’s latest guidelines.</p>

      </va-alert-expandable>
    </section>
    <section-image class="region-grid usa-width-one-half vads-u-order--first small-screen:vads-u-order--initial vads-u-margin-bottom--2">
      <a href="/memphis-health-care/locations/memphis-va-medical-center" aria-label="Memphis VA Medical Center" hreflang="en">
  <img class="region-img" src="https://s3-us-gov-west-1.amazonaws.com/content.www.va.gov/img/styles/3_2_medium_thumbnail/public/2021-11/MEMPHIS%20VA%20EXTERIOR%20AREAL.png" alt="Memphis VA Medical Center" width="480" height="320" />
      </a>
    </section-image>
    </div>
    </article>
    </div>
    </div>
    </main>
    </>
  );
};

const IconlessTemplate = ({ trigger, iconless }) => {
  return (
    <>
      <va-alert-expandable
        status="info"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="error"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="warning"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="success"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
      <va-alert-expandable
        status="continue"
        trigger={trigger}
        iconless={iconless}
        disable-analytics="false"
      >
        <div>
          This is the alert content. To take action on this alert, please call{' '}
          <a href="tel:8775551234">877-555-1234.</a>
        </div>
      </va-alert-expandable>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(alertExpandableDocs);

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  status: 'error',
};

export const Warning = Template.bind(null);
Warning.args = {
  ...defaultArgs,
  status: 'warning',
};

export const Success = Template.bind(null);
Success.args = {
  ...defaultArgs,
  status: 'success',
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  status: 'continue',
};

export const NoIcon = IconlessTemplate.bind(null);
NoIcon.args = {
  ...defaultArgs,
  iconless: true,
};
