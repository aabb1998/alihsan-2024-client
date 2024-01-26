import React, { useEffect, useState } from "react";
import { CloseIcon, LoaderIcon, ModalLoader } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import Loader from "../../../components/Loader";
import { useFormik } from "formik";
import * as yup from "yup";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { useDispatch, useSelector } from "react-redux";
import { updateBannerImage } from "../../../features/adminHomeContent/adminHomeContentSlice";
import { SnackMessages } from "../../../components/Toast";
import Modal from "../../../components/ImageUpload/Modal";

const validationSchema = yup.object({
  bannerImage: yup.string().required("Banner Image is required"),
});
const { showSuccessMessage, showErrorMessage } = SnackMessages();

export const BannerEdit = ({ getAllSettings, onClose, data }) => {
  const [imagePreview, setImagePreview] = useState("");
  const [isUpdate, setUpdate] = useState(true);
  const [isLoader, setLoader] = useState(true);
  const [isButtonLoader, setButtonLoader] = useState(false);
  const [isCropOpen, setCropOpen] = useState(false);

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      bannerImage: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append(`bannerImage`, values.bannerImage, `image.png`);
      try {
        setButtonLoader(true);
        let response = await dispatch(updateBannerImage(formData));
        if (response?.payload?.success) {
          setButtonLoader(false);
          onClose();
          showSuccessMessage(response?.payload?.message);
          getAllSettings()
        } else {
          setButtonLoader(false);
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
    },
  });
  const getCroppedCoverImage = async (url) => {
    const response = await fetch(url);
    const file = await response.blob();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue(`bannerImage`, file);
      };
      reader.readAsDataURL(file);
      setUpdate(false);

    }
  };

  const handleCoverImage = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      setUpdate(false);
      reader.onloadend = () => {
        setImagePreview(reader.result);
        formik.setFieldValue(`bannerImage`, file);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (data) {
      setLoader(false);
      setImagePreview(data);
    }
  }, [data]);
  return (
    <>
      <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
            <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
              <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                      Homepage Banner (AU)
                    </div>
                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={onClose} />
                    </button>
                  </div>
                  {isCropOpen && (
                    <Modal
                      getCroppedImage={(e) => {
                        setCropOpen(false);
                        getCroppedCoverImage(e);
                      }}
                      aspect={16 / 9}
                      onClose={() => setCropOpen(false)}
                    />
                  )}
                  <form
                    onSubmit={formik.handleSubmit}
                    className="w-full flex flex-col gap-5 md:gap-7.5"
                  >
                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
                      <div className="flex flex-col form-group">
                        <div
                          htmlFor="dropzone-file"
                          className="overflow-hidden cursor-pointer rounded-3xl h-[12.5rem]"
                        >
                          {/* <button className='absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5'>Change Cover</button> */}
                          <div className="relative flex items-center justify-center w-full h-full">
                            {isLoader ? (
                              <Loader />
                            ) : (
                              <div
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-[12.5rem] bg-choose-cover"
                              >
                                {imagePreview ? (
                                  <img
                                    src={imagePreview}
                                    alt="preview"
                                    className="object-cover w-full"
                                  />
                                ) : (
                                  ""
                                )}
                                <div className="flex items-center justify-center w-full h-full ">
                                  <label
                                    htmlFor="dropzone-file"
                                    className="!mb-0 cursor-pointer absolute right-5 bottom-5"
                                  >
                                    <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                                      Change Cover
                                    </div>
                                    <input
                                      id="dropzone-file"
                                      // type="file"
                                      className="hidden"
                                      name={`bannerImage`}
                                      // onChange={(event) =>
                                      //   handleCoverImage(event)
                                      // }
                                      accept="image/*"
                                      onClick={() => setCropOpen(true)}

                                    />
                                  </label>
                                </div>
                              </div>
                            )}
                            {formik.touched.bannerImage &&
                              Boolean(formik.errors.bannerImage) && (
                                <FormikValidationError
                                  formikTouched={formik.touched.bannerImage}
                                  formikError={formik.errors.bannerImage}
                                />
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-4 sm:gap-5">
                      <Button
                        variant={"secondaryOutline"}
                        className="flex-grow"
                        label={"Cancel"}
                        type="button"
                        onClick={onClose}
                      />
                      {isButtonLoader ? (
                        <PrimaryLoadingButton additionalButtonClasses="" />
                      ) : (
                        <Button
                          variant={"primary"}
                          className="flex-grow"
                          label={"Update"}
                          type={"submit"}
                          disabled={isUpdate}
                        />
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BannerEdit;
