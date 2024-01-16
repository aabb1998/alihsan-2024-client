import React, { useEffect, useState, useRef } from "react";
import { ChevronDownIcon, CloseIcon, SearchIcon } from "../../theme/svg-icons";
import { useLocation } from "react-router-dom";
import { Pagination } from "./Pagination";
import { ProjectListItem } from "./ProjectListItem";
import { getProjects, getCategories } from "../projects/projectSlice";
import { useSelector, useDispatch } from "react-redux";
import { Disclosure } from "@headlessui/react";
import { Button } from "../../components";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";
const initialState = {
  category: "",
  country: "",
  page: "1",
  search: "",
  sort: "createdAt",
  order: "desc",
};
const sortList = [
  { label: "Newest", value: "desc" },
  { label: "Oldest", value: "asc" },
  { label: "Popular", value: "asc" },
];

const ProjectList = () => {
  const searchTimer = useRef(null);
  const { state: navState } = useLocation();
  const { projects, count, loading, categories, countries } = useSelector(
    (state) => state.projects
  );
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const totalPages = Math.ceil(count / itemsPerPage);
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(initialState);

  useEffect(() => {
    if (navState && (navState.search || navState.category))
      setSelectedFilters({
        ...initialState,
        search: navState.search,
        category: navState.category,
      });
  }, [navState]);

  const handleFilterChange = (name, value) => {
    setSelectedFilters({
      ...(name ? selectedFilters : { search: value }),
      [name || "search"]: value,
    });
    setIsFilter(!name);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(getProjects({ ...selectedFilters, page: newPage }));
    }
  };

  const resetFilters = (filters) => {
    for (let filter of filters) {
      setSelectedFilters((prev) => ({
        ...prev,
        [filter]: initialState[filter],
      }));
    }
  };

  const handleResponsiveFilter = (e) => {
    setSelectedFilters({
      ...selectedFilters,
      search: e,
    });
    setIsFilter(false);
  };
  const handleFilterClick = () => {
    dispatch(getProjects({ ...selectedFilters, search: "" }));
    setIsFilter(true);
  };
  const handleFilterReset = () => {
    setSelectedFilters({
      ...selectedFilters,
      search: "",
      category: "",
      country: "",
      order: "desc",
      year: "",
    });
  };
  useEffect(() => {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      searchTimer.current = null;
      dispatch(getProjects(selectedFilters));
    }, 600);
  }, [selectedFilters]);

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div>
      {isFilter && (
        <FilterSection
          setIsFilter={() => setIsFilter(false)}
          handleFilterChange={handleFilterChange}
          projects={projects}
          handleResponsiveFilter={handleResponsiveFilter}
          categories={categories}
          countries={countries}
        />
      )}
      <div className="py-7.5 md:py-15">
        <section className="pb-5 md:pb-7.5" aria-label="Updates">
          <div className="container">
            <div className="mb-5 md:mb-17">
              <h1 className="text-center text-heading-5 sm:text-heading-3">
                All Projects
              </h1>
            </div>
            <div className="pb-5 md:pb-7.5">
              {/*  */}
              <Filter
                handleFilterChange={handleFilterChange}
                handleFilterReset={handleFilterReset}
                filters={selectedFilters}
                filtersList={[
                  {
                    label: "Select Category",
                    name: "category",
                    value: "category",
                    defaultSelect: "Category",
                    options:
                      categories?.map((i) => ({
                        value: i.id,
                        label: i.name,
                      })) || [],
                  },
                  {
                    label: "Select Country",
                    name: "country",
                    value: "country",
                    defaultSelect: "Location",
                    options:
                      countries?.map((i) => ({
                        value: i.code,
                        label: i.name,
                      })) || [],
                  },
                ]}
                sortList={[
                  {
                    label: "Sort By",
                    name: "order",
                    value: "order",
                    options: sortList,
                  },
                ]}
                isSearch
              />{" "}
              {/*  */}
              <div className="flex flex-col gap-3 mt-5 md:mt-6 md:gap-4 md:items-center md:flex-row">
                {selectedFilters?.category || selectedFilters?.country ? (
                  <div className="text-button-md md:text-button-lg">
                    Showing all {count} results for
                  </div>
                ) : (
                  ""
                )}
                <FilterValues
                  selectedFilters={selectedFilters}
                  projects={projects}
                  resetFilters={resetFilters}
                  categories={categories}
                  countries={countries}
                />
              </div>
            </div>
            {loading ? (
              <Loader />
            ) : projects?.length ? (
              <div className="grid gap-x-5 gap-5 md:gap-y-7.5 sm:grid-cols-2 md:grid-cols-4">
                {projects?.map((project) => (
                  <ProjectListItem project={project} />
                ))}
              </div>
            ) : selectedFilters?.search?.length ? (
              <div className="text-neutral-600">
                Try checking for spelling errors or try another search term.
              </div>
            ) : (
              ""
            )}
          </div>
        </section>
        <div className="container">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectList;

const FilterSection = ({
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
                {/* <Button
                  name="search"
                  value={search}

                  label="search"
                /> */}
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

const FilterValues = ({
  selectedFilters,
  projects,
  resetFilters,
  categories,
  countries,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4">
      {selectedFilters.category ? (
        <button
          className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap"
          onClick={() => resetFilters(["category"])}
        >
          {
            categories.find((l) => l.id === parseInt(selectedFilters.category))
              ?.name
          }

          <span className="cursor-pointer text-neutral-1100">
            <CloseIcon iconSize={16} />
          </span>
        </button>
      ) : (
        ""
      )}
      {selectedFilters?.country ? (
        <button
          className="flex items-center gap-1 p-2 text-sm rounded-md bg-neutral-200 hover:bg-neutral-300 whitespace-nowrap"
          onClick={() => resetFilters(["country"])}
        >
          {selectedFilters.country &&
            countries.find((l) => l.code == selectedFilters.country)?.name}
          <span className="cursor-pointer text-neutral-1100">
            <CloseIcon iconSize={16} />
          </span>
        </button>
      ) : (
        ""
      )}

      {selectedFilters.category || selectedFilters?.country ? (
        <button
          className="items-center hidden gap-1 p-2 text-sm rounded-md md:flex bg-neutral-200 hover:bg-neutral-300"
          onClick={() => resetFilters(["category", "country"])}
        >
          Clear filter{" "}
          <span className="hidden cursor-pointer text-neutral-1100 md:block">
            <CloseIcon iconSize={16} />
          </span>
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
