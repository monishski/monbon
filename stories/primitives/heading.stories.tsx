import type { Meta, StoryObj } from "@storybook/react-vite";

import { Stack } from "../../src/components/primitives/flex";
import {
  Heading,
  headingVariants,
  Text,
} from "../../src/components/primitives/typography";
import type { HeadingVariantsProps } from "../../src/components/primitives/typography";
import { getVariantArgTypes } from "../utils/storybook";

const variantArgTypes = getVariantArgTypes<HeadingVariantsProps>({
  variants: {
    ...headingVariants.extend.variants,
    ...headingVariants.variants,
  },
  defaultVariants: {
    ...headingVariants.extend.defaultVariants,
    ...headingVariants.defaultVariants,
  },
  descriptions: {
    type: "Semantic heading / display type",
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
  title: "Components/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      description: "HTML heading element (document outline)",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      table: {
        defaultValue: { summary: "h1" },
        type: { summary: "h1 | h2 | h3 | h4 | h5 | h6" },
      },
    },
    ...variantArgTypes,
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Stack className="bg-app w-64 rounded-lg p-4">
      <Heading {...args} />
    </Stack>
  ),
  args: {
    children: "Heading",
    ...headingVariants.defaultVariants,
    align: "center",
  },
};

export const Levels: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Heading as="h1">Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </Stack>
  ),
};

export const Display: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Heading as="h1" type="display-1">
        Display 1
      </Heading>
      <Heading as="h2" type="display-2">
        Display 2
      </Heading>
      <Heading as="h3" type="display-3">
        Display 3
      </Heading>
      <Heading as="h4" type="display-4">
        Display 4
      </Heading>
      <Heading as="h5" type="display-5">
        Display 5
      </Heading>
      <Heading as="h6" type="display-6">
        Display 6
      </Heading>
    </Stack>
  ),
};

export const Alignment: Story = {
  render: () => (
    <Stack className="bg-app w-64 rounded-lg p-4">
      <Heading as="h3" align="left">
        Left
      </Heading>
      <Heading as="h3" align="center">
        Center
      </Heading>
      <Heading as="h3" align="right">
        Right
      </Heading>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Stack className="bg-app rounded-lg p-4">
      <Heading as="h3" color="default">
        Default
      </Heading>
      <Heading as="h3" color="muted">
        Muted
      </Heading>
      <Heading as="h3" color="placeholder">
        Placeholder
      </Heading>
      <Heading as="h3" color="disabled">
        Disabled
      </Heading>
      <Heading as="h3" color="accent">
        Accent
      </Heading>
      <Heading as="h3" color="error">
        Error
      </Heading>
      <Heading as="h3" color="success">
        Success
      </Heading>
      <Heading as="h3" color="warning">
        Warning
      </Heading>
      <Heading as="h3" color="info">
        Info
      </Heading>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack gap="md" className="bg-app max-w-[400px] rounded-lg p-4">
      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Balance (default)
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" wrap="balance">
            This text is balanced for better visual appearance across lines.
          </Heading>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Pretty
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" wrap="pretty">
            This text uses pretty wrap to avoid orphans at the end of paragraphs.
          </Heading>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Wrap
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" wrap="wrap">
            This text wraps normally at word boundaries when it reaches the edge.
          </Heading>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          Nowrap
        </Text>
        <div className="border-default-line w-[200px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" wrap="nowrap">
            This text does not wrap and will overflow its container.
          </Heading>
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
        <div className="border-default-line w-[240px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" truncate>
            A very long heading that should ellipsize at the edge
          </Heading>
        </div>
      </Stack>

      <Stack gap="xs" align="start" fullWidth={false}>
        <Text as="p" type="label">
          {"maxLines={2}"}
        </Text>
        <div className="border-default-line w-[240px] overflow-hidden rounded-sm border p-2">
          <Heading as="h3" maxLines={2}>
            A very long heading that wraps across two lines then clamps with an ellipsis
          </Heading>
        </div>
      </Stack>
    </Stack>
  ),
};
