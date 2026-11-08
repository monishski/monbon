import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../../src/components/primitives/flex";
import { Text, textVariants } from "../../src/components/primitives/typography";
import type { TextVariantsProps } from "../../src/components/primitives/typography";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<TextVariantsProps>({
  variants: { ...textVariants.extend.variants, ...textVariants.variants },
  defaultVariants: textVariants.defaultVariants,
  descriptions: {
    type: "Semantic text type",
    weight: "Override the type scale font weight",
    family: "Font family; inherited unless set",
    align: "Text alignment",
    color: "Text color",
    fullWidth: "Expand to full width",
    wrap: "How text wraps across lines",
    wordBreak: "How long words break",
    truncate: "Single-line ellipsis truncation",
    maxLines: "Multi-line line clamp (wins over truncate)",
  },
});

const meta = {
  title: "Components/Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      description: "HTML Element",
      options: ["p", "span"],
      table: {
        defaultValue: { summary: "span" },
        type: { summary: "p | span" },
      },
    },
    ...variantArgTypes,
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack className="bg-app oveflow-hidden w-64 rounded-lg p-4">
      <Text {...args} />
    </Stack>
  ),
  args: {
    children: "Text",
    ...textVariants.defaultVariants,
    align: "center",
  },
};

export const Types: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Text type="large">Large — emphasized body</Text>
      <Text type="body-md">Body — default copy</Text>
      <Text type="label">Label — UI labels and controls</Text>
      <Text type="code">{"const x = 1;"}</Text>
      <Text type="supporting">Supporting — helper text, metadata</Text>
    </Stack>
  ),
};

export const Weights: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Text weight="normal">Normal (400)</Text>
      <Text weight="medium">Medium (500)</Text>
      <Text weight="semibold">Semibold (600)</Text>
      <Text weight="bold">Bold (700)</Text>
    </Stack>
  ),
};

export const Families: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Text family="sans">Sans — £1,234.56</Text>
      <Text family="mono">Mono — £1,234.56</Text>
      {/* Storybook doesn't load Input on Windows: it requests /@fsC:/Users/…, missing a slash, and gets a 404, so numbers there fall back to a system mono font. */}
      <Text family="number">Number — £1,234.56</Text>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack className="bg-app w-64 rounded-lg p-4">
      <Text align="left">Left</Text>
      <Text align="center">Center</Text>
      <Text align="right">Right</Text>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Text color="default">Default</Text>
      <Text color="muted">Muted</Text>
      <Text color="placeholder">Placeholder</Text>
      <Text color="disabled">Disabled</Text>
      <Text color="accent">Accent</Text>
      <Text color="error">Error</Text>
      <Text color="success">Success</Text>
      <Text color="warning">Warning</Text>
      <Text color="info">Info</Text>
      <Text color="positive">Positive</Text>
      <Text color="negative">Negative</Text>
      <Text color="neutral">Neutral</Text>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack gap="md" className="bg-app max-w-[400px] rounded-lg p-4">
      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Wrap (default)
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text as="p" type="body-md" wrap="wrap">
            This text wraps normally at word boundaries when it reaches the edge.
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Nowrap
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text as="p" type="body-md" wrap="nowrap">
            This text does not wrap and will overflow its container.
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Balance
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text as="p" type="body-md" wrap="balance">
            This text is balanced for better visual appearance across lines.
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Pretty
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text as="p" type="body-md" wrap="pretty">
            This text uses pretty wrap to avoid orphans at the end of paragraphs.
          </Text>
        </div>
      </Stack>
    </Stack>
  ),
};

export const WordBreak: Story = {
  render: () => (
    <Stack gap="md" className="bg-app max-w-md rounded-lg p-4">
      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Break-word (default for multi-line)
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text wordBreak="words">
            This is a verylongunbreakableword for a break-word example
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Break-all (default for single-line)
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text wordBreak="all">
            Breaks anywhere: abcdefghijklmnopqrstuvwxyz0123456789
          </Text>
        </div>
      </Stack>
    </Stack>
  ),
};

export const Truncation: Story = {
  render: () => (
    <Stack gap="md" className="bg-app max-w-md rounded-lg p-4">
      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Single-line truncate
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text truncate>
            The quick brown fox jumps over the lazy dog near the riverbank.
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          {"maxLines={2}"}
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text maxLines={2}>
            The quick brown fox jumps over the lazy dog near the riverbank while the sun
            sets behind the mountains.
          </Text>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          {"maxLines={3} + wordBreak"}
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Text maxLines={3} wordBreak="words">
            https://example.com/very/long/path/that/should/break/across/lines
          </Text>
        </div>
      </Stack>
    </Stack>
  ),
};
