import { useState } from "react";
import { ChevronDownIcon, CloseIcon, SearchIcon } from "../../theme/svg-icons";
import { Button } from "../../components";
import { Disclosure } from "@headlessui/react";


export const FilterSection = ({
    setIsFilter,
    handleFilterChange,
    projects,
    handleResponsiveFilter,
    categories,
    countries,
  }) => {
    const [search, setSearch] = useState("");
    return (
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
            <aside
              id="default-sidebar"
              className={`fixed top-0 left-0 z-40 min-w-[16.875rem] h-screen transition-transform md:-translate-x-full sm:hidden`}
              aria-label="Sidebar"
            >
              <div className="h-full flex flex-col gap-4 px-5 py-7.5 overflow-y-auto bg-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-button-lg text-neutral-800">Filter</h3>
                  <div className="cursor-pointer text-neutral-500">
                    <CloseIcon iconSize={24} onClick={setIsFilter} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="relative block !mb-0">
                    <span className="sr-only">Search</span>
                    <Button
                      name="search"
                      value={search}
                      className="absolute inset-y-0 right-0 flex items-center !p-2 !rounded-lg !rounded-tl-none !rounded-bl-none text-primary-300 bg-accent-300"
                      onClick={() => handleResponsiveFilter(search)}
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
                            {categories?.map((category) => (
                              <Button
                                className={
                                  "w-full flex text-sm font-medium grow-1 text-neutral-800"
                                }
                                variant={"none"}
                                value={category?.id}
                                name={"category"}
                                onClick={handleFilterChange}
                                label={category?.name}
                              />
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                  <div>
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className={"w-full"}>
                            <Button
                              variant={"none"}
                              className="flex items-center justify-between w-full"
                              label={
                                <>
                                  <span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">
                                    Location
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
                          <Disclosure.Panel className="flex flex-col gap-3 mt-4">
                            {countries?.map((country) => (
                              <Button
                                variant={"none"}
                                value={country?.code}
                                name={"country"}
                                onClick={handleFilterChange}
                                className="flex w-full text-sm font-medium grow-1 text-neutral-800"
                                label={country?.name}
                              />
                            ))}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    );
  };