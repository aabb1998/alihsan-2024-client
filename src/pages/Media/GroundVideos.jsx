import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";
import { itemPerPage } from "../../utils/constants";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import { ArrowRightIcon, CloseIcon } from "../../theme/svg-icons";
import { Pagination } from "../../components/Pagination";
import {
  getMediaGroundVideos,
  getMediaVideo,
} from "../../features/media/mediaSlice";
import YoutubeVideo from "../../components/YoutubeVideo";

const initialState = {
  page: "1",
  limit: process.env.REACT_APP_PAGINATION_PER_PAGE,
  search: "",
  status: "ACTIVE",
  order: "Newest",
};

export const GroundVideos = ({ isOpen }) => {
  const { rows, count } = useSelector((state) => state.medias.groundVideos);
  const { mediaVideo } = useSelector((state) => state.medias);
  const [filters, setFilters] = useState(initialState);
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
  };

  const handleFilterReset = () => {
    setFilters({ ...filters, search: "", status: "", order: "Newest" });
  };

  const handleCardClick = async (id) => {
    const res = await dispatch(getMediaVideo(id));
    if (res?.payload?.message === "Success") {
      setOpen(true);
    }
  };

  useEffect(() => {
    dispatch(getMediaGroundVideos(filters));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-black" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="relative flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-0 right-0 flex items-center justify-center m-2 text-white bg-gray-700 z-1 focus:outline-none"
              >
                <CloseIcon />
              </button>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="z-10 w-screen max-w-7xl">
                  <Dialog.Panel className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl max-w-7xl">
                    <ReactPlayer
                      url={mediaVideo?.payload?.url}
                      className="!w-full h-auto md:!h-[37.5rem]"
                      controls={true}
                    />
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
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
              <MediaGroundVideo
                key={item.id}
                item={item}
                handleCardClick={handleCardClick}
              />
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

export const MediaGroundVideo = ({ item, handleCardClick }) => {
  return (
    <div
      className="col-span-1 p-3 border border-neutral-300 rounded-2xl"
      onClick={() => handleCardClick(item?.id)}
    >
      <div className="w-full h-48 mb-4 overflow-hidden rounded-lg sm:h-45">
        <YoutubeVideo url={item?.url} />
        {/*<img src={item.url} alt={item.title} className="object-cover w-full h-full" />*/}
      </div>
      <p className="mb-2 text-heading-7 text-neutral-800 line-clamp-1 text-start">
        {item.title}
      </p>
      <p className="mb-4 text-sm text-neutral-600">{Date}</p>
      <Link className="!px-5 !py-2 !text-button-lg btn btn-secondary w-fit">
        View <ArrowRightIcon />{" "}
      </Link>
    </div>
  );
};
