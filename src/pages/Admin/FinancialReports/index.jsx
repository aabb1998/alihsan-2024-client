import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../../components/Pagination";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ChevronsUpIcon, PlusIcon } from "../../../theme/svg-icons";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import {
  deleteConstitution,
  deleteFinantialReport,
  getConstitution,
  getFinancialReports,
} from "../../../features/adminFinacialReport/adminFinacialReportSlice";
import UpdateModal from "./UpdateModal";
import { Button } from "../../../components";
import { adminItemPerPage, financialYearList } from "../../../utils/constants";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { handleDownload } from "../../../utils/helper";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  limit: adminItemPerPage,
  search: "",
  tags: [],
  order: "desc",
};
const pathDispatchMap = {
  "/admin/constitution": getConstitution,
  "/admin/financial-reports": getFinancialReports,
};
const pathDeleteDispatchMap = {
  "/admin/constitution": deleteConstitution,
  "/admin/financial-reports": deleteFinantialReport,
};

export const FinancialReports = () => {
  const { reports, isLoading } = useSelector(
    (state) => state.adminFinancialReport
  );
  const { pathname } = useLocation();

  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [deleteId, setDeleteId] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const count = reports?.count;
  const dispatch = useDispatch();
  const title =
    pathname === "/admin/constitution" ? "Constitution" : "Financial Report";

  const handleUpdate = (item) => {
    setIsUpdate(true);
    setUpdateData(item);
  };

  const confirmDelete = async () => {
    const response = await dispatch(pathDeleteDispatchMap[pathname](deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage("Something went wrong");
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
  const handleFilterClick = () => {
    setFilters(initialState);
  };

  useEffect(() => {
    dispatch(pathDispatchMap[pathname](filters));
  }, [filters, deleteId, isUpdate, pathname]);
  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        {isOpen && (
          <DeleteConfirmation
            onClose={() => setIsOpen(false)}
            confirmDelete={confirmDelete}
            title={title}
          />
        )}
        {isUpdate && (
          <UpdateModal
            onClose={() => setIsUpdate(null)}
            confirmDelete={confirmDelete}
            item={updateData}
          />
        )}
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">{title}</h5>
          <Button
            className=" btn btn-primary text-button-md md:text-button-lg"
            type="submit"
            onClick={() => {
              setUpdateData(null);
              setIsUpdate(true);
            }}
            label={<span className="hidden sm:flex">Add New</span>}
            leftIcon={
              <span className="sm:hidden">
                <PlusIcon />
              </span>
            }
          />
        </div>

        <div className="mt-5 md:mt-7.5">
          <Filter
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterClick}
            filters={filters}
            filtersList={[
              {
                label: "Filter By",
                name: "year",
                value: "year",
                options: financialYearList,
              },
            ]}
            sortList={[]}
          />{" "}
          <div className="grid">
            <div className="relative overflow-x-auto">
              <table className="w-full table-auto text-start">
                <thead className="rounded bg-neutral-200">
                  <tr className="">
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      <div className="flex gap-1.5 items-center">
                        ID
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
                        Year
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "year",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      URL
                    </th>

                    <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {reports?.rows?.length > 0 &&
                    reports?.rows?.map((newsItem) => (
                      <tr
                        key={newsItem?.id}
                        className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                      >
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.id}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.year}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          <Link target="_blank" to={newsItem?.document}>
                            {newsItem?.document}
                          </Link>
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          <div className="flex gap-2 sm:gap-4">
                            <ActionButtonBgWithIcon
                              handleEdit={() => handleUpdate(newsItem)}
                              handleRemove={() => handleDelete(newsItem?.id)}
                              handleDownload={() =>
                                handleDownload(newsItem?.document)
                              }
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
                ) : reports?.rows?.length === 0 ? (
                  <div className="">No Data Found.</div>
                ) : (
                  <Pagination
                    totalPages={Math.ceil(count / adminItemPerPage)}
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
