import React, { useEffect, useState } from "react";
import { ImpactStoryListItem } from "./ImpactStoryListItem";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { getImpactStories } from "../../features/impactStories/impactStories";
import { itemPerPage } from "../../utils/constants";
import Filter from "../../components/Filter";
import Loader from "../../components/Loader";

const initialState = {
  page: "1",
  search: "",
  sort: "createdAt",
  order: "",
};

export const ImpactStoryList = () => {
  const { impactStories, count, loading } = useSelector(
    (state) => state.impactStories
  );
  const [filters, setFilters] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= count) {
      setCurrentPage(newPage);
      dispatch(getImpactStories({ ...filters, page: newPage }));
    }
  };
  const handleFilterClick = (text) => {
    setFilters({ ...filters, search: "", order: "" });
  };

  useEffect(() => {
    dispatch(getImpactStories(filters));
  }, [filters]);

  return (
    <section aria-label="Impact Stories">
      <div className="container">
        <h1 className="text-center text-heading-5 md:text-heading-3">
          Impact Stories
        </h1>
        <Filter
          handleFilterChange={handleFilterChange}
          handleFilterReset={handleFilterClick}
          filters={filters}
          filtersList={[
            {
              label: "Filter By",
              name: "order",
              value: "order",
              options: [
                { label: "All", value: "" },
                { label: "Old - New", value: "asc" },
                { label: "New - Old", value: "desc" },
              ],
            },
          ]}
          isSearch
        />

        {loading ? (
          <Loader />
        ) : impactStories.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mb-5 sm:grid-cols-3">
            {impactStories.map((item) => (
              <ImpactStoryListItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
            Try checking for spelling errors or try another search term.
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages = {Math.ceil(count / itemPerPage)}
        onPageChange={handlePageChange}
      />
    </section>
  );
};
