import React, { useEffect, useState } from "react";
import { Button } from "../../components";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, CloseIcon, FilterIcon, SearchIcon } from "../../theme/svg-icons";
import { Dropdown } from "../../components/Dropdown";

const tagsList = [
  { value: "", label: "Add Tag", color: "red" },
  { value: 1, label: "Emergency", color: "red" },
  { value: 2, label: "Urgent", color: "orange" },
  { value: 3, label: "New", color: "yellow" },
];
export const Filter = ({
  handleFilterChange,
  isSidebarOpen,
  setIsSidebarOpen,
  filters,
  filtersList,
  handleFilterReset,
  selected,
  selectedTag,
}) => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    setSearch(filters.search);
  }, [filters.search]);
  const resetFilters = () => {
    handleFilterReset();
    setSearch("");
  };
  return (
    <div className="py-7.5 flex items-center justify-between form-group whitespace-nowrap">
      <button
        className="flex gap-1 font-medium sm:hidden text-neutral-800 text-md"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FilterIcon />
        Filter
      </button>
      <div className="flex-col items-start hidden sm:flex">
        <div className="items-center hidden gap-4 sm:flex">
          <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
            <span onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              Filter By:
            </span>
          </label>
          <Dropdown
            value={""}
            onChange={(e) => handleFilterChange(e.name, e.value)}
            options={filtersList}
            name={"tags"}
          />
          <button onClick={resetFilters} className="text-sm font-bold !mb-0">
            Clear
          </button>
        </div>
        <div className="flex gap-2 mt-2">
          {filters.tags.map((i) => (
            <FilteredTag
              key={i}
              {...tagsList.find((j) => j.value + "" == i)}
              onClose={() => handleFilterChange("tags", i)}
            />
          ))}
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="form-group">
          <label className="relative block !mb-0">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-neutral-500">
              <SearchIcon />
            </span>
            <input
              className="block w-full !py-2.5 !pr-3 bg-white border rounded-md form-control !pl-11 md:w-[200px] lg:w-[300px]"
              placeholder="Search"
              type="text"
              name="search"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              autoComplete="off"
            />
          </label>
        </div>
      </div>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 min-w-[16.875rem] h-screen transition-transform md:-translate-x-full sm:hidden`}
        aria-label="Sidebar"
        style={{
          transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className="h-full flex flex-col gap-4 px-5 py-7.5 overflow-y-auto bg-neutral-100">
          <div className="flex items-center justify-between">
            <h3 className="text-button-lg text-neutral-800">Filter</h3>
            <div className="cursor-pointer text-neutral-500">
              <CloseIcon
                iconSize={24}
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="relative block !mb-0">
              <span className="sr-only">Search</span>
              <Button
                name="search"
                className="absolute inset-y-0 right-0 flex items-center !p-2 rounded-lg !rounded-tl-none !rounded-bl-none text-primary-300 bg-accent-300"
                rightIcon={<SearchIcon />}
                onClick={() => {
                  handleFilterChange("search", search);
                  setIsSidebarOpen(false);
                }}
              />

              <input
                className="block w-full !py-2 !pr-12 bg-white border rounded-md form-control"
                placeholder="Search"
                type="text"
                name="search"
                value={search}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleFilterChange("search", search);
                    setIsSidebarOpen(false);
                  }
                }}
              />
            </label>
          </div>
          <div className="flex flex-col items-start gap-2 mt-2">
            {filters.tags.map((i) => (
              <FilteredTag
                key={i}
                {...tagsList.find((j) => j.value + "" === i)}
                onClose={() => handleFilterChange("tags", i)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-7.5">
            <div className="flex flex-col gap-7.5">
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button className={"w-full"}>
                      <Button
                        className={
                          "flex items-center justify-between w-full"
                        }
                        variant={"none"}
                        label={
                          <>
                            <span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">
                              Select a Tag
                            </span>
                            <span
                              className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                open ? "rotate-180 transform " : ""
                              }`}
                            >
                              <ChevronDownIcon iconSize={20} />
                            </span>
                          </>
                        }
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                      {filtersList?.length ? (
                        filtersList.map((filter) => (
                          <Button
                            className={
                              "w-full flex text-sm font-medium grow-1 text-neutral-800"
                            }
                            variant={"none"}
                            value=""
                            name="tags"
                            onClick={(e) =>
                              handleFilterChange("tags", filter.id + "")
                            }
                            label={filter.label}
                          />
                        ))
                      ) : (
                        <div className="text-neutral-600">Nothing to show</div>
                      )}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
            <Button
              className={"flex items-center justify-between w-full"}
              variant={"none"}
              onClick={resetFilters}
              label={
                <span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">
                  Clear
                </span>
              }
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

const FilteredTag = ({ label, id, color, onClose }) => (
  <div
    className="flex items-center gap-2 p-2 rounded cursor-pointer"
    style={{ backgroundColor: color }}
  >
    <span className="text-sm font-bold text-primary-300">{label}</span>
    <CloseIcon iconSize={16} onClick={onClose} />
  </div>
);
