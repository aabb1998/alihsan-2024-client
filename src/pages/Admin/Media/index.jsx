import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "../../../components/Pagination";
import { Button } from "../../../components";
import { PlusIcon } from "../../../theme/svg-icons";
import { itemPerPage } from "../../../utils/constants";
import Filter from "../../../components/Filter";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import StoriesModal from "../Common/StoriesModal";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { SnackMessages } from "../../../components/Toast";
import { getImpactStories } from "../../../features/impactStories/impactStories";
import {
  deleteMedia,
  getMedias,
} from "../../../features/adminMedia/adminMediaSlice";

const initialState = {
  page: "1",
  search: "",
  sort: "createdAt",
  order: "",
};
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const pathDispatchMap = {
  "/admin/videos": "media/videos/",
  "/admin/posts": "media/post-updates/",
};
const mediaTitle = {
  "/admin/videos": "On Ground Videos",
  "/admin/posts": "Post Campaign Updates",
};
const mediaDeleteUrl = {
  "/admin/videos": "/media/delete-video/",
  "/admin/posts": "/media/delete-post/",
};
const mediaViewUrl = {
  "/admin/videos": "/admin/video/",
  "/admin/posts": "/admin/post/",
};
const Media = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [filters, setFilters] = useState(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItem, setCurrentItem] = useState(null);

  const { medias, loading } = useSelector((state) => state.adminMedia);
  const count = medias?.count;
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= count) {
      const dispatchAction = pathDispatchMap[pathname];
      dispatch(getMedias({ url: dispatchAction, filter: { ...filters, page: newPage } }));
      setCurrentPage(newPage);
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
    const response = await dispatch(
      deleteMedia(mediaDeleteUrl[pathname] + deleteId)
    );
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.payload?.message);
    }
    setIsDelete(false);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    navigate(pathname + "-details/" + item?.id);
    setIsOpen(true);
  };

  useEffect(() => {
    const dispatchAction = pathDispatchMap[pathname];
    dispatch(getMedias({ url: dispatchAction, filter: filters }));
  }, [filters, isDelete, pathname]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">
            {mediaTitle[pathname]}
          </h5>
          <Button
            className=" btn btn-primary text-button-md md:text-button-lg w-fit"
            variant="primary"
            type="submit"
            onClick={() => navigate(pathname + "-details")}
            leftIcon={
              <span className="sm:hidden">
                <PlusIcon />
              </span>
            }
            label={<span className="hidden sm:flex">Add New</span>}
          />{" "}
          {isOpen && (
            <StoriesModal item={currentItem} onClose={() => setIsOpen(false)} />
          )}
        </div>
        {isDelete && (
          <DeleteConfirmation
            onClose={() => setIsDelete(false)}
            confirmDelete={confirmDelete}
            isLoading={loading}
            title={mediaTitle[pathname]}
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
            <table className="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Id
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Title
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Description
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {medias?.rows?.length ? (
                  medias?.rows?.map((impactStory, i) => (
                    <tr
                      key={i}
                      className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                    >
                      <td className="p-4 min-w-[10rem] text-sm font-bold font-Montserrat text-neutral-800">
                        {impactStory?.id}
                      </td>
                      <td className="p-4 min-w-[10rem] text-sm font-medium font-Montserrat text-neutral-700">
                        {impactStory?.title}{" "}
                      </td>
                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 ">
                        <div className="break-all line-clamp-2">
                          {impactStory.description}
                        </div>
                      </td>

                      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                        <div className="flex gap-2 sm:gap-4">
                          <ActionButtonBgWithIcon
                            handleEdit={() => handleEdit(impactStory)}
                            handleRemove={() => handleRemove(impactStory?.id)}
                            handleView={() =>
                              navigate(
                                `${mediaViewUrl[pathname] + impactStory?.id}`
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-5">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(count / 20)}
                onPageChange={handlePageChange}
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Media;
