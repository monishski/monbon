import { useEffect, useState } from "react";

export const useDebouncedValue = <Value>({
  value,
  delayMs = 300,
}: {
  value: Value;
  delayMs?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delayMs);
    return () => clearTimeout(timeout);
  }, [value, delayMs]);

  return debouncedValue;
};
