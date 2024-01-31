import React from "react";
import Button from "../../../components/Button";
import { useDispatch } from "react-redux";
import { zakatStep } from "../slice";

export default function Step1() {
  const dispatch = useDispatch();
  return (
    <>
      <h2 className="mb-6 md:mb-10 text-heading-5 md:text-heading-2">
        Let's calculate your Zakaat-Al-Maal.
      </h2>
      <p className="mb-6 text-sm sm:mb-5 md:text-md">
        In Sharia, Zakat al-Maal is an Islamic financial obligation requiring
        Muslims to donate 2.5% of their wealth annually to the needy.
      </p>
      <Button
        variant="primary"
        label="Bismillah, calculate."
        onClick={() => dispatch(zakatStep(1))}
      />
    </>
  );
}
