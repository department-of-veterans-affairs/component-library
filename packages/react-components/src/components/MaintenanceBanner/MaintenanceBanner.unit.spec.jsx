// Node modules.
import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

// Relative imports.
import MaintenanceBanner from './MaintenanceBanner.jsx';
import { formatDate } from '../../helpers/format-date.js';

const deriveDefaultProps = (startsAt = new Date()) => {
  const expiresAt = new Date(startsAt);
  const warnStartsAt = new Date(startsAt);
  expiresAt.setHours(expiresAt.getHours() + 2);
  warnStartsAt.setHours(warnStartsAt.getHours() - 12);

  const formattedStartsAt = formatDate(startsAt);
  const formattedExpiresAt = formatDate(expiresAt);

  return {
    id: '1',
    startsAt,
    expiresAt,
    title: 'DS Logon is down for maintenance.',
    content:
      'DS Logon is down for maintenance. Please use ID.me or MyHealtheVet to sign in or use online tools.',
    warnStartsAt,
    warnTitle: 'DS Logon will be down for maintenance',
    warnContent: `DS Logon will be unavailable from ${formattedStartsAt} to ${formattedExpiresAt} Please use ID.me or MyHealtheVet to sign in or use online tools during this time.`,
  };
};

describe('<MaintenanceBanner>', () => {
  it("Escapes early if it's before when it should show.", () => {
    const date = new Date();
    date.setHours(date.getHours() + 13);
    const wrapper = mount(<MaintenanceBanner {...deriveDefaultProps(date)} />);
    expect(wrapper.html()).to.equal(null);
    wrapper.unmount();
  });

  it('Shows pre-downtime.', () => {
    const date = new Date();
    date.setHours(date.getHours() + 2);
    const wrapper = mount(<MaintenanceBanner {...deriveDefaultProps(date)} />);
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
    const date = new Date();
    date.setHours(date.getHours() - 3);
    const wrapper = mount(<MaintenanceBanner {...deriveDefaultProps(date)} />);
    expect(wrapper.html()).to.equal(null);
    wrapper.unmount();
  });
});
