import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../../components/Pagination";
import { ChevronsUpIcon, PlusIcon } from "../../../theme/svg-icons";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import { useNavigate } from "react-router-dom";

import {
  deleteOurWork,
  getOurWorks,
} from "../../../features/adminOurWorks/adminOurWorksSlice";
import { Button } from "../../../components";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { adminItemPerPage } from "../../../utils/constants";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  limit: adminItemPerPage,
  search: "",
  tags: [],
  order: "desc",
};

export const OurWorks = () => {
  const { ourWorks, isLoading } = useSelector((state) => state.adminOurWorks);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [deleteId, setDeleteId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const confirmDelete = async () => {
    const response = await dispatch(deleteOurWork(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setDeleteId("");
    setIsOpen(false);
  };
  const handleDelete = (id) => {
    setIsOpen(true);
    setDeleteId(id);
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  const handleFilterClick = (text) => {
    setFilters({ ...filters, search: "", order: "" });
  };

  useEffect(() => {
    dispatch(getOurWorks(filters));
  }, [filters, deleteId, isUpdate]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">
            Our work, Their Voice
          </h5>
          {isOpen && (
            <DeleteConfirmation
              onClose={() => setIsOpen(false)}
              confirmDelete={confirmDelete}
              title={"Our Work"}
            />
          )}
          <Button
            className=" btn btn-primary text-button-md md:text-button-lg"
            variant="none"
            type="submit"
            onClick={() => navigate("/admin/our-work")}
            leftIcon={
              <span className="sm:hidden">
                <PlusIcon />
              </span>
            }
            label={<span className="hidden sm:flex">Add New</span>}
          />
        </div>
        <Filter
          handleFilterChange={handleFilterChange}
          handleFilterReset={handleFilterClick}
          filters={[]}
          filtersList={[]}
          sortList={[]}
          isSearch
        />{" "}
        <div className="">
          {/* <div className="my-5 md:my-7.5 flex justify-end">
            <div className="w-full form-group">
              <label className="relative block">
                <span className="sr-only">Search</span>
              </label>
            </div>
          </div> */}
          <div className="grid">
            <div className="relative overflow-x-auto">
              <table className="w-full table-auto text-start">
                <thead className="rounded bg-neutral-200">
                  <tr className="">
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
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
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      <div className="flex gap-1.5 items-center">
                        Title
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "title",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      <div className="flex gap-1.5 items-center">
                        Name
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "name",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>

                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ourWorks?.rows?.length > 0 &&
                    ourWorks?.rows?.map((newsItem) => (
                      <tr
                        key={newsItem?.id}
                        className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                      >
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.id}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.title}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.name}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          <div className="flex gap-2 sm:gap-4">
                            <ActionButtonBgWithIcon
                              handleEdit={() =>
                                navigate("/admin/our-work/" + newsItem?.id)
                              }
                              handleRemove={() => handleDelete(newsItem?.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="mt-5">
                {isLoading ? (
                  <Loader />
                ) : ourWorks?.rows?.length === 0 ? (
                  <div className="">No Data Found.</div>
                ) : (
                  <Pagination
                    totalPages={Math.ceil(ourWorks?.count / adminItemPerPage)}
                    currentPage={filters.page}
                    onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
