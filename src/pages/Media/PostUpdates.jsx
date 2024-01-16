import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "../../theme/svg-icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../components/Pagination";
import { getMediaPostUpdates } from "../../features/media/mediaSlice";
import { Disclosure, Transition } from "@headlessui/react";
import { itemPerPage } from "../../utils/constants";
import Filter from "../../components/Filter";

const initialState = {
  page: "1",
  limit: itemPerPage,
  search: "",
  status: "ACTIVE",
  order: "Newest",
};

export const PostUpdates = ({ isOpen }) => {
  const { rows, count, loading, error } = useSelector(
    (state) => state.medias.postUpdates
  );
  const [filters, setFilters] = useState(initialState);
  const dispatch = useDispatch();

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterReset = () => {
    setFilters({ ...filters, search: "", status: "", order: "Newest" });
  };

  useEffect(() => {
    dispatch(getMediaPostUpdates(filters));
  }, [filters]);
  return (
    <>
      <Filter
        handleFilterChange={handleFilterChange}
        handleFilterReset={handleFilterReset}
        filters={filters}
        filtersList={[]}
        sortList={[
          {
            label: "Sort By",
            name: "order",
            value: "order",
            defaultSelect: "Newest",
            options: [
              { label: "Newest", value: "desc" },
              { label: "Oldest", value: "asc" },
            ],
          },
        ]}
        isSearch
      />
      <Transition
        appear={true}
        show={isOpen}
        enter="transition ease-in-out delay-75 duration-300 transform"
        enterFrom="opacity-0 translate-y-full"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-300 transform delay-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-full"
      >
        {rows.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 mb-5 sm:grid-cols-2 md:grid-cols-4">
            {rows.map((item) => (
              <MediaPostUpdate key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
            Try checking for spelling errors or try another search term.
          </div>
        )}
        <div className="mt-7.5">
          <Pagination
            totalPages={Math.ceil(count / itemPerPage)}
            currentPage={filters.page}
            onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
          />
        </div>
      </Transition>
    </>
  );
};

export const MediaPostUpdate = ({ item }) => {
  return (
    <div className="col-span-1 p-3 border border-neutral-300 rounded-2xl">
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg sm:h-45">
        <img
          src={
            item.url?.includes("localhost")
              ? "../images/banner/placeholder.jpg"
              : item.url
          }
          alt={item.title}
          className="object-cover w-full h-full"
        />
      </div>
      <p className="mb-2 text-heading-7 text-neutral-800 line-clamp-1 text-start">
        {item.title}
      </p>
      <p className="mb-4 text-sm text-neutral-600">{Date}</p>
      <Link
        to={`/media/details/${item?.id}`}
        className="!px-5 !py-2 !text-button-lg btn btn-secondary w-fit"
      >
        Read More <ArrowRightIcon />{" "}
      </Link>
    </div>
  );
};
