import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "../../theme/svg-icons";

export const Dropdown = ({
  value,
  options,
  onChange,
  name,
  defaultSelect,
  className,
}) => {
  const selectedValue = options.filter((item, i) => item.value == value)[0];
  return (
    <Listbox
      value={selectedValue}
      onChange={(e) => {
        const value = e.value;
        onChange({ value, name });
      }}
      className={`sm:w-41 ${className}`}
    >
      <div className="relative">
        <Listbox.Button className="text-sm font-medium font-Montserrat text-neutral-800 w-full py-1.5 !px-4 !pe-8 border shadow-card border-neutral-300 pr-8 text-start bg-white h-11 max-h-11 rounded-lg">
          <span className="block truncate">
            {selectedValue?.label ? selectedValue?.label : defaultSelect}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none z-1">
            <ChevronDownIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 w-full p-4 mt-1 overflow-auto text-sm font-medium bg-white rounded-md shadow-sm shadow-lg font-Montserrat text-neutral-1000 max-h-60 ring-1 ring-black/5 focus:outline-none">
            {options.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-pointer hover:text-primary-300 select-none py-1.5 px-2 text-start ${
                    active ? "text-primary-300" : "text-neutral-1000"
                  }`
                }
                value={person}
              >
                {({ selected }) => {
                  return (
                    <>
                      <span
                        className={`block truncate text-sm font-medium font-Montserrat text-neutral-1000 hover:text-primary-300 text-start ${
                          selected ? "text-primary-300" : "text-neutral-1000"
                        }`}
                      >
                        {person.label}
                      </span>
                    </>
                  );
                }}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
