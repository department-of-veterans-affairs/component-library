// stories/MyButton.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button } from "../../mobile-components/Button";

export default {
  title: "components/Button - Mobile",
  component: Button,
  parameters: {
    reactNative: {
      appNative: false
    }
  }
} as Meta<typeof Button>;

export const Basic: StoryFn<typeof Button> = (args) => (
  <Button {...args} />
);

Basic.args = {
  text: "React Native Button",
  color: "#005ea2",
  onPress: () => alert('Button pressed!')
};
