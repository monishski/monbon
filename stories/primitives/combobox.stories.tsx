import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  keepPreviousData,
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { Settings2, Tags, TriangleAlert } from "lucide-react";

import { IconButton } from "../../src/components/primitives/button";
import { Combobox, type ComboboxProps } from "../../src/components/primitives/combobox";
import { Row, Stack } from "../../src/components/primitives/flex";
import { Label } from "../../src/components/primitives/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../src/components/primitives/popover";
import { Switch } from "../../src/components/primitives/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../src/components/primitives/tooltip";
import { Text } from "../../src/components/primitives/typography";
import { useDebouncedValue } from "../../src/hooks/use-debounced-value";

type Option = { id: string; name: string };

const categories: Option[] = [
  "Bills",
  "Charity",
  "Eating out",
  "Entertainment",
  "Expenses",
  "Family",
  "Finances",
  "General",
  "Gifts",
  "Groceries",
  "Health, dental, optical and wellbeing",
  "Holidays",
  "Personal care",
  "Shopping",
  "Transfers to savings, pensions and investments",
  "Transport",
].map((name) => ({ id: name.toLowerCase().replace(/\W+/g, "-"), name }));

// Spend in pence; zero-spend categories are hidden by the SettingsMenu story
const spendById: Record<string, number> = {
  bills: 84250,
  "eating-out": 31620,
  entertainment: 12900,
  groceries: 240015,
  holidays: 155000,
  "personal-care": 4599,
  shopping: 98710,
  "transfers-to-savings-pensions-and-investments": 1477500,
  transport: 21840,
};

const currencyFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function formatPence({ pence }: { pence: number }) {
  return currencyFormat.format(pence / 100);
}

const manyOptions: Option[] = Array.from({ length: 1000 }, (_, index) => {
  const id = String(index + 1).padStart(4, "0");
  return { id, name: `Option ${id}` };
});

type LocalComboboxProps = Omit<
  ComboboxProps<Option>,
  | "items"
  | "filteredItems"
  | "value"
  | "onValueChange"
  | "inputValue"
  | "onInputValueChange"
  | "grandTotal"
> & {
  options: Option[];
  defaultValue?: Option[];
  isOptionHidden?: (option: Option) => boolean;
};

// Plays the parent's part for a local list: the search, the rows and what
// Base UI should know
function LocalCombobox({
  options,
  defaultValue = [],
  isOptionHidden,
  ...props
}: LocalComboboxProps) {
  const [value, setValue] = useState(defaultValue);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const listedOptions = options.filter(
    (option) => option.name.toLowerCase().includes(query) && !isOptionHidden?.(option)
  );
  const knownOptions = [
    ...listedOptions,
    ...value.filter((option) => !listedOptions.includes(option)),
  ];

  return (
    <Combobox
      {...props}
      items={knownOptions}
      filteredItems={listedOptions}
      value={value}
      onValueChange={setValue}
      inputValue={search}
      onInputValueChange={setSearch}
      grandTotal={options.length}
    />
  );
}

const PAGE_SIZE = 20;

// Storybook has no API, so this stands in for a paged server search
function fetchOptionsPage({ search, page }: { search: string; page: number }) {
  const matches = manyOptions.filter(({ name }) =>
    name.toLowerCase().includes(search.toLowerCase())
  );
  const data = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return new Promise<{ data: Option[]; total: number }>((resolve) =>
    setTimeout(() => resolve({ data, total: matches.length }), 600)
  );
}

const queryClient = new QueryClient();

// Plays the parent's part for a server list, like the merchants filter
function PagedCombobox() {
  const [value, setValue] = useState<Option[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue({
    value: search.trim(),
    delayMs: 300,
  });

  const {
    data,
    isPending,
    isPlaceholderData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["combobox-story-options", debouncedSearch],
    queryFn: ({ pageParam }) =>
      fetchOptionsPage({ search: debouncedSearch, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      pages.length * PAGE_SIZE < lastPage.total ? pages.length + 1 : undefined,
    placeholderData: keepPreviousData,
  });

  const loadedOptions = data?.pages.flatMap((page) => page.data) ?? [];
  const knownOptions = [
    ...loadedOptions,
    ...value.filter((option) => !loadedOptions.includes(option)),
  ];
  const isSearching = search.trim() !== debouncedSearch || isPlaceholderData;

  return (
    <Combobox<Option>
      label="Options"
      items={knownOptions}
      filteredItems={loadedOptions}
      value={value}
      onValueChange={setValue}
      inputValue={search}
      onInputValueChange={setSearch}
      itemToStringLabel={(option) => option.name}
      itemToStringValue={(option) => option.id}
      placeholder="Search 1,000 options"
      emptyMessage="No options found"
      isSearching={isSearching}
      hasMore={!isSearching && hasNextPage}
      onLoadMore={() => {
        if (!isFetchingNextPage) fetchNextPage();
      }}
      total={data?.pages[0].total}
      grandTotal={manyOptions.length}
      isLoading={isPending}
    />
  );
}

const meta = {
  title: "Components/Form/Combobox",
  component: LocalCombobox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Categories",
    options: categories,
    itemToStringLabel: (option: Option) => option.name,
    itemToStringValue: (option: Option) => option.id,
    placeholder: "Search categories",
    emptyMessage: "No categories found",
  },
} satisfies Meta<typeof LocalCombobox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Value: Story = {
  args: {
    defaultValue: [categories[2], categories[9]],
  },
};

export const Icon: Story = {
  args: {
    icon: <Tags />,
  },
};

export const SettingsMenu: Story = {
  render: function Render(args) {
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [hideZeroSpend, setHideZeroSpend] = useState(true);

    return (
      <LocalCombobox
        {...args}
        isOptionHidden={({ id }) => hideZeroSpend && !spendById[id]}
        renderItem={({ id, name }) => (
          <Row justify="start" wrap="nowrap" gap="2xs">
            <Text fullWidth={false} truncate className="min-w-0">
              {name}
            </Text>
            <Text
              type="supporting"
              color="placeholder"
              fullWidth={false}
              aria-hidden
              className="shrink-0"
            >
              ·
            </Text>
            <Text
              type="supporting"
              color="muted"
              fullWidth={false}
              className="shrink-0 tabular-nums"
            >
              {formatPence({ pence: spendById[id] ?? 0 })}
            </Text>
          </Row>
        )}
        isHeldOpen={settingsOpen}
        headerEnd={
          <Popover onOpenChange={setSettingsOpen}>
            <PopoverTrigger
              render={
                <IconButton variant="ghost" size="xs" aria-label="List settings">
                  <Settings2 />
                </IconButton>
              }
            />
            <PopoverContent align="end" side="bottom" className="p-3">
              <Stack align="start" gap="2xs">
                <Row justify="between" align="center" gap="sm" fullWidth>
                  <Label htmlFor="hide-zero-spend">Hide zero spend</Label>
                  <Switch
                    id="hide-zero-spend"
                    size="sm"
                    checked={hideZeroSpend}
                    onCheckedChange={setHideZeroSpend}
                  />
                </Row>
                <Text color="muted" type="supporting" wrap="nowrap" truncate>
                  Hide options with no spend
                </Text>
              </Stack>
            </PopoverContent>
          </Popover>
        }
      />
    );
  },
};

export const SelectionWarning: Story = {
  args: {
    defaultValue: [categories[1], categories[9]],
    isOptionHidden: ({ id }) => !spendById[id],
    footerStart: (
      <Tooltip>
        <TooltipTrigger
          render={
            <TriangleAlert
              aria-label="Selection warning"
              className="text-warning-text size-2.5 shrink-0"
            />
          }
        />
        <TooltipContent className="max-w-50 text-center">
          Some selected categories have no spend in this period
        </TooltipContent>
      </Tooltip>
    ),
  },
};

export const Loading: Story = {
  args: {
    defaultValue: [categories[2]],
    isLoading: true,
  },
};

export const Virtualized: Story = {
  args: {
    label: "Options",
    options: manyOptions,
    placeholder: "Search 1,000 options",
    emptyMessage: "No options found",
  },
};

export const Paged: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  render: () => <PagedCombobox />,
};
