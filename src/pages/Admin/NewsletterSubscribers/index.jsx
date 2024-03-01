import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronsUpIcon, PlusIcon, TrashIcon } from "../../../theme/svg-icons";
import { Pagination } from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import { Button } from "../../../components";
import { itemPerPage } from "../../../utils/constants";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import {
  deleteNewsletterSubscriber,
  getNewsletterSubscribers,
} from "../../../features/adminNewsletterSubscribers/adminNewsletterSubscribersSlice";
import AddSubscriber from "./AddSubscriber";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  search: "",
  sort: "createdAt",
  order: "",
};
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const NewsletterSubscribers = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);

  const { newsletterSubscribers, loading, isLoading } = useSelector(
    (state) => state.adminNewsletterSubscribers
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= newsletterSubscribers?.count) {
      setCurrentPage(newPage);
      dispatch(getNewsletterSubscribers({ ...filters, page: newPage }));
    }
  };

  const handleFilterClick = (text) => {
    setFilters({ ...filters, search: "", order: "" });
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleRemove = (id) => {
    setIsDelete(true);
    setDeleteId(id);
  };
  const confirmDelete = async () => {
    const response = await dispatch(deleteNewsletterSubscriber(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setIsDelete(false);
  };

  useEffect(() => {
    dispatch(getNewsletterSubscribers(filters));
  }, [filters, isDelete, isOpen]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">
            Newsletter Subscribers
          </h5>
          <Button
            className=" btn btn-primary text-button-md md:text-button-lg w-fit"
            variant="primary"
            type="submit"
            onClick={() => setIsOpen(true)}
            leftIcon={
              <span className="sm:hidden">
                <PlusIcon />
              </span>
            }
            label={<span className="hidden sm:flex">Add New</span>}
          />{" "}
          {isOpen && <AddSubscriber onClose={() => setIsOpen(false)} />}
        </div>
        {isDelete && (
          <DeleteConfirmation
            onClose={() => setIsDelete(false)}
            confirmDelete={confirmDelete}
            isLoading={loading}
            title={"Newsletter Subscriber"}
          />
        )}

        <div className="grid">
          <Filter
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterClick}
            filters={[]}
            filtersList={[]}
            sortList={[]}
            isSearch
          />{" "}
          <div className="relative overflow-x-auto">
            <table class="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <div className="flex gap-1.5 items-center">
                      Id
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilters({
                            ...filters,
                            sort: "id",
                            order: filters.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <div className="flex gap-1.5 items-center">
                      Email
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilters({
                            ...filters,
                            sort: "email",
                            order: filters.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Created At
                  </th>

                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {newsletterSubscribers?.rows?.length > 0 &&
                  newsletterSubscribers?.rows?.map((impactStory, i) => (
                    <tr
                      key={i}
                      className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                    >
                      <td className="p-4 min-w-[10rem] text-sm font-bold font-Montserrat text-neutral-800">
                        {impactStory?.id}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {impactStory?.email}{" "}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {impactStory?.created_at}{" "}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        <div className="flex gap-2 sm:gap-4">
                          <div className="p-2 text-red-300 bg-red-100 rounded cursor-pointer">
                            <TrashIcon
                              onClick={() => handleRemove(impactStory?.id)}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="mt-5">
              {isLoading ? (
                <Loader />
              ) : newsletterSubscribers?.rows?.length === 0 ? (
                <div className="">No Data Found.</div>
              ) : (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(
                    newsletterSubscribers?.count / itemPerPage
                  )}
                  onPageChange={handlePageChange}
                />
              )}{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsletterSubscribers;
