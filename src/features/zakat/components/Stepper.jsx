import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { zakatStep } from "../slice";

export default function Stepper() {
  const step = useSelector((state) => state.zakatCalculator.step);
  const dispatch = useDispatch();
  return (
    <ul className="grid grid-cols-5 gap-2 [&>*]:h-2.5 mb-6 md:mb-10 [&>*]:rounded-full [&>*]:bg-neutral-200">
      {[1, 2, 3, 4, 5].map((i) => (
        <li
          key={i}
          className={
            i === step ? "!bg-accent-300" : i < step ? "!bg-primary-300 cursor-pointer" : ""
          }
          onClick={() => i < step && dispatch(zakatStep(-1 * (step - i)))}
        />
      ))}
    </ul>
  );
}
