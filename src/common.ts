/**
 * Delay used for certain actions.
 *
 * @remarks Providing just a number will use milliseconds.
 */
export type Delay = number | `${number}ms` | `${number}s`;

export function delayToMs(delay: Delay) {
  if (typeof delay === "number") {
    return delay;
  } else if (typeof delay === "string") {
    const msMatch = delay.match(/^([0-9]+)ms$/);
    if (msMatch != null) {
      return parseInt(msMatch[1], 10);
    }
    const secondsMatch = delay.match(/^([0-9]+\.?[0-9]*)s$/);
    if (secondsMatch != null) {
      return Math.round(parseFloat(secondsMatch[1]) * 1000);
    }
  }

  throw new Error(`Unknown delay value: ${delay}`);
}

export function filterEmptyRecordValues<TValue>(record: Record<string, TValue | undefined>): Record<string, TValue> {
  const result: Record<string, TValue> = {};
  for (const [key, value] of Object.entries(record)) {
    if (value != null) {
      result[key] = value;
    }
  }
  return result;
}
