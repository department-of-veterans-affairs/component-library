import { html } from 'lit-html';

export default {
  title: 'Components/Pagination',
  component: 'va-pagination',
};

const defaultArgs = {
  page: 3,
  total: 5,
  edges: 1,
  maxVisible: 9,
  linkAriaLabel: 'Load page {page}',
};

const Template = ({
  page,
  total,
  edges,
  maxVisible,
  linkAriaLabel,
}) => html` <va-pagination page="${page}" total="${total}" edges="${edges}" max-visible="${maxVisible}" link-aria-label="${linkAriaLabel}"></va-pagination>`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Large = Template.bind({});
Large.args = { ...defaultArgs, page: 50, total: 100 };

export const Edges = Template.bind({});
Edges.args = { ...defaultArgs, page: 50, total: 100, edges: 2 };

export const MaxVisible = Template.bind({});
MaxVisible.args = { ...defaultArgs, page: 50, total: 100, maxVisible: 15 };
