import { expect } from "@storybook/jest";
import type { Meta, StoryObj } from "@storybook/react";

import { Text as Component } from "./text";
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
    children: "Text",
  },
} satisfies Meta<typeof Component>;

type Story = StoryObj<Meta<typeof Component>>;

export const Body: Story = {
  args: {
    variant: "body",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    href: "#",
  },
};

export const AsLink: Story = {
  args: {
    variant: "link",
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
    variant: "link",
    as: MockLink,
    href: "#",
  },
  play: async ({ canvasElement }) => {
    const linkButton = await findByRole(canvasElement, "link");
    expect(linkButton).toHaveAttribute("href", "#");
    expect(linkButton).toHaveAttribute("data-test-id", "mock-button");
  },
};
