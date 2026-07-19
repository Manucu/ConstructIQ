export type ParsedOptionalNumber = {
  value?: number;
  isValid: boolean;
};

export function parseOptionalNonNegativeNumber(
  rawValue: string
): ParsedOptionalNumber {
  if (rawValue.trim() === "") {
    return {
      value: undefined,
      isValid: true,
    };
  }

  const value = Number(rawValue);

  return {
    value,
    isValid:
      Number.isFinite(value) &&
      value >= 0,
  };
}
