import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChevronsUpIcon, PlusIcon } from "../../../theme/svg-icons";
import { Pagination } from "../../../components/Pagination";
import Filter from "../../../components/Filter";
import { Button } from "../../../components";
import { itemPerPage } from "../../../utils/constants";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import { getTags, removeTag } from "../../../features/adminTag/adminTagSlice";
import AddTags from "./AddTags";
import Loader from "../../../components/Loader";

const initialState = {
  page: "1",
  search: "",
  sort: "createdAt",
  order: "",
};
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const Tags = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  const { tags, loading, isLoading } = useSelector((state) => state.adminTags);
  const { rows, count } = tags;
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= count) {
      setCurrentPage(newPage);
      dispatch(getTags({ ...filters, page: newPage }));
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
    const response = await dispatch(removeTag(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setIsDelete(false);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getTags(filters));
  }, [filters, isDelete, isOpen]);

  return (
    <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {isOpen && (
        <AddTags
          onClose={() => setIsOpen(false)}
          title={"Blog"}
          data={currentItem}
        />
      )}
      {isDelete && (
        <DeleteConfirmation
          onClose={() => setIsDelete(false)}
          confirmDelete={confirmDelete}
          isLoading={loading}
          title={"Tag"}
        />
      )}

      <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <h5 className="text-heading-7 md:text-heading-5">Tags</h5>
        <Button
          className=" btn btn-primary text-button-md md:text-button-lg w-fit"
          variant="primary"
          type="submit"
          onClick={() => {
            setIsOpen(true);
            setCurrentItem(null);
          }}
          leftIcon={
            <span className="sm:hidden">
              <PlusIcon />
            </span>
          }
          label={<span className="hidden sm:flex">Add New</span>}
        />{" "}
      </div>
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
                    <span className="cursor-pointer">
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
                    </span>
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  <div className="flex gap-1.5 items-center">
                    Name
                    <span className="cursor-pointer">
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilters({
                            ...filters,
                            sort: "text",
                            order: filters.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </span>
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  <div className="flex gap-1.5 items-center">
                    Color
                    <span className="cursor-pointer">
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilters({
                            ...filters,
                            sort: "color",
                            order: filters.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </span>
                  </div>{" "}
                </th>

                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rows?.length > 0 &&
                rows?.map((tag, i) => (
                  <tr
                    key={i}
                    className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                  >
                    <td className="p-4 min-w-[10rem] text-sm font-bold font-Montserrat text-neutral-800">
                      {tag?.id}
                    </td>
                    <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                      {tag?.text}{" "}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 ">
                      <div className="break-words line-clamp-2">
                        {tag.color}
                      </div>
                    </td>

                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      <div className="flex gap-2 sm:gap-4">
                        <ActionButtonBgWithIcon
                          handleEdit={() => handleEdit(tag)}
                          handleRemove={() => handleRemove(tag?.id)}
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
                totalPages={Math.ceil(count / itemPerPage)}
                onPageChange={handlePageChange}
              />
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tags;
