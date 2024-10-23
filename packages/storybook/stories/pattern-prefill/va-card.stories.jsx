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
  'show-shadow': false,
  'background': false,
  'canEdit': false,
};

const Template = ({
  'show-shadow': showShadow,
  'background': background,
  canEdit,
}) => (
  <va-card show-shadow={showShadow} background={background} class="hydrated">
    <div class="vads-u-padding-left--1 vads-u-padding-y--1">
      <dl class="vads-u-padding-y--0 vads-u-margin-y--0">
        <div class="vads-u-margin-bottom--2">
          <dt class="vads-u-visibility--screen-reader">Full name:</dt>
          <dd
            class="vads-u-font-weight--bold dd-privacy-mask vads-u-font-family--serif"
            data-dd-action-name="Full name"
          >
            Maverick P Mitchell
          </dd>
        </div>
        <div class="vads-u-margin-bottom--2">
          <dt class="vads-u-display--inline-block vads-u-font-weight--bold vads-u-margin-right--0p5">
            Social Security:
          </dt>
          <dd
            class="vads-u-display--inline-block dd-privacy-mask vads-u-font-family--sans"
            data-dd-action-name="Social Security:"
          >
            <span>
              <span aria-hidden="true">●●●–●●–8321</span>
              <span class="sr-only">ending with 8 3 2 1</span>
            </span>
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
            March 04, 1949
          </dd>
          <dd
            class="dd-privacy-mask vads-u-display--inline-block medium-screen:vads-u-display--none"
            data-dd-action-name="Date of birth"
          >
            Mar 04, 1949
          </dd>
        </div>
        <div>
          <dt class="vads-u-display--inline-block vads-u-margin-right--0p5 vads-u-font-weight--bold vads-u-margin-top--2">
            Gender:
          </dt>
          <dd
            class="vads-u-display--inline-block dd-privacy-mask"
            data-dd-action-name="Gender"
          >
            Male
          </dd>
        </div>
      </dl>
      {!canEdit && (
        <div class="vads-u-margin-y--1">
          <va-link
          active
          label="Edit mailing address"
          href="/mock-form-ae-design-patterns/1/task-yellow/veteran-information/edit-mailing-address"
          text="Edit"
          />
        </div>
      )}
    </div>
  </va-card>
);

export const Editable = Template.bind(null);
Editable.args = {
  ...defaultArgs,
  canEdit: false,
};

export const Uneditable = Template.bind(null);
Uneditable.args = {
  ...defaultArgs,
  background: true,
  canEdit: true,
};
