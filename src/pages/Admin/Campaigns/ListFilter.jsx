import { Disclosure } from "@headlessui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon, CloseIcon, FilterIcon, SearchIcon } from "../../../theme/svg-icons";
import { ProjectStatuses, CheckoutTypes } from '../../../utils/constants';
import { Button } from "../../../components";

export function ListFilter({ categories = [], filters, setFilters }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleSidebar = (visible) => {
    setSearch(filters.search);
    setSidebarOpen(visible);
  };
  useEffect(() => {
    setSidebarOpen(false);
  }, [filters]);
  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between my-5 md:my-7.5 gap-2">
        <form className="flex items-center gap-4">
          <label
            onClick={() => toggleSidebar(true)}
            className="flex items-center gap-1 cursor-pointer text-button-md text-neutral-1000"
          >
            <span className=" md:hidden">
              <FilterIcon />{" "}
            </span>
            Filter:
          </label>
          <div className="flex-wrap hidden gap-2 md:flex">
            <select
              className="border rounded border-neutral-300 py-1.5 px-3 w-full  md:w-40 pr-6 grow basis-0"
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value })}
            >
              <option
                className="text-sm font-medium font-Montserrat text-neutral-800"
                value=""
              >
                All
              </option>
              {ProjectStatuses.map(({ value, label }) => (
                <option
                  className="text-sm font-medium font-Montserrat text-neutral-800"
                  value={value}
                  key={value}
                >
                  {label}
                </option>
              ))}
            </select>
            <select
              className="border rounded border-neutral-300 py-1.5 px-3 w-full md:w-40 pr-6 grow basis-0"
              value={filters.checkoutType}
              onChange={(e) => setFilters({ checkoutType: e.target.value })}
            >
              <option
                className="text-sm font-medium font-Montserrat text-neutral-800"
                value=""
              >
                All
              </option>
              {CheckoutTypes.map(({ value, label }) => (
                <option
                  className="text-sm font-medium font-Montserrat text-neutral-800"
                  value={value}
                  key={value}
                >
                  {label}
                </option>
              ))}
            </select>
            <select
              className="border rounded border-neutral-300 py-1.5 px-3 w-full md:w-40 pr-6 grow basis-0"
              value={filters.categoryId}
              onChange={(e) => setFilters({ categoryId: e.target.value })}
            >
              <option
                className="text-sm font-medium font-Montserrat text-neutral-800"
                value=""
              >
                All
              </option>
              {categories.map(({ id: value, name: label }) => (
                <option
                  className="text-sm font-medium font-Montserrat text-neutral-800"
                  value={value}
                  key={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="hidden text-button-md text-neutral-1000 md:block"
            variant=""
            label={"Clear"}
            onClick={(e) => {
              e.preventDefault();
              setFilters();
            }}
          />
        </form>
        <div className="hidden w-full md:block md:w-auto form-group md:min-w-72">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
              <SearchIcon />
            </span>
            <input
              className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9"
              placeholder="Search"
              type="text"
              name="search"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div
        className={
          "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 md:hidden z-1 " +
          (sidebarOpen ? "" : "hidden")
        }
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center md:p-0">
            <aside
              id="default-sidebar"
              className={`fixed top-0 left-0 z-40 min-w-[16.875rem] h-screen transition-transform md:-translate-x-full md:hidden`}
              aria-label="Sidebar"
            >
              <div className="h-full flex flex-col gap-4 px-5 py-7.5 overflow-y-auto bg-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-button-lg text-neutral-800">Filter</h3>
                  <div className="cursor-pointer text-neutral-500">
                    <CloseIcon
                      iconSize={24}
                      onClick={() => toggleSidebar(false)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="relative block !mb-0">
                    <span className="sr-only">Search</span>
                    <Button
                      name="search"
                      value={search}
                      className="absolute inset-y-0 right-0 flex items-center !p-2 !rounded-lg !rounded-tl-none !rounded-bl-none text-primary-300 bg-accent-300"
                      onClick={() => setFilters({ search: search })}
                      rightIcon={<SearchIcon />}
                    />

                    {/* </span> */}
                    <input
                      className="block w-full !py-2 !pr-12 bg-white border rounded-md form-control"
                      placeholder="Search"
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
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
                                    Status
                                  </span>
                                  <span
                                    className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                      open && "rotate-180 transform "
                                    }`}
                                  >
                                    <ChevronDownIcon iconSize={20} />
                                  </span>
                                </>
                              }
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                            {[
                              { value: "", label: "All" },
                              ...ProjectStatuses,
                            ].map((status) => (
                              <Button
                                className={
                                  "w-full flex text-sm grow-1 " +
                                  (status.value === filters.status
                                    ? "font-bold text-neutral-700"
                                    : "font-medium text-neutral-900")
                                }
                                variant="none"
                                value={status.value}
                                name={"projectStatus"}
                                onClick={() =>
                                  setFilters({ status: status.value })
                                }
                                label={status.label}
                              />
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

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
                                    Category
                                  </span>
                                  <span
                                    className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                      open && "rotate-180 transform "
                                    }`}
                                  >
                                    <ChevronDownIcon iconSize={20} />
                                  </span>
                                </>
                              }
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                            <select
                              className="border rounded border-neutral-300 py-1.5 px-3 w-full md:w-40 pr-6"
                              value={filters.catgeoryId}
                              onChange={(e) =>
                                setFilters({ categoryId: e.target.value })
                              }
                            >
                              <option
                                className="text-sm font-medium font-Montserrat text-neutral-800"
                                value=""
                              >
                                All
                              </option>
                              {categories.map(({ id: value, name: label }) => (
                                <option
                                  className="text-sm font-medium font-Montserrat text-neutral-800"
                                  value={value}
                                  key={value}
                                >
                                  {label}
                                </option>
                              ))}
                            </select>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>

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
                                    Checkout Type
                                  </span>
                                  <span
                                    className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                      open && "rotate-180 transform "
                                    }`}
                                  >
                                    <ChevronDownIcon iconSize={20} />
                                  </span>
                                </>
                              }
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                            {[
                              { value: "", label: "All" },
                              ...CheckoutTypes,
                            ].map((type) => (
                              <Button
                                className={
                                  "w-full flex text-sm grow-1 " +
                                  (type.value === filters.checkoutType
                                    ? "font-bold text-neutral-700"
                                    : "font-medium text-neutral-900")
                                }
                                variant="none"
                                value={type.value}
                                name={"projectStatus"}
                                onClick={() =>
                                  setFilters({ checkoutType: type.value })
                                }
                                label={type.label}
                              />
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mt-2 cursor-pointer"
                  onClick={() => setFilters()}
                >
                  <h3 className="text-button-lg text-neutral-800">Clear</h3>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
