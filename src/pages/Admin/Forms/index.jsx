import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { Pagination } from "../../../components/Pagination";
import {
  adminFormLists,
  adminFormsDispatch,
  adminFormsTitle,
  adminItemPerPage,
} from "../../../utils/constants";
import { useLocation } from "react-router-dom";
import { Button } from "../../../components";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import Loader from "../../../components/Loader";
import UpdateForm from "./UpdateForm";
import {
  deleteForm,
  exportForm,
} from "../../../features/adminForms/adminFormSlice";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import PageHead from "../../../components/PageHead";
import { ChevronsUpIcon } from "../../../theme/svg-icons";
import { exportData } from "../../../utils/helper";

const initialState = {
  page: "1",
  search: "",
  sort: "",
  order: "",
};
const pathDispatchMap = {
  "/admin/contacts": "form/contact-us/",
  "/admin/technical-support": "form/technical-support/",
  "/admin/fundraisers": "form/fund-raiser/",
  "/admin/sponsors": "form/sponsor/",
  "/admin/volunteers": "form/volunteer/",
  "/admin/complaints": "complaints/",
};
const exportUrl = {
  "/admin/contacts": "/form/contact-us-export",
  "/admin/technical-support": "/form/technical-support-export",
  "/admin/fundraisers": "/form/fund-raiser-export",
  "/admin/sponsors": "/form/sponsor-export",
  "/admin/volunteers": "/form/volunteer-export",
  "/admin/complaints": "/complaints/export",
};

const Forms = () => {
  const { pathname } = useLocation();
  const [updateId, setUpdateId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState(1);
  const [filters, setFilters] = useState(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [title, setTitle] = useState("");
  const hasFilter = ["/admin/technical-support", "/admin/complaints"].includes(
    pathname
  );
  const filtersList = hasFilter
    ? [
        {
          label: "Filter By",
          name: "status",
          value: "status",
          defaultSelect: "All",
          options: [
            { label: "Active", value: "ACTIVE" },
            { label: "Solved", value: "SOLVED" },
          ],
        },
      ]
    : [];

  const dispatch = useDispatch();
  const { formDatas, isLoading } = useSelector((state) => state.adminForm);
  const navigate = useNavigate();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= formDatas?.count) {
      setCurrentPage(newPage);
      const dispatchAction = adminFormsDispatch[pathname];
      if (dispatchAction) {
        dispatch(dispatchAction({ ...filters, page: newPage }));
      }
    }
  };

  const handleStatus = (id) => {
    setUpdateId(id);
    setIsUpdate(true);
  };

  const handleRemove = (id) => {
    setDeleteId(id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    const response = await dispatch(
      deleteForm(pathDispatchMap[pathname] + deleteId)
    );
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setDeleteId("");
    setIsOpen(false);
  };

  const handleView = (id) => {
    navigate(`${pathname}/${id}`);
  };
  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };
  const handleFilterClick = (text) => {
    setFilters(initialState);
  };

  const handleExport = async () => {
    const payload = {
      url: exportUrl[pathname],
      filter: "",
    };
    const response = await dispatch(exportForm(payload));
    exportData(response?.payload, title);
  };

  useEffect(() => {
    const dispatchAction = adminFormsDispatch[pathname];
    if (dispatchAction) {
      dispatch(dispatchAction(filters));
    }
  }, [filters, isUpdate, deleteId]);

  useEffect(() => {
    setTitle(adminFormsTitle[pathname]);
    setCurrentPage(1);
    const dispatchAction = adminFormsDispatch[pathname];
    if (dispatchAction) {
      dispatch(dispatchAction(initialState));
    }
    setFilters(initialState)
  }, [pathname]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <PageHead title={title} />
        <div className="">
          <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
            <Button
              className="text-heading-7 md:text-heading-5"
              variant={"none"}
              label={`${title}`}
            />
            <Button label={`Export`} onClick={handleExport} />
          </div>
          <Filter
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterClick}
            filters={filters}
            filtersList={filtersList}
            sortList={[]}
            isSearch
          />{" "}
          {isOpen && (
            <DeleteConfirmation
              onClose={() => setIsOpen(false)}
              confirmDelete={confirmDelete}
              title={title}
            />
          )}
          {isUpdate && (
            <UpdateForm
              onClose={() => setIsUpdate(false)}
              confirmDelete={confirmDelete}
              id={updateId}
            />
          )}
          <div className="grid">
            {isLoading ? (
              <Loader />
            ) : (
              <div className="relative overflow-x-auto">
                <table className="w-full table-auto text-start">
                  <thead className="rounded bg-neutral-200">
                    <tr className="">
                      {adminFormLists[pathname]?.map((e, i) => (
                        <th
                          key={i}
                          className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600"
                        >
                          <div className="flex gap-1.5 items-center">
                            {e.label}
                            <span className="cursor-pointer">
                              {e?.isSortable && (
                                <ChevronsUpIcon
                                  iconSize={14}
                                  onClick={() => {
                                    setFilters({
                                      ...filters,
                                      sort: e.key,
                                      order:
                                        filters.order === "asc" ? "desc" : "asc",
                                    });
                                  }}
                                />
                              )}
                            </span>
                          </div>


                        </th>
                      ))}
                      <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {formDatas?.rows?.length > 0 ? (
                      formDatas?.rows?.map((e, i) => (
                        <tr
                          key={i}
                          className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                        >
                          {adminFormLists[pathname]?.map((formItem, index) => (
                            <td
                              key={index}
                              className="p-4 text-sm font-medium max-w-[10rem] break-words font-Montserrat text-neutral-700"
                            >
                              {e[adminFormLists[pathname][index]?.key]}
                            </td>
                          ))}
                          <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                            {(pathname === "/admin/technical-support" ||
                              pathname === "/admin/complaints") &&
                              e?.status !== "Solved" ? (
                              <ActionButtonBgWithIcon
                                handleRemove={() => handleRemove(e.id)}
                                handleView={() => handleView(e.id)}
                                handleStatus={() => handleStatus(e.id)}
                              />
                            ) : (
                              <ActionButtonBgWithIcon
                                handleRemove={() => handleRemove(e.id)}
                                handleView={() => handleView(e.id)}
                              />
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                        <td
                          className="p-4 text-sm font-medium font-Montserrat text-neutral-700"
                          colSpan={"6"}
                        >
                          No Data Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="mt-5">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(formDatas?.count / adminItemPerPage)}
                    onPageChange={handlePageChange}
                  />{" "}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Forms;
