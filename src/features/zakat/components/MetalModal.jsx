import React, { useState, useEffect } from "react";
import {
  HelpCircleIcon,
  PlusIcon,
  EditIcon,
  CloseIcon,
} from "../../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { zakatMetalInput } from "../slice";
import { Tooltip } from "react-tooltip";

const validateAmount = (value) => {
  if (!value) return "Input is required";
  if (isNaN(Number(value))) return "Invalid Amount";
  return "";
};

export default function MetalModal({ visible, onRequestClose, metal }) {
  const dispatch = useDispatch();
  const { goldUsd, silverUsd, audToUsd } = useSelector(
    (state) => state.zakatCalculator.prices
  );
  const { unit, gold, silver, cash } = useSelector(
    (state) => state.zakatCalculator.amounts
  );
  const { goldPriceList } = useSelector((state) => state.zakatCalculator);

  const metalUsd = metal === "silver" ? silverUsd : goldUsd;
  const metalPrice = unit === "USD" ? metalUsd : metalUsd / audToUsd;
  const [data, setData] = useState({
    touched: {},
    errors: {},
    values: {
      unit: "gram",
    },
    toChange: "value",
  });
  const handleChange = (name, value, rerun) => {
    console.log(value);
    let error = "",
      val = Number(value);
    if (name !== "unit") {
      error = validateAmount(value);
    }
    setData(({ touched, errors, values, toChange }) => ({
      touched: { ...touched, [name]: true },
      errors: { ...errors, [name]: error },
      values: { ...values, [name]: value },
      toChange:
        name === "value" ? "weight" : name === "weight" ? "value" : toChange,
    }));
    if (name === "weight" && value === "") {
      setData((prevState) => ({
        ...prevState,
        values: { ...prevState.values, value: "" },
      }));
    }

    /*
    if(rerun) console.log(value, val, name, 'rerunniung')
    if(rerun || error) return;
    const metalUnitPrice = data.values.unit === 'gram' ? metalPrice : metalPrice * 28.35;
    if(name==='value')
      handleChange('weight', val/metalUnitPrice, true)
    else if(name==='weight')
      handleChange('value', val*metalUnitPrice, true)*/
  };
  const handleSubmit = () => {
    const karatErr = data.values.karat === "1" ? "Invalid value " : "";
    const valueErr = validateAmount(data.values.value);
    const weightErr = validateAmount(data.values.weight);
    if (karatErr || valueErr || weightErr)
      setData(({ touched, errors, values }) => ({
        touched: { karat: true, value: true, weight: true },
        errors: { karat: karatErr, weight: weightErr, value: valueErr },
        values,
      }));
    else {
      dispatch(
        zakatMetalInput({
          name: metal,
          karat: data.values.karat,
          unit: data.values.unit,
          value: Number(data.values.value),
          weight: Number(data.values.weight),
        })
      );
      onRequestClose();
    }
  };
  useEffect(() => {
    const metalData = metal === "gold" ? gold : silver;
    const errors = metalData.value
      ? {}
      : {
        karat: "Input is required",
        unit: "",
        weight: "Input is required",
        value: "Input is required",
      };
    setData({ touched: {}, errors: {}, values: { ...metalData } });
  }, [gold, silver, metal]);

  useEffect(() => {
    if (
      data.toChange === "value" &&
      !data.errors.unit &&
      !data.errors.karat &&
      !data.errors.weight
    ) {
      const metalUnitPrice =
        data.values.unit === "gram" ? metalPrice : metalPrice * 28.35;
      // values: { ...values, value: data.values.weight * metalUnitPrice },

      console.log("-------------------------------------");
      console.log(data.values.weight, "data.values.weight");
      console.log(data.values.karat, "data.values.karat");
      console.log(metalUnitPrice, "data.values.unit");
      console.log("-------------------------------------");

      const calculatedValue =
        data.values.weight *
        data.values.karat *
        (data.values.unit === "ounce" ? 28.35 : 1);

      if (calculatedValue === data.values.value) return;

      setData(({ errors, toChange, values, touched }) => ({
        errors: { ...errors, value: "" },
        toChange,
        values: { ...values, value: calculatedValue },
        touched: { ...touched, value: true },
      }));
    } else if (
      data.toChange === "weight" &&
      !data.errors.unit &&
      !data.errors.karat &&
      !data.errors.value
    ) {
      const metalUnitPrice =
        data.values.unit === "gram" ? metalPrice : metalPrice * 28.35;
      if (data.values.value / metalUnitPrice === data.values.weight) return;
      setData(({ errors, toChange, values, touched }) => ({
        errors: { ...errors, value: "" },
        toChange,
        values: { ...values, weight: data.values.value / metalUnitPrice },
        touched: { ...touched, weight: true },
      }));
    }
    // else if (data.values.weight === "") {

    // }
  }, [data]);

  const setKaratList = () => {
    if (unit === "USD") {
      if (metal === "gold") {
        return goldPriceList["goldPriceInUsd"];
      } else if (metal === "silver") {
        return [
          {
            label: "Sterling",
            value: goldPriceList?.silverSterlingPriceInUsd * 0.925,
          },
          { label: "Fine", value: goldPriceList?.silverFinePriceInUsd },
        ];
      }
    } else if (unit === "AUD") {
      if (metal === "gold") {
        return goldPriceList["goldPriceInAud"];
      } else if (metal === "silver") {
        return [
          {
            label: "Sterling",
            value: goldPriceList?.silverSterlingPriceInAud * 0.925,
          },
          { label: "Fine", value: goldPriceList?.silverFinePriceInAud },
        ];
      }
    }

    return [];
  };

  return (
    <div
      className={"relative z-10 " + (visible ? "block" : "hidden")}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-2.5xl sm:rounded-3xl sm:my-8 sm:max-w-modal rounded-b-none">
              <div className="bg-white px-4 pt-4 pb-7.5 sm:px-10 sm:pt-10 sm:pb-10 py-10">
                <div className="flex flex-col gap-5 sm:gap-8">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-heading-6">
                      Add Zakatable {metal === "gold" ? "Gold" : "Silver"}
                    </div>
                    <button
                      className="text-neutral-1000"
                      onClick={() => onRequestClose()}
                    >
                      <CloseIcon iconSize={24} />
                    </button>
                  </div>
                  <div className="">
                    {/* <label htmlFor="SelectProject" className="flex mb-2 text-sm text-neutral-1000">Karat<span className='text-red-300'>*</span> <InfoIcon iconSize={16}  strokeWidth={2} /></label> */}
                    <div className="flex items-center gap-1 mb-2 sm:gap-3">
                      <div className="!mb-0 text-sm font-medium text-neutral-1000">
                        Karat<span className="text-red-300">*</span>
                      </div>
                      <span className="cursor-pointer text-neutral-700 hover:text-primary-300" data-tooltip-id="my-tooltip" data-tooltip-place="bottom-end">
                        <HelpCircleIcon iconSize={16} strokeWidth={2} />
                        <Tooltip id="my-tooltip" className="opacity-100 tooltip" style={{ backgroundColor: "#fff", padding: "1rem", }}>

                          <div>
                            <h2 className="mb-2 text-neutral-1000 text-button-md">Text Title Goes Here</h2>
                            <p className="text-xs font-medium text-neutral-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                          </div>
                        </Tooltip>
                      </span>
                    </div>
                    <div className="mb-5 form-group">
                      <select
                        className="w-full text-sm !text-neutral-800 form-control"
                        id="SelectProject"
                        onChange={(e) => handleChange("karat", e.target.value)}
                        value={data.values.karat}
                      >
                        <option value="1">Select</option>
                        {setKaratList().map((each) => (
                          <option value={each.value}>{each.label}</option>
                        ))}
                      </select>
                      {data.touched.karat && data.errors.karat ? (
                        <div className="mt-2 text-sm text-red-300">
                          {data.errors.karat}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="flex flex-col gap-5">
                      <div>
                        <label
                          htmlFor="Weight"
                          className="block mb-2 text-sm font-medium text-neutral-1000"
                        >
                          Unit:
                        </label>
                        <div className="p-2 bg-accent-100 border border-neutral-200 rounded-lg gap-3.5 flex">
                          {[
                            { value: "gram", label: "Gram" },
                            { value: "ounce", label: "Ounce" },
                          ].map((i) => (
                            <button
                              key={i.value}
                              className={`btn btn-${i.value === data.values.unit
                                ? "primary"
                                : "neutral-text"
                                } filled`}
                              onClick={() => handleChange("unit", i.value)}
                            >
                              {i.label}
                            </button>
                          ))}
                        </div>
                        {data.touched.unit && data.errors.unit ? (
                          <div className="mt-2 text-sm text-red-300">
                            {data.errors.unit}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="flex flex-col form-group">
                        <label
                          htmlFor="Weight"
                          className="mb-2 text-sm font-medium text-neutral-1000"
                        >
                          Weight<span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="Weight"
                          placeholder="0"
                          name="weight"
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          value={data.values.weight}
                        />
                        {data.touched.weight && data.errors.weight ? (
                          <div className="mt-2 text-sm text-red-300">
                            {data.errors.weight}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="flex flex-col form-group">
                        <label
                          htmlFor="Value"
                          className="mb-2 text-sm font-medium text-neutral-1000"
                        >
                          Value<span className="text-red-300">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="Value"
                          placeholder="0"
                          name="value"
                          readOnly={true}
                          onChange={(e) =>
                            handleChange(e.target.name, e.target.value)
                          }
                          value={data.values.value}
                        />
                        {data.touched.value && data.errors.value ? (
                          <div className="mt-2 text-sm text-red-300">
                            {data.errors.value}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary filled"
                    >
                      Add Zakatable {metal === "gold" ? "Gold" : "Silver"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
