import React, { useEffect, useState } from "react";
import { Edit3Icon, PlusIcon, Trash2Icon } from "../../../theme/svg-icons";
import BannerEdit from "./BannerEdit";
import { useDispatch, useSelector } from "react-redux";
import { getBannerImages } from "../../../features/home/homeSlice";
import { Button } from "../../../components";
import DeleteConfirmation from "../Common/DeleteConfirmation";
import { deleteBannerImage } from "../../../features/adminHomeContent/adminHomeContentSlice";
import { SnackMessages } from "../../../components/Toast";

const HomePageBanner = () => {
  const dispatch = useDispatch();
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [item, setItem] = useState(null);
  const { bannerImages, settings } = useSelector((state) => state.settings);
  const getAllBannerImages = async () => {
    await dispatch(getBannerImages());
  };

  const confirmDelete = async () => {
    const response = await dispatch(deleteBannerImage(item?.id));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
      setItem(null);
    } else {
      showErrorMessage(response?.payload?.message);
      setItem(null);
    }
    setIsDeleteOpen(false);
  };

  useEffect(() => {
    getAllBannerImages();
  }, [item, isOpen, isDeleteOpen]);

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Homepage Banner</h5>
          <Button
            className=" btn btn-primary text-button-md md:text-button-lg"
            type="button"
            leftIcon={<PlusIcon />}
            label="Add New"
            onClick={() => setIsOpen(true)}
          />{" "}
        </div>

        {isOpen && (
          <BannerEdit
            item={item}
            onClose={() => {
              setIsOpen(false);
              setItem(null);
            }}
            setItem={() => setItem(null)}
            data={settings?.bannerImage}
          />
        )}
        <div className="mt-5 md:mt-7.5 flex flex-col gap-5 sm:gap-7.5">
          {bannerImages?.map((bannerImage) => (
            <div className="flex flex-wrap items-start justify-between w-full gap-2 px-4 py-6 border md:flex-nowrap hover:shadow-card hover:border-primary-300 sm:items-center rounded-2xl border-neutral-300">
              <div className="flex flex-col gap-2 sm:gap-3">
                <h5 className="text-heading-6 text-neutral-1000">
                  {bannerImage?.title}
                </h5>
                <p className="text-sm font-medium break-all text-neutral-600">
                  {bannerImage?.description}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <Button
                  variant={"none"}
                  className="btn bg-primary-100 !p-2"
                  onClick={() => {
                    setItem(bannerImage);
                    setIsOpen(true);
                  }}
                  leftIcon={<Edit3Icon />}
                />
                {bannerImages?.length > 1 && (
                  <Button
                    variant={"none"}
                    className="btn bg-primary-100 !p-2"
                    onClick={() => {
                      setItem(bannerImage);
                      setIsDeleteOpen(true);
                    }}
                    leftIcon={<Trash2Icon />}
                  />
                )}
              </div>
              {isDeleteOpen && (
                <DeleteConfirmation
                  onClose={() => setIsDeleteOpen(false)}
                  confirmDelete={confirmDelete}
                  title={"Banner Image"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePageBanner;
