// Node modules.
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { addHours, format, subHours } from 'date-fns';

// Relative imports.
import MaintenanceBanner, { MAINTENANCE_BANNER } from './MaintenanceBanner.jsx';

const deriveDefaultProps = (startsAt = Date.now()) => {
  const expiresAt = addHours(startsAt, 2);
  const formattedStartsAt = format(startsAt, 'EEEE M/d, h:mm a');
  const formattedExpiresAt = format(expiresAt, 'EEEE M/d, h:mm a');

  return {
    id: '1',
    startsAt,
    expiresAt,
    title: 'DS Logon is down for maintenance.',
    content:
      'DS Logon is down for maintenance. Please use ID.me or MyHealtheVet to sign in or use online tools.',
    warnStartsAt: subHours(startsAt, 12),
    warnTitle: 'DS Logon will be down for maintenance',
    warnContent: `DS Logon will be unavailable from ${formattedStartsAt} to ${formattedExpiresAt} Please use ID.me or MyHealtheVet to sign in or use online tools during this time.`,
  };
};

describe('<MaintenanceBanner>', () => {
  it("Escapes early if it's before when it should show.", () => {
    const wrapper = mount(
      <MaintenanceBanner {...deriveDefaultProps(addHours(Date.now(), 13))} />,
    );
    expect(wrapper.html()).to.equal(null);
    wrapper.unmount();
  });

  it('Shows pre-downtime.', () => {
    const wrapper = mount(
      <MaintenanceBanner {...deriveDefaultProps(addHours(Date.now(), 2))} />,
    );
    expect(wrapper.html()).to.not.equal(null);
    expect(wrapper.html()).to.include('vads-u-border-color--warning-message');
    wrapper.unmount();
  });

  it('Shows downtime.', () => {
    const wrapper = mount(<MaintenanceBanner {...deriveDefaultProps()} />);
    expect(wrapper.html()).to.not.equal(null);
    expect(wrapper.html()).to.include('vads-u-border-color--secondary');
    wrapper.unmount();
  });

  it("Escapes early if it's after when it should show.", () => {
    const wrapper = mount(
      <MaintenanceBanner {...deriveDefaultProps(subHours(Date.now(), 3))} />,
    );
    expect(wrapper.html()).to.equal(null);
    wrapper.unmount();
  });
});
