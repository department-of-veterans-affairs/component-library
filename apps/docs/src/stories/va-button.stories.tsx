import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Use the web component directly - it's registered globally via defineCustomElements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'va-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          text?: string;
          secondary?: boolean;
          big?: boolean;
          back?: boolean;
          continue?: boolean;
          disabled?: boolean;
          label?: string;
          'primary-alternate'?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

const meta: Meta = {
  title: 'Components/Button USWDS',
  id: 'uswds-va-button',
  parameters: {
    docs: {
      description: {
        component: 'VA Design System button component for actions and form submissions.',
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text content',
      table: { category: 'Content' },
    },
    secondary: {
      control: 'boolean',
      description: 'Use secondary (outline) styling',
      table: { category: 'Variants' },
    },
    big: {
      control: 'boolean',
      description: 'Use larger button size',
      table: { category: 'Variants' },
    },
    back: {
      control: 'boolean',
      description: 'Show back arrow icon',
      table: { category: 'Variants' },
    },
    continue: {
      control: 'boolean',
      description: 'Show continue arrow icon',
      table: { category: 'Variants' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
      table: { category: 'State' },
    },
    'primary-alternate': {
      control: 'boolean',
      description: 'Use alternate primary color',
      table: { category: 'Variants' },
    },
  },
};

export default meta;
type Story = StoryObj;

// Playground story with all controls enabled
export const Playground: Story = {
  render: (args) => (
    <va-button
      text={args.text}
      secondary={args.secondary}
      big={args.big}
      back={args.back}
      continue={args.continue}
      disabled={args.disabled}
      primary-alternate={args['primary-alternate']}
    />
  ),
  args: {
    text: 'Button text',
    secondary: false,
    big: false,
    back: false,
    continue: false,
    disabled: false,
    'primary-alternate': false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground to explore all button properties.',
      },
    },
  },
};

export const Primary: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Primary button'}
      {...args}
    />
  ),
  args: {
    text: 'Primary button',
  },
};

export const Secondary: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Secondary button'}
      secondary
      {...args}
    />
  ),
  args: {
    text: 'Secondary button',
  },
};

export const Big: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Big button'}
      big
      {...args}
    />
  ),
  args: {
    text: 'Big button',
  },
};

export const Continue: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Continue'}
      continue
      {...args}
    />
  ),
  args: {
    text: 'Continue',
  },
};

export const Back: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Back'}
      back
      {...args}
    />
  ),
  args: {
    text: 'Back',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <va-button
      text={args.text || 'Disabled button'}
      disabled
      {...args}
    />
  ),
  args: {
    text: 'Disabled button',
  },
};
