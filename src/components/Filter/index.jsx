import { Fragment, useEffect, useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  SearchIcon,
} from "../../theme/svg-icons";
import Button from "../Button";
import { Disclosure, Transition } from "@headlessui/react";
import { Dropdown } from "../Dropdown";

const Filter = ({
  handleFilterChange,
  handleFilterReset,
  filters,
  filtersList,
  isSearch,
  sortList = [],
  children,
}) => {
  const [search, setSearch] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const resetFilters = () => {
    handleFilterReset();
    setSearch("");
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    setSearch(filters?.search);
  }, [filters?.search]);
  return (
    <div className="my-5 md:my-7.5 flex justify-between items-center">
      <Button
        className="flex gap-1 text-sm font-bold md:hidden text-neutral-800"
        onClick={() => setIsSidebarOpen(true)}
        label={"Filter"}
        variant={"none"}
        leftIcon={<FilterIcon />}
      />

      <div className="flex-col items-start hidden md:flex">
        <div className="flex items-center gap-2 md:gap-4">
          {filtersList.length > 0 && (
            <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
              Filter By:
            </label>
          )}
          {filtersList.map((filterList, i) => (
            <Dropdown
              key={i}
              value={filters[filterList.value]}
              onChange={(e) => handleFilterChange(filterList.name, e.value)}
              options={filterList.options}
              name={filterList.name}
              defaultSelect={filterList?.defaultSelect ?? "All"}
            />
          ))}
          {sortList?.length > 0 && (
            <label htmlFor="SortyBy" className="text-sm font-bold !mb-0">
              Sort By:
            </label>
          )}
          {sortList.map((sort, i) => (
            <Dropdown
              key={i}
              value={filters[sort.value]}
              onChange={(e) => handleFilterChange(sort.name, e.value)}
              options={sort.options}
              name={sort.name}
              defaultSelect={sort?.defaultSelect ?? ""}
            />
          ))}
          {sortList?.length > 0 || filtersList?.length > 0 ? (
            <Button
              onClick={resetFilters}
              className="text-sm font-bold !mb-0"
              label={"Clear"}
              variant={"none"}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      {isSearch && (
        <div className="justify-end hidden md:flex">
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
                value={filters?.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                autoComplete="off"
              />
            </label>
          </div>
        </div>
      )}
      {children}
      <Transition
        as={Fragment}
        appear={true}
        show={isSidebarOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 delay-500 ease-in-out w-screen overflow-y-auto bg-neutral-1000/40 h-screen transition-transform md:-translate-x-full lg:hidden`}
          aria-label="Sidebar"
          style={{
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <div className="h-full max-w-xs min-w-[16.875rem] flex flex-col gap-4 px-5 py-7.5 overflow-y-auto bg-neutral-100">
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
              {isSearch && (
                <div className="relative block !mb-0">
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
                </div>
              )}
            </div>
            <div className="flex flex-col gap-7.5">
              <div className="flex flex-col gap-7.5">
                {filtersList.map((filterList, i) => (
                  <Disclosure as="div" key={i}>
                    {({ open }) => (
                      <>
                        <Disclosure.Button className={"w-full"}>
                          <div className="flex items-center justify-between w-full">
                            <Button
                              className={
                                "flex items-center justify-between w-full"
                              }
                              variant={"none"}
                              label={
                                <>
                                  <span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">
                                    {filterList.label}
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
                          </div>
                        </Disclosure.Button>
                        <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                          {filterList.options.map((filter, i) => (
                            <Button
                              key={i}
                              className={`w-full flex text-sm font-medium grow-1 text-neutral-800 ${
                                filters[filterList.value] === filter.value &&
                                " !font-bold"
                              }`}
                              variant={"none"}
                              onClick={(e) => {
                                handleFilterChange(
                                  filterList.name,
                                  filter.value
                                );
                                setIsSidebarOpen(false);
                              }}
                              label={filter.label}
                            />
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}

                {sortList.map((filterList, i) => (
                  <Disclosure as="div" key={i}>
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
                                  {filterList.label}
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
                          {filterList.options.map((filter, i) => (
                            <Button
                              key={i}
                              className={`w-full flex text-sm font-medium grow-1 text-neutral-800 ${
                                filters[filterList.value] === filter.value &&
                                " !font-bold"
                              }`}
                              variant={"none"}
                              onClick={(e) => {
                                handleFilterChange(
                                  filterList.name,
                                  filter.value
                                );
                                setIsSidebarOpen(false);
                              }}
                              label={filter.label}
                            />
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
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
      </Transition>
    </div>
  );
};

export default Filter;
