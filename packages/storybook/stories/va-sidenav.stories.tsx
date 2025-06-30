import React from 'react';

import { getWebComponentDocs, propStructure, StoryDocs, componentStructure } from './wc-helpers';
import { VaSidenavItem } from '@department-of-veterans-affairs/web-components/react-bindings';

const sidenavDocs = getWebComponentDocs('va-sidenav');
const sidenavItemDocs = getWebComponentDocs('va-sidenav-item');
const sidenavSubmenuDocs = getWebComponentDocs('va-sidenav-submenu');

// Helper function to add key prop to web components
const withKey = (key: string, props: any = {}) => ({ ...props, key } as any);

const sideNavDefault = [
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
];

export default {
  title: 'Components/Side Navigation',
  id: 'components/va-sidenav',
  component: 'va-sidenav',
  subcomponents: {
    'va-sidenav-item': componentStructure(sidenavItemDocs)[sidenavItemDocs.tag],
    'va-sidenav-submenu': {
      ...componentStructure(sidenavSubmenuDocs)[sidenavSubmenuDocs.tag],
      argTypes: {
        slotchange: { table: { disable: true } }, // not working atm
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
  },
  argTypes: {
    'resize': { table: { disable: true } },
    'sideNav': { table: { disable: true } },
  },
  args: {
    sideNav: sideNavDefault,
    header: 'Profile',
    'icon-name': 'account_circle',
    'icon-background-color': 'vads-color-primary',
  },
};

const Template = (args) => {
  const { sideNav } = args;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // update the target element to have current-page="true"
    e.currentTarget.setAttribute('current-page', 'true');
    // update all other elements to have current-page="false"
    document.querySelectorAll('va-sidenav-item').forEach((item) => {
      if (item !== e.currentTarget) {
        item.setAttribute('current-page', 'false');
      }
    });
  }

  return (
    <va-sidenav 
      header={args.header}
      icon-name={args['icon-name']}
      icon-background-color={args['icon-background-color']}>
      {sideNav.map((item, index) => 
        item.isSubmenu ? (
          <va-sidenav-submenu 
            {...withKey(`item-${index}`)} 
            label={item.label} 
            href={item.href}>
            {item.submenu.map((submenuItem, submenuIndex) => 
              <va-sidenav-item 
                {...withKey(`item-${index}-${submenuIndex}`)} 
                href={submenuItem.href} 
                label={submenuItem.label} 
                onClick={handleClick}>
              </va-sidenav-item>
            )}
          </va-sidenav-submenu>
        ) : (
          <va-sidenav-item 
            {...withKey(`item-${index}`)} 
            current-page={item['current-page']} 
            href={item.href} 
            label={item.label} 
            onClick={handleClick}
          ></va-sidenav-item>
        )
      )}
    </va-sidenav>
  )
};

const WithRouterTemplate = (args) => {

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.currentTarget.setAttribute('current-page', 'true');
    document.querySelectorAll('#router-sidenav va-sidenav-item').forEach((item) => {
      if (item !== e.currentTarget) {
        item.setAttribute('current-page', 'false');
      }
    });
  }

  const handleRouteChange = (e: CustomEvent) => {
    console.log('route change', e.detail);
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
          onClick={handleClick}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
        <VaSidenavItem
          href="/personal-info" 
          label="Personal information" 
          router-link={true}
          onClick={handleClick}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
        <VaSidenavItem
          href="/military-service" 
          label="Military service" 
          router-link={true}
          onClick={handleClick}
          onVaRouteChange={handleRouteChange}></VaSidenavItem>
      </va-sidenav>
    </div>
  ) 
}

const sideNavSubmenu = [
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
  },
  {
    href: '#',
    label: 'Military service',
    'current-page': true,
  },
  {
    href: '#',
    label: 'Direct deposit information',
  },
  {
    isSubmenu: true,
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

export const Default = Template.bind(null);
Default.args = {
  sideNav: sideNavDefault,
  header: null,
  'icon-name': null,
  'icon-background-color': null,
};
Default.argTypes = propStructure(sidenavDocs);

export const WithSubmenu = Template.bind(null);
WithSubmenu.args = {
  sideNav: sideNavSubmenu,
};

// export const WithSubmenuLinked = Template.bind(null);
// const sideNavSubmenuLinked = sideNavSubmenu.map((item) => {
//   return {
//     ...item,
//     ...(item.isSubmenu ? { href: '#' } : item)
//   };
// });

// WithSubmenuLinked.args = {
//   sideNav: sideNavSubmenuLinked,
// };

export const WithRouterLinkSupport = WithRouterTemplate.bind(null);
WithRouterLinkSupport.args = {
  header: "Router link example",
  'icon-name': 'lightbulb',
  'icon-background-color': 'vads-color-primary-darker',
  sideNav: sideNavDefault,
};
WithRouterLinkSupport.argTypes = propStructure(sidenavDocs);