import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Pagination } from "../../../components/Pagination";
import { ChevronsUpIcon, PlusIcon } from "../../../theme/svg-icons";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import {
  deleteBlog,
  getBlogs,
} from "../../../features/adminBlog/adminBlogSlice";
import { SnackMessages } from "../../../components/Toast";
import Filter from "../../../components/Filter";
import { adminItemPerPage } from "../../../utils/constants";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  limit: adminItemPerPage,
  search: "",
  tags: [],
  order: "desc",
};
const Blogs = () => {
  const { blogs, isLoading } = useSelector((state) => state.adminBlog);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [deleteId, setDeleteId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDelete = async () => {
    const response = await dispatch(deleteBlog(deleteId));
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
    setFilters(initialState);
  };

  useEffect(() => {
    dispatch(getBlogs(filters));
  }, [filters, deleteId]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Blogs</h5>
          <button
            className=" btn btn-primary text-button-md md:text-button-lg"
            variant="primaryFull"
            type="submit"
            onClick={() => navigate("/admin/add-blog")}
          >
            {" "}
            <span className="sm:hidden">
              <PlusIcon />
            </span>{" "}
            <span className="hidden sm:flex">Add New</span>{" "}
          </button>
          {isOpen && (
            <DeleteConfirmation
              onClose={() => setIsOpen(false)}
              confirmDelete={confirmDelete}
              title={"Blog"}
            />
          )}
        </div>

        <div className="">
          <Filter
            handleFilterChange={handleFilterChange}
            handleFilterReset={handleFilterClick}
            filters={filters}
            filtersList={[
              {
                label: "Filter By",
                name: "status",
                value: "status",
                options: [
                  { label: "PUBLISHED", value: "PUBLISHED" },
                  { label: "DRAFT", value: "DRAFT" },
                ],
              },
            ]}
            sortList={[]}
            isSearch
          />{" "}
          <div className="grid">
            <div className="relative overflow-x-auto">
              <table class="table-auto w-full text-start">
                <thead className="rounded bg-neutral-200">
                  <tr className="">
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
                        Status
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "status",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      <div className="flex gap-1.5 items-center">
                        Created Date
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "createdAt",
                              order: filters.order === "asc" ? "desc" : "asc",
                            });
                          }}
                        />
                      </div>
                    </th>
                    <th className="p-4 min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                      <div className="flex gap-1.5 items-center">
                        Published
                        <ChevronsUpIcon
                          iconSize={14}
                          onClick={() => {
                            setFilters({
                              ...filters,
                              sort: "publishedAt",
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
                  {blogs?.rows?.length > 0 &&
                    blogs?.rows?.map((newsItem) => (
                      <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.title}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.status ? (
                            <div
                              className={`${
                                newsItem?.status === "DRAFT"
                                  ? "bg-black text-white"
                                  : "bg-green-300"
                              } leading-4 w-full text-xs md:md:w-24 line-clamp-1 text-center rounded py-1.5 px-3 text-primary-300 font-semibold font-Montserrat`}
                            >
                              {newsItem?.status}
                            </div>
                          ) : (
                            <div className="bg-black text-white leading-4 text-xs w-full md:md:w-24 line-clamp-1 text-center rounded py-1.5 px-3 font-semibold font-Montserrat">
                              DRAFT
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.createdDateAdmin}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          {newsItem?.publishedAtAdmin}
                        </td>
                        <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                          <div className="flex gap-2 sm:gap-4">
                            <ActionButtonBgWithIcon
                              handleEdit={() =>
                                navigate("/admin/edit-blog/" + newsItem?.id)
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
                ) : blogs?.rows?.length === 0 ? (
                  <div className="">No Data Found.</div>
                ) : (
                  <Pagination
                    totalPages={Math.ceil(blogs?.count / adminItemPerPage)}
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

export default Blogs;
