import React from "react";
import Button from "../../components/Button";
const ramadanPeriods = [
  { value: "1", label: "Daily" },
  { value: "7", label: "Weekly" },
  { value: "10", label: "Last 10 days" },
];
const recurringPeriods = [
  { value: "7", label: "Weekly" },
  { value: "30", label: "Monthly" },
  { value: "365", label: "Yearly" },
];
export const ReccuringOptions = ({
  handleChange,
  periodDays,
  isRamadanCampaign,
}) => {
  return (
    <>
      <fieldset className="grid justify-between gap-4 md:gap-3.5 grid-cols-3">
        <legend className="sr-only">Select a recurring period</legend>
        {isRamadanCampaign
          ? ramadanPeriods.map((option) => (
              <div key={option.value} className="col-span-1">
                <Button
                  type="button"
                  onClick={handleChange}
                  value={option.value}
                  label={option.label}
                  name="periodDays"
                  variant={"secondaryOutlineFull"}
                  className={
                    option.value === periodDays
                      ? "bg-primary-300 !text-white"
                      : ""
                  }
                />
              </div>
            ))
          : recurringPeriods.map((option) => (
              <div key={option.value} className="col-span-1">
                <Button
                  type="button"
                  onClick={handleChange}
                  value={option.value}
                  label={option.label}
                  name="periodDays"
                  variant={"secondaryOutlineFull"}
                  className={
                    option.value === periodDays
                      ? "bg-primary-300 !text-white"
                      : ""
                  }
                />
              </div>
            ))}
      </fieldset>
      <div className="h-px bg-neutral-300"></div>
    </>
  );
};
