import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  getLocalTimeZone,
  startOfMonth,
  startOfWeek,
  startOfYear,
  today,
  type CalendarDate,
} from "@internationalized/date";

export function getClampedDate({
  date,
  minValue,
  maxValue,
}: {
  date: CalendarDate;
  minValue?: CalendarDate | null;
  maxValue?: CalendarDate | null;
}) {
  if (minValue && date.compare(minValue) < 0) return minValue;
  if (maxValue && date.compare(maxValue) > 0) return maxValue;
  return date;
}

// Weeks start on Monday regardless of locale, matching the calendar
const LOCALE = "en-GB";
const FIRST_DAY_OF_WEEK = "mon";

export const DATE_RANGE_PRESET_IDS = [
  "last-week",
  "last-month",
  "last-3-months",
  "last-6-months",
  "last-quarter",
  "last-year",
  "this-week",
  "this-month",
  "this-quarter",
  "this-year",
] as const;

export type DateRangePresetId = (typeof DATE_RANGE_PRESET_IDS)[number];

export function getDateRangePreset({
  id,
  now = today(getLocalTimeZone()),
}: {
  id: DateRangePresetId;
  now?: CalendarDate;
}) {
  if (id === "last-week") {
    const lastWeek = now.subtract({ weeks: 1 });
    const start = startOfWeek(lastWeek, LOCALE, FIRST_DAY_OF_WEEK);
    const end = endOfWeek(lastWeek, LOCALE, FIRST_DAY_OF_WEEK);
    return { id, label: "Last week", range: { start, end } };
  }

  if (id === "last-month") {
    const lastMonth = now.subtract({ months: 1 });
    const start = startOfMonth(lastMonth);
    const end = endOfMonth(lastMonth);
    return { id, label: "Last month", range: { start, end } };
  }

  if (id === "last-3-months") {
    const start = startOfMonth(now.subtract({ months: 3 }));
    const end = now;
    return { id, label: "Last 3 months", range: { start, end } };
  }

  if (id === "last-6-months") {
    const start = startOfMonth(now.subtract({ months: 6 }));
    const end = now;
    return { id, label: "Last 6 months", range: { start, end } };
  }

  if (id === "last-quarter") {
    const lastQuarter = now.subtract({ months: 3 });
    const start = lastQuarter.set({
      month: Math.floor((lastQuarter.month - 1) / 3) * 3 + 1,
      day: 1,
    });
    const end = endOfMonth(start.add({ months: 2 }));
    return { id, label: "Last quarter", range: { start, end } };
  }

  if (id === "last-year") {
    const lastYear = now.subtract({ years: 1 });
    const start = startOfYear(lastYear);
    const end = endOfYear(lastYear);
    return { id, label: "Last year", range: { start, end } };
  }

  if (id === "this-week") {
    const start = startOfWeek(now, LOCALE, FIRST_DAY_OF_WEEK);
    const end = endOfWeek(now, LOCALE, FIRST_DAY_OF_WEEK);
    return { id, label: "This week", range: { start, end } };
  }

  if (id === "this-month") {
    const start = startOfMonth(now);
    const end = endOfMonth(now);
    return { id, label: "This month", range: { start, end } };
  }

  if (id === "this-quarter") {
    const start = now.set({
      month: Math.floor((now.month - 1) / 3) * 3 + 1,
      day: 1,
    });
    const end = endOfMonth(start.add({ months: 2 }));
    return { id, label: "This quarter", range: { start, end } };
  }

  // "this-year", the only id left
  const start = startOfYear(now);
  const end = endOfYear(now);
  return { id, label: "This year", range: { start, end } };
}
