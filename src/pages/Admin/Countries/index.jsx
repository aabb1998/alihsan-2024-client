import React, { useState, useEffect } from "react";
import { Button } from "../../../components";
import { ChevronsUpIcon, PlusIcon } from "../../../theme/svg-icons";
import { useSelector, useDispatch } from "react-redux";

import Filter from "../../../components/Filter";
import { Pagination } from "../../../components/Pagination";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import {
  deleteCountry,
  getCountries,
} from "../../../features/adminCountry/adminCountrySlice";
import { adminItemPerPage } from "../../../utils/constants";
import AddOrCreateModal from "./AddOrCreateModal";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  search: "",
  sort: "createdAt",
  order: "",
};
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const Countries = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState("");
  const [currentItem, setCurrentItem] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [filters, setFilters] = useState(initialState);
  const { countries, isLoading } = useSelector((state) => state.adminCountries);
  const { count, rows } = countries;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= count) {
      setCurrentPage(newPage);
      dispatch(getCountries({ ...filters, page: newPage }));
    }
  };
  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterClick = (text) => {
    setFilters({ ...filters, search: "", order: "" });
  };
  const confirmDelete = async () => {
    const response = await dispatch(deleteCountry(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setIsDelete(false);
  };

  const handleRemove = (id) => {
    setIsDelete(true);
    setDeleteId(id);
  };

  useEffect(() => {
    if (!isOpen || !isDelete) {
      dispatch(getCountries(filters));
    }
  }, [isOpen, isDelete, filters]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Countries</h5>
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
          {isOpen && (
            <AddOrCreateModal
              item={currentItem}
              onClose={() => {
                setCurrentItem(null);
                setIsOpen(false);
              }}
            />
          )}
        </div>
        {isDelete && (
          <DeleteConfirmation
            onClose={() => setIsDelete(false)}
            confirmDelete={confirmDelete}
            title={"Country"}
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
                  <th className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <div className="flex gap-1.5 items-center">
                      Country Code
                      <span className="cursor-pointer">
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "countryCode",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <div className="flex gap-1.5 items-center">
                      Country Name
                      <span className="cursor-pointer">
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "countryName",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </span>
                    </div>
                  </th>
                  <th className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Description
                  </th>

                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows?.length > 0 &&
                  rows?.map((country, i) => (
                    <tr
                      key={i}
                      className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                    >
                      <td className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-bold font-Montserrat text-neutral-800">
                        {country?.countryCode}
                      </td>
                      <td className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-medium font-Montserrat text-neutral-700">
                        {country?.countryName}{" "}
                      </td>
                      <td className="p-4 min-w-[10rem] max-w-[10rem] break-all text-sm font-medium font-Montserrat text-neutral-700 ">
                        <div className="break-words line-clamp-2">
                          {country?.description}
                        </div>
                      </td>

                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        <div className="flex gap-2 sm:gap-4">
                          <ActionButtonBgWithIcon
                            handleEdit={() => handleEdit(country)}
                            handleRemove={() => handleRemove(country?.id)}
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
              ) : rows?.length === 0 ? (
                <div className="">No Data Found.</div>
              ) : (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(count / adminItemPerPage)}
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

export default Countries;
