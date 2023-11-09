import type { Meta, StoryObj } from "@storybook/react";

import { Masonry } from "./masonry";
import { Card, CardProps } from "./card";

const meta = {
  title: "Masonry Layout",
  component: Masonry,
  parameters: {},
  tags: ["autodocs"],

  argTypes: {
    columnCount: { control: { type: "range", min: 1, max: 10 } },
    gap: { control: { type: "range", min: 0, max: 48 } },
    columnGap: { control: { type: "range", min: 0, max: 48 } },
    rowGap: { control: { type: "range", min: 0, max: 48 } },
  },

  render: (args) => (
    <div style={{ width: "100%" }}>
      <Masonry {...args} />
    </div>
  ),
} satisfies Meta<typeof Masonry>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columnCount: 3,
    gap: 8,
    children: makeChildren([
      "short",
      "short",
      "middle",
      "tall",
      "tall",
      "short",
      "short",
      "middle",
      "short",
      "middle",
      "middle",
      "tall",
    ]),
  },
};

export const FewItems: Story = {
  args: {
    columnCount: 3,
    gap: 8,
    children: makeChildren(["short", "middle", "middle", "tall"]),
  },
};

export const ManyItems: Story = {
  args: {
    columnCount: 3,
    gap: 8,
    // spawn 100 items randomly
    children: makeChildren([
      ...Array(100)
        .fill(null)
        .map(() => {
          const index = Math.floor(Math.random() * 3) % 3;
          return (["short", "middle", "tall"] as const)[index];
        }),
    ]),
  },
};

function makeChildren(heights: CardProps["height"][]) {
  return heights.map((height, index) => (
    <Card key={index} height={height}>
      {index + 1}
    </Card>
  ));
}
