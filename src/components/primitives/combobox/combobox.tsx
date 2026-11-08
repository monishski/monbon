"use client";

import type { ComponentProps, ReactNode } from "react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Combobox as BaseCombobox } from "@base-ui/react/combobox";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Check, ChevronDown, Search, X } from "lucide-react";

import { Badge } from "../badge";
import { Button, IconButton } from "../button";
import { Flex, Row, Stack } from "../flex";
import { ScrollArea } from "../scroll-area";
import { Skeleton } from "../skeleton";
import { Spinner } from "../spinner";
import { Text } from "../typography";
import { comboboxVariants } from "./combobox.variants";

// Placeholder rows shown while more rows load
const SKELETON_ROW_COUNT = 3;

type BaseComboboxRootProps<Item> = ComponentProps<typeof BaseCombobox.Root<Item, true>>;

export type ComboboxProps<Item> = {
  // The rows to show, followed by any selections they leave out, since
  // Base UI unselects anything it doesn't know
  items: readonly Item[];
  // The rows to show, in the same order they start items, since Base UI
  // finds the selected row by its position
  filteredItems: readonly Item[];
  value: Item[];
  onValueChange: (value: Item[]) => void;
  inputValue: string;
  // Also called with "" when the popup opens or closes, or the search is
  // cleared
  onInputValueChange: (inputValue: string) => void;
  itemToStringLabel: (item: Item) => string;
  // Also identifies items, so selections match rows by it
  itemToStringValue: (item: Item) => string;
  label: string;
  icon?: ReactNode;
  renderItem?: (item: Item) => ReactNode;
  // Content of a placeholder row while more rows load, shaped like an item
  renderItemSkeleton?: (index: number) => ReactNode;
  placeholder?: string;
  emptyMessage?: ReactNode;
  // Rendered at the end of the search row, e.g. a settings menu
  headerEnd?: ReactNode;
  // Rendered before the count in the footer, e.g. a warning
  footerStart?: ReactNode;
  // Keeps the popup open, e.g. while a menu from headerEnd is open
  isHeldOpen?: boolean;
  isLoading?: boolean;
  // Results for the search are on their way, so skeleton rows stand in
  isSearching?: boolean;
  // More rows can load, so skeleton rows end the list
  hasMore?: boolean;
  // Called when the end of the list comes into view, or grows while in view
  onLoadMore?: () => void;
  // "4 of 31 items": rows matching the search, and rows in all
  total?: number;
  grandTotal: number;
};

export function Combobox<Item>({
  items,
  filteredItems,
  value,
  onValueChange,
  inputValue,
  onInputValueChange,
  itemToStringLabel,
  itemToStringValue,
  label,
  icon,
  renderItem,
  renderItemSkeleton = (index) => (
    <Skeleton className={index % 2 ? "h-3.5 w-1/2" : "h-3.5 w-2/3"} />
  ),
  placeholder = "Search",
  emptyMessage = "No results found",
  headerEnd,
  footerStart,
  isHeldOpen = false,
  isLoading = false,
  isSearching = false,
  hasMore = false,
  onLoadMore,
  total = filteredItems.length,
  grandTotal,
}: ComboboxProps<Item>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The list's scroll container, which only exists while the popup is open
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(null);

  // Sizes match the item slot: 32px rows, 2px apart, inside 4px of padding.
  // The React Compiler can't memoise what useVirtualizer returns, so it skips
  // this component
  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: filteredItems.length + (hasMore ? SKELETON_ROW_COUNT : 0),
    getScrollElement: () => scrollElement,
    estimateSize: () => 32,
    gap: 2,
    paddingStart: 4,
    paddingEnd: 4,
    overscan: 8,
  });
  const virtualRows = virtualizer.getVirtualItems();

  // Overscan renders the skeleton rows early, so the next page starts loading
  // before they scroll into view
  const isEndRendered =
    scrollElement !== null &&
    hasMore &&
    (virtualRows.at(-1)?.index ?? -1) >= filteredItems.length;

  const loadMore = useEffectEvent(() => onLoadMore?.());

  useEffect(() => {
    if (isEndRendered) loadMore();
    // The length fires it again when a page lands with the end still in view
  }, [isEndRendered, filteredItems.length]);

  const updateSearch = (nextInputValue: string) => {
    onInputValueChange(nextInputValue);
    virtualizer.scrollToOffset(0); // New results start from the top
  };

  const handleOpenChange: BaseComboboxRootProps<Item>["onOpenChange"] = (
    nextOpen,
    eventDetails
  ) => {
    if (!nextOpen && isHeldOpen) {
      eventDetails.cancel();
      return;
    }
    updateSearch(""); // Every open and close starts the search afresh
  };

  const handleInputValueChange: BaseComboboxRootProps<Item>["onInputValueChange"] = (
    nextInputValue,
    { reason }
  ) => {
    // Ignoring Base UI's clears after picks and Clear keeps the search
    if (reason === "input-clear" || reason === "clear-press") return;
    updateSearch(nextInputValue);
  };

  const handleClearSearch = () => {
    updateSearch("");
    inputRef.current?.focus();
  };

  // Scrolls keyboard highlights into view, skipping left-out selections that
  // have no row
  const handleItemHighlighted: BaseComboboxRootProps<Item>["onItemHighlighted"] = (
    _highlightedItem,
    { reason, index }
  ) => {
    if (reason !== "pointer" && index >= 0 && index < filteredItems.length) {
      virtualizer.scrollToIndex(index, { align: "auto" });
    }
  };

  const {
    root,
    badge,
    trigger,
    triggerIcon,
    popup,
    search,
    searchInput,
    scrollArea,
    list,
    item,
    itemLabel,
    itemIndicator,
    skeletonRow,
    empty,
    emptySkeleton,
    emptySkeletonRow,
    footer,
    clear,
  } = comboboxVariants({
    hasValue: value.length > 0,
    active: value.length > 0,
    disabled: isLoading,
  });

  const itemsLabel = grandTotal === 1 ? "item" : "items";
  // "16 items" for the full list, "4 of 31 items" once it's narrowed
  const itemCount =
    total === grandTotal
      ? `${grandTotal} ${itemsLabel}`
      : `${total} of ${grandTotal} ${itemsLabel}`;

  return (
    <BaseCombobox.Root
      multiple
      virtualized
      disabled={isLoading}
      items={items}
      filteredItems={filteredItems}
      value={value}
      onValueChange={onValueChange}
      onOpenChange={handleOpenChange}
      inputValue={inputValue}
      onInputValueChange={handleInputValueChange}
      itemToStringLabel={itemToStringLabel}
      itemToStringValue={itemToStringValue}
      isItemEqualToValue={(itemValue, selectedValue) =>
        itemToStringValue(itemValue) === itemToStringValue(selectedValue)
      }
      onItemHighlighted={handleItemHighlighted}
    >
      <Flex ref={rootRef} inline gap="1.5" className={root()}>
        {icon}
        {label}
        <Badge variant="primary" aria-hidden={value.length === 0} className={badge()}>
          {value.length}
        </Badge>
        <BaseCombobox.Trigger
          disabled={isLoading}
          render={
            <IconButton
              variant="ghost"
              size="xs"
              aria-label={label}
              disabled={isLoading}
              className={trigger()}
            >
              {isLoading ? (
                <Spinner size="md" />
              ) : (
                <ChevronDown className={triggerIcon()} />
              )}
            </IconButton>
          }
        />
      </Flex>

      <BaseCombobox.Portal>
        <BaseCombobox.Positioner anchor={rootRef} align="start" sideOffset={4}>
          <BaseCombobox.Popup className={popup()}>
            <Row gap="sm" justify="start" className={search()}>
              {isSearching ? <Spinner size="sm" /> : <Search />}
              <BaseCombobox.Input
                ref={inputRef}
                placeholder={placeholder}
                aria-label={placeholder}
                className={searchInput()}
              />
              <Row gap="2xs">
                {inputValue && (
                  <IconButton
                    variant="ghost"
                    size="xs"
                    aria-label="Clear search"
                    onClick={handleClearSearch}
                  >
                    <X />
                  </IconButton>
                )}
                {headerEnd}
              </Row>
            </Row>

            <BaseCombobox.Empty>
              {/* With no rows to keep, a search loads into skeleton rows */}
              {isSearching ? (
                <Stack gap="2xs" aria-hidden className={emptySkeleton()}>
                  {Array.from({ length: SKELETON_ROW_COUNT }, (_, index) => (
                    <Flex
                      key={index}
                      justify="start"
                      fullWidth
                      className={emptySkeletonRow()}
                    >
                      {renderItemSkeleton(index)}
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <Text as="p" type="body-sm" color="muted" className={empty()}>
                  {emptyMessage}
                </Text>
              )}
            </BaseCombobox.Empty>

            {filteredItems.length > 0 && (
              <ScrollArea viewportRef={setScrollElement} className={scrollArea()}>
                <BaseCombobox.List
                  className={list()}
                  style={{ height: virtualizer.getTotalSize() }}
                >
                  {virtualRows.map((row) => {
                    const rowItem = filteredItems[row.index];
                    const transform = `translateY(${row.start}px)`;

                    if (row.index >= filteredItems.length) {
                      const skeletonIndex = row.index - filteredItems.length;

                      return (
                        <Flex
                          key={`skeleton-${skeletonIndex}`}
                          ref={virtualizer.measureElement}
                          data-index={row.index}
                          aria-hidden
                          justify="start"
                          className={skeletonRow()}
                          style={{ transform }}
                        >
                          {renderItemSkeleton(skeletonIndex)}
                        </Flex>
                      );
                    }

                    return (
                      <BaseCombobox.Item
                        key={itemToStringValue(rowItem)}
                        ref={virtualizer.measureElement}
                        data-index={row.index}
                        index={row.index}
                        value={rowItem}
                        aria-setsize={total}
                        aria-posinset={row.index + 1}
                        className={item()}
                        style={{ transform }}
                      >
                        <Flex grow justify="start" className={itemLabel()}>
                          {renderItem ? (
                            renderItem(rowItem)
                          ) : (
                            <Text truncate>{itemToStringLabel(rowItem)}</Text>
                          )}
                        </Flex>
                        <BaseCombobox.ItemIndicator className={itemIndicator()}>
                          <Check />
                        </BaseCombobox.ItemIndicator>
                      </BaseCombobox.Item>
                    );
                  })}
                </BaseCombobox.List>
              </ScrollArea>
            )}

            {/* Also shown for an empty list without a search, to reach Clear */}
            {(filteredItems.length > 0 || (value.length > 0 && !inputValue)) && (
              <Row justify="between" className={footer()}>
                <Row justify="start" gap="xs">
                  {footerStart}
                  <Text
                    type="body-sm"
                    color="muted"
                    fullWidth={false}
                    className="tabular-nums"
                  >
                    {value.length > 0 && `${value.length} selected · `}
                    {itemCount}
                  </Text>
                </Row>

                {/* Kept mounted, since it only shows itself for chips */}
                {value.length > 0 && (
                  <BaseCombobox.Clear
                    keepMounted
                    render={
                      <Button variant="ghost" size="xs" className={clear()}>
                        Clear
                      </Button>
                    }
                  />
                )}
              </Row>
            )}
          </BaseCombobox.Popup>
        </BaseCombobox.Positioner>
      </BaseCombobox.Portal>
    </BaseCombobox.Root>
  );
}
