import { html } from 'lit-html';

export default {
    title: 'Components/Checkbox',
    component: 'va-checkbox',
};

const defaultArgs = {
    error: "",
    label: "Checkbox label",
    description: "Description content",
    enableAnalytics: false,
    required: false,
    checked: false,
    ariaDescribedby: "ARIA description"
};

const Template = ({ label, enableAnalytics, error }) => html`
    <va-checkbox label=${label} enable-analytics=${enableAnalytics} />
`;

const TemplateError = ({ label, enableAnalytics, error }) => html`
    <va-checkbox label=${label} enable-analytics=${enableAnalytics} error=${error} />
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Error = TemplateError.bind({});

Error.args = { ...defaultArgs, error: "This is an error message." };

export const WithAnalytics = Template.bind({});

WithAnalytics.args = { ...defaultArgs, enableAnalytics: true };
