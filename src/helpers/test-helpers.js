/* global axe */
import { mount } from 'enzyme';
import sinon from 'sinon';

export function mountToDiv(component, id) {
  let div = document.getElementById(id);
  if (!div) {
    div = document.createElement('div');
    div.setAttribute('id', id);
    document.body.appendChild(div);
  }
  div.innerHTML = '';

  return mount(component, { attachTo: div });
}

export function axeCheck(component, ignoredRules = [], state = null) {
  let div = document.getElementById('axeContainer');

  if (!div) {
    div = document.createElement('div');
    div.setAttribute('id', 'axeContainer');
    document.body.appendChild(div);
  }

  // axe just needs a role on a containing element
  div.setAttribute('role', 'region');
  div.setAttribute(
    'aria-label',
    `Component ${Math.floor(Math.random() * Math.floor(100))}`,
  );

  div.innerHTML = '';

  const mountedComponent = mount(component, { attachTo: div });
  state ? mountedComponent.setState(state) : mountedComponent;

  return new Promise((resolve, reject) => {
    axe.run(document.body, (err, result) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        reject(err);
      }
      const validViolations = result.violations.filter(
        violation => !ignoredRules.includes(violation.id),
      );
      if (validViolations.length) {
        reject(
          new Error(
            validViolations
              .map(violation => {
                const nodeInfo = violation.nodes.reduce((str, node) => {
                  const { html, target } = node;
                  return [str, html, ...target].join('\n');
                }, '');

                return `[${violation.impact}] ${violation.help}
Id: ${violation.id}
See ${violation.helpUrl}
${nodeInfo}`;
              })
              .join('\n'),
          ),
        );
      }
      mountedComponent.unmount();
      resolve();
    });
  });
}

/**
 * @param {Object} wrapper - the Enzyme wrapper
 * @param {function} act - A function to manipulate the wrapper
 * @return sinon.spy
 */
export function testAnalytics(wrapper, act) {
  const handleAnalyticsEvent = sinon.spy();
  global.document.body.addEventListener(
    'component-library-analytics',
    handleAnalyticsEvent,
  );

  // Passing the `wrapper` isn't strictly speaking necessary since it'll probably
  // be defined in the same scope as `act`, but it's good practice just in case.
  // `act` is defined in a scope that doesn't have access to `wrapper`.
  act(wrapper);

  global.document.body.removeEventListener(
    'component-library-analytics',
    handleAnalyticsEvent,
  );

  return handleAnalyticsEvent;
}
