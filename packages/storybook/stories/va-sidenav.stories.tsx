import React from 'react';

import { getWebComponentDocs, propStructure, StoryDocs, componentStructure } from './wc-helpers';
import { VaSidenavItem } from '@department-of-veterans-affairs/web-components/react-bindings';
import { allModes } from "../.storybook/modes";

const sidenavDocs = getWebComponentDocs('va-sidenav');
const sidenavItemDocs = getWebComponentDocs('va-sidenav-item');
const sidenavSubmenuDocs = getWebComponentDocs('va-sidenav-submenu');

// Helper function to add key prop to web components for React
const withKey = (key: string, props: any = {}) => ({ ...props, key } as any);

export default {
  title: 'Components/Side Navigation',
  id: 'components/va-sidenav',
  component: 'va-sidenav',
  subcomponents: {
    'va-sidenav-item': componentStructure(sidenavItemDocs)[sidenavItemDocs.tag],
    'va-sidenav-submenu': {
      ...componentStructure(sidenavSubmenuDocs)[sidenavSubmenuDocs.tag],
      argTypes: {
        slotchange: { table: { disable: true } }, // not working atm :/
      }
    },
  },
  parameters: {
    componentSubtitle: 'va-sidenav web component',
    docs: {
      page: () => <StoryDocs 
        storyDefault={Default} 
        data={sidenavDocs} 
        componentName="va-sidenav" 
      />,
    },
    chromatic: {
      // Test each story for va-sidenav in two viewports
      modes: {
        mobile: allModes["small"],
        desktop: allModes["large"],
      },
    },
  },
  argTypes: {
    'resize': { table: { disable: true } },
    'sideNav': { table: { disable: true } },
    'id': { table: { disable: true } },
  },
  args: {
    header: 'Profile',
    'icon-name': 'account_circle',
    'icon-background-color': 'vads-color-primary',
  },
};

const Template = (args) => {
  const { sideNav } = args;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stopping the link from navigating just for Storybook

    if (e.currentTarget.hasAttribute('href')) {
      e.currentTarget.setAttribute('current-page', 'true');
    }
  }

  return (
    <va-sidenav 
      id={args.id}
      header={args.header}
      icon-name={args['icon-name']}
      icon-background-color={args['icon-background-color']}>
      {sideNav.map((item, index) => 
        item.submenu ? (
          <va-sidenav-submenu 
            {...withKey(`item-${index}`)} 
            label={item.label} 
            href={item.href} 
            onClick={ (e) => handleClick(e)}>
            {item.submenu.map((submenuItem, submenuIndex) => 
              <va-sidenav-item 
                {...withKey(`item-${index}-${submenuIndex}`)} 
                href={submenuItem.href} 
                label={submenuItem.label} 
                onClick={ (e) => handleClick(e)}>
              </va-sidenav-item>
            )}
          </va-sidenav-submenu>
        ) : (
          <va-sidenav-item 
            {...withKey(`item-${index}`)} 
            current-page={item['current-page']} 
            href={item.href} 
            label={item.label} 
            onClick={ (e) => handleClick(e)}
          ></va-sidenav-item>
        )
      )}
    </va-sidenav>
  )
};

const WithRouterTemplate = (args) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // stopping the link from navigating just for Storybook
    e.currentTarget.setAttribute('current-page', 'true');
  }

  const handleRouteChange = (e: CustomEvent) => {
    document.getElementById('route-change-message').textContent = `Route changed to ${e.detail.href}`;
  }

  return (
    <div>
      <p>
        The navigation items in this example have a{' '}
        <code>router-link</code> property. When the corresponding anchor
        tag is clicked, these links emit a <code>VaRouteChange</code> event that 
        contains the href of the clicked link. This event can be handled in a 
        React component where utilities provided by React Router can be used to 
        change the page under view, as in the example below:
      </p>
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
          import React from 'react';
          <br />
          import &#x7b; useHistory &#x7d; from 'react-router-dom';
          <br />
          import VaSidenavItem from '@department-of-veterans-affairs/web-components/react-bindings';
          <br />
          <br />
          const YourComponent &#61; (&#x7b;&#x7d;) &#61;&#62; &#x7b;
          <br />
          &nbsp;const history &#61; useHistory();
          <br />
          <br />
          &nbsp;function handleRouteChange(&#x7b; detail &#x7d;) &#x7b;
          <br />
          &nbsp;&nbsp;&nbsp;const &#x7b; href &#x7d; &#61; detail;
          <br />
          &nbsp;&nbsp;&nbsp;history.push(href);
          <br />
          &nbsp;&#x7d;
          <br />
          <br />
          &nbsp;return (<br />
          &nbsp;&nbsp;&#60;va-sidenav&#62;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#60;VaSidenavItem
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;href="/contact-info"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;label="Contact information"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;routerLink="true"
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;onVaRouteChange&#x7b;handleRouteChange&#x7d;&#62;
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#60;/VaSidenavItem&#62;
          <br />
          &nbsp;&nbsp;&#60;/va-sidenav&#62;
          <br />
          &nbsp;);
          <br />
          &#x7d;;
        </code>
      </pre>

      <hr />

      <p id="route-change-message"></p>

      <va-sidenav
        id="router-sidenav" 
        header={args.header}
        icon-name={args['icon-name']}
        icon-background-color={args['icon-background-color']}>
        <VaSidenavItem
          href="/contact-info" 
          label="Contact information"
          router-link={true}
          onClick={(e) => handleClick(e)}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
        <VaSidenavItem
          href="/personal-info" 
          label="Personal information" 
          router-link={true}
          onClick={(e) => handleClick(e)}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
        <VaSidenavItem
          href="/military-service" 
          label="Military service" 
          router-link={true}
          onClick={(e) => handleClick(e)}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
      </va-sidenav>
    </div>
  ) 
}

function sideNavBaseline() {
  return [
    {
      href: '#',
      label: 'Personal information',
    },
    {
      href: '#',
      label: 'Contact information',
    },
    {
      href: '#',
      label: 'Personal health care contacts',
      'current-page': true,
    },
    {
      href: '#',
      label: 'Military service',
    },
    {
      href: '#',
      label: 'Direct deposit information',
    },
    {
      href: '#',
      label: 'Account security',
    },
    {
      href: '#',
      label: 'Connected apps',
    }
  ];
}

export const Default = Template.bind(null);
Default.args = {
  sideNav: sideNavBaseline(),
  header: null,
  'icon-name': null,
  'icon-background-color': null,
  id: 'default-sidenav',
};
Default.argTypes = propStructure(sidenavDocs);

export const Levels = Template.bind(null);
Levels.args = {
  sideNav: [
    {
      href: '#',
      label: 'Level 2 link',
    },
    {
      href: '#',
      label: 'Level 2 link',
    },
    {
      href: '#',
      label: 'Level 2 link',
      submenu: [
        {
          href: '#',
          label: 'Level 3 link'
        },
        {
          href: '#',
          label: 'Level 3 link'
        },
        {
          href: '#',
          label: 'Level 3 link'
        }
      ]
    }
  ],
  header: 'Level 1 Title',
  'icon-name': 'account_circle',
  'icon-background-color': 'vads-color-primary',
  id: 'levels-sidenav',
};
Levels.argTypes = propStructure(sidenavDocs);

export const CategorizedLinks = Template.bind(null);
const sideNavSubmenu: any[] = [...sideNavBaseline()];
sideNavSubmenu.splice(4, 0, {
  label: 'Communication settings',
  submenu: [
    {
      href: '#',
      label: 'Notification settings',
    },
    {
      href: '#',
      label: 'Paperless delivery',
    },
  ],
});
CategorizedLinks.args = {
  sideNav: sideNavSubmenu,
  id: 'submenu-categorized-links',
};

export const NestedLinks = Template.bind(null);
const sideNavSubmenuLinked: any[] = [...sideNavBaseline()];
sideNavSubmenuLinked.splice(4, 0, {
  label: 'Communication settings',
  href: '#',
  submenu: [
    {
      href: '#',
      label: 'Notification settings',
    },
    {
      href: '#',
      label: 'Paperless delivery',
    },
  ],
  id: 'submenu-nested-links',
});
NestedLinks.args = {
  sideNav: sideNavSubmenuLinked,
};

export const WithRouterLinkSupport = WithRouterTemplate.bind(null);
WithRouterLinkSupport.args = {
  header: "Router link example",
  'icon-name': 'lightbulb',
  'icon-background-color': 'vads-color-primary-darker',
  sideNav: sideNavBaseline(),
  id: 'router-link-sidenav',
};
WithRouterLinkSupport.argTypes = propStructure(sidenavDocs);