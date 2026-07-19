export function formatCurrency(value?: number) {
  if (value === undefined) {
    return "Not set";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatUnitLabel(unit: string) {
  return unit.charAt(0).toUpperCase() + unit.slice(1);
}

export function formatUsage(usageCount: number) {
  return `${usageCount} ${usageCount === 1 ? "activity" : "activities"}`;
}
