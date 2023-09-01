import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";

import { Button as Component } from "./button";
import { findByRole } from "@storybook/testing-library";

type MockLinkProps = {
  href: string;
  className?: string;
};
/** mock of link component */
function MockLink({
  href,
  children,
  className,
}: React.PropsWithChildren<MockLinkProps>) {
  return (
    <a className={className} href={href} data-test-id="mock-button">
      {children}
    </a>
  );
}

export default {
  component: Component,
  args: {
    children: "Button",
  },
} satisfies Meta<typeof Component>;

type Story = StoryObj<Meta<typeof Component>>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const AsLink: Story = {
  args: {
    variant: "primary",
    as: "a",
    href: "#",
  },
  play: async ({ canvasElement }) => {
    const linkButton = await findByRole(canvasElement, "link");
    expect(linkButton).toHaveAttribute("href", "#");
  },
};

export const AsLinkComponent: Story = {
  args: {
    variant: "primary",
    as: MockLink,
    href: "#",
  },
  play: async ({ canvasElement }) => {
    const linkButton = await findByRole(canvasElement, "link");
    expect(linkButton).toHaveAttribute("href", "#");
    expect(linkButton).toHaveAttribute("data-test-id", "mock-button");
  },
};
