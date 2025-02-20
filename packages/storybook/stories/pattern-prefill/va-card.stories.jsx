/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, StoryDocs } from '../wc-helpers';

const cardDocs = getWebComponentDocs('va-card');

export default {
  title: 'Patterns/Prefill/Components/Card',
  id: 'patterns/components/card',
  parameters: {
    componentSubtitle: 'Prefill card variations',
    docs: {
      page: () => <StoryDocs storyDefault={Editable} data={cardDocs} />,
    },
  },
};

const defaultArgs = {
  canEdit: true,
  children: '',
};

const Template = ({ canEdit, children }) => {
  return (
    <va-card class="hydrated" canEdit={canEdit}>
      {children}
      {canEdit && (
        <div class="vads-u-margin-y--1">
          <va-link
            active
            label="Edit mailing address"
            href="/mock-form-ae-design-patterns/1/task-yellow/veteran-information/edit-mailing-address"
            text="Edit"
          />
        </div>
      )}
    </va-card>
  );
};

export const Editable = Template.bind(null);
Editable.args = {
  ...defaultArgs,
  canEdit: true,
  children: (
    <>
      <h4 class="vads-u-font-size--h3 vads-u-width--auto vads-u-margin-top--0 vads-u-margin-bottom--2">
        Mailing address
      </h4>
      <div
        class="dd-privacy-hidden vads-u-margin-y--2"
        data-dd-action-name="street"
      >
        123 Spooner St.
      </div>
      <div
        class="dd-privacy-hidden vads-u-margin-y--2"
        data-dd-action-name="city, state and zip code"
      >
        Fulton, NY 97063
      </div>
    </>
  ),
};

export const Uneditable = Template.bind(null);
Uneditable.args = {
  ...defaultArgs,
  canEdit: false,
  children: (
    <div class="vads-u-padding-left--1 vads-u-padding-y--1">
      <h4 class="vads-u-font-size--h3 vads-u-margin-bottom--2 vads-u-margin-top--0">
        Personal information
      </h4>
      <dl class="vads-u-padding-y--0 vads-u-margin-y--0">
        <div class="vads-u-margin-bottom--2">
          <dt class="vads-u-visibility--screen-reader">Full name:</dt>
          <dd
            class="dd-privacy-hidden vads-u-font-family--serif"
            data-dd-action-name="Full name"
          >
            <strong>Name:</strong> Maverick P Mitchell
          </dd>
        </div>
        <div class="vads-u-margin-bottom--2">
          <dt class="vads-u-display--inline-block vads-u-font-weight--bold vads-u-margin-right--0p5">
            Last 4 digits of Social Security number:
          </dt>
          <dd
            class="vads-u-display--inline-block dd-privacy-mask vads-u-font-family--sans"
            data-dd-action-name="Social Security:"
          >
            6784
          </dd>
        </div>
        <div>
          <dt class="vads-u-display--inline-block vads-u-margin-right--0p5 vads-u-font-weight--bold">
            Date of birth:
          </dt>
          <dd
            class="dd-privacy-mask medium-screen:vads-u-display--inline-block vads-u-display--none"
            data-dd-action-name="Date of birth"
          >
            March 4, 1949
          </dd>
          <dd
            class="dd-privacy-mask vads-u-display--inline-block medium-screen:vads-u-display--none"
            data-dd-action-name="Date of birth"
          >
            Mar 4, 1949
          </dd>
        </div>
      </dl>
    </div>
  ),
};
