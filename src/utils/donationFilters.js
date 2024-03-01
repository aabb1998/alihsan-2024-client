import { currencyConfig } from "./constants";

export const AmountFilters = [
  { label: "All", value: "" },
  {
    label: `${currencyConfig.label}0 - ${currencyConfig.label}50`,
    value: "0-50",
  },
  {
    label: `${currencyConfig.label}50 - ${currencyConfig.label}100`,
    value: "50-100",
  },
  {
    label: `${currencyConfig.label}100 - ${currencyConfig.label}200`,
    value: "100-200",
  },
  { label: `> ${currencyConfig.label}200`, value: "200-" },
];
export const PeriodFilters = [
  { label: "All", value: "" },
  { label: "Today", value: "today" },
  { label: "Last Day", value: "yesterday" },
  { label: "This Week", value: "this_week" },
  { label: "Last Week", value: "last_week" },
  { label: "Custom Date", value: "custom_date" },
];
export const StatusFilters = [
  { label: "Paid", value: "paid" },
  { label: "Pending", value: "pending" },
];

export const donationFiltersList = [
  {
    label: "Amount",
    name: "amount",
    value: "amount",
    defaultSelect: "All amount",
    options: AmountFilters,
  },
  {
    label: "Period",
    name: "period",
    value: "period",
    defaultSelect: "All periods",
    options: PeriodFilters,
  },
  {
    label: "Status",
    name: "status",
    value: "status",
    defaultSelect: "All status",
    options: StatusFilters,
  },
];
