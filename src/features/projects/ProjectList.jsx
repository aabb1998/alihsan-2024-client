import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Pagination } from "./Pagination";
import { ProjectListItem } from "./ProjectListItem";
import { getProjects, getCategories } from "./projectSlice";
import { useSelector, useDispatch } from "react-redux";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";
import { projectsSortList } from "../../utils/donationConstants";
import { FilterValues } from "./FilterValues";
import { FilterSection } from "./FilterSection";
import PageHead from "../../components/PageHead";
const initialState = {
  category: "",
  country: "",
  page: "1",
  search: "",
  sort: "createdAt",
  order: "desc",
};

const ProjectList = () => {
  const searchTimer = useRef(null);
  const { state: navState } = useLocation();
  const { projects, count, loading, categories, countries } = useSelector(
    (state) => state.projects
  );
  const filtersList = [
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
  ];
  const sortLists = [
    {
      label: "Sort By",
      name: "order",
      value: "order",
      options: projectsSortList,
    },
  ];
  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilter, setIsFilter] = useState(false);
  const totalPages = Math.ceil(count / itemsPerPage);
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState(initialState);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

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
      <PageHead title={"All Projects"} />

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
      <div className="py-7.5 md:py-15 standard-details-page">
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
                filtersList={filtersList}
                sortList={sortLists}
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
