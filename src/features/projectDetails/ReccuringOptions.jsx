import React from "react"
import Button from "../../components/Button"

export const ReccuringOptions=({recurringPeriods,handleChange,periodDays})=>{

    return(
        <>
              <fieldset className="grid justify-between gap-4 md:gap-3.5 grid-cols-3">
                <legend className="sr-only">Select a recurring period</legend>
                {recurringPeriods.map((option) => (
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
    )
}