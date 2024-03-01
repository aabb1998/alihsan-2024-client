import React, { useEffect } from "react";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { getSettings } from "../adminSettings";
import InfoIcon from "@mui/icons-material/Info";
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
  const dispatch = useDispatch();
  const { settings, settingsLoader, qurbanValues, qurbanLoader } = useSelector(
    (state) => state.adminSettings
  );

  useEffect(() => {
    dispatch(getSettings());
  }, []);

  const editDate = (input) => {
    const date = new Date(input);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const formattedDate = `${day} ${months[month]} ${year}`;
    return formattedDate;
  };

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
                  className={option.value === periodDays ? "button-focus" : ""}
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
                  className={option.value === periodDays ? "button-focus" : ""}
                />
              </div>
            ))}
      </fieldset>
      {isRamadanCampaign ? (
        <span className="flex flex-row w-full items-center text-xs font-bold">
          {settings?.ramadanStartDate && (
            <>
              <InfoIcon className="mr-3" />
              Ramadan will start on {editDate(settings?.ramadanStartDate)} and
              will end on {editDate(settings?.ramadanEndDate)} based on global
              moon sighting.
            </>
          )}
        </span>
      ) : null}

      <div className="h-px bg-neutral-300"></div>
    </>
  );
};
