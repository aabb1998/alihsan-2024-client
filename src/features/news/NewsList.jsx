import React, { useEffect, useState } from "react";
import { NewsListItem } from "./NewsListItem";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { getNewsList } from "./news";
import { Filter } from "./Filter";
import Loader from "../../components/Loader";

const initialState = {
  page: "1",
  limit: process.env.REACT_APP_PAGINATION_PER_PAGE,
  search: "",
  tags: [],
  order: "desc",
};
const tagsList = [
  { value: "", label: "Add Tag", color: "red" },
  { value: 1, label: "Emergency", color: "red" },
  { value: 2, label: "Urgent", color: "orange" },
  { value: 3, label: "New", color: "yellow" },
];

export const NewsList = () => {
  const { newsList, count, loading } = useSelector((state) => state.news);
  const [filters, setFilters] = useState(initialState);
  const [filtersList, setFiltersList] = useState(tagsList);
  const [selectedTag, setSelectedTag] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();

  const handleFilterChange = (name, value) => {
    if (name === "tags") {
      if (value) {
        setSelectedTag(value);
        if (filters.tags.find((i) => i === value)) {
          setFilters({
            ...filters,
            tags: filters.tags.filter((i) => i !== value),
          });
        } else {
          setFilters({ ...filters, tags: [...filters.tags, value] });
        }
      }
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const handleFilterReset = () => {
    setFilters({ ...filters, search: "", tags: [], page: "1" });
    setFiltersList(tagsList);
  };

  useEffect(() => {
    dispatch(getNewsList(filters));
  }, [filters]);
  return (
    <section aria-label="News List">
      <div className="container">
        <h1 className="text-center text-heading-5 md:text-heading-3">News</h1>
        <Filter
          handleFilterChange={handleFilterChange}
          handleFilterReset={handleFilterReset}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          filters={filters}
          filtersList={filtersList}
          selectedTag={selectedTag}
          isSearch
        />

        {loading ? (
          <Loader />
        ) : newsList.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mb-5 sm:grid-cols-2 md:grid-cols-4">
            {newsList.map((item) => (
              <NewsListItem key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
            Try checking for spelling errors or try another search term.
          </div>
        )}
        <div className="mt-7.5">
          <Pagination
            totalPages={Math.ceil(count / 12)}
            currentPage={filters.page}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </div>
      </div>
    </section>
  );
};
