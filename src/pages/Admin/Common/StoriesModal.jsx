import React, { useEffect, useState } from "react";
import { CloseIcon, PlusIcon } from "../../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import { SnackMessages } from "../../../components/Toast";
import {
  addStory,
  updateStory,
} from "../../../features/adminStories/adminStoriesSlice";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import { Dropdown } from "../../../components/Dropdown";
import TextArea from "../../../components/TextArea";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const validationSchema = yup.object({
  campaignId: yup.string().required("Campaign is required"),
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  content: yup.string().trim().required("Content is required"),
});

export const StoriesModal = ({ onClose, item }) => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  const { quickdonations } = useSelector((state) => state.quickDonations);

  const formik = useFormik({
    initialValues: {
      id: item?.id ?? "",
      campaignId: item?.campaignId ?? "",
      title: item?.title ?? "",
      description: item?.description ?? "",
      content: item?.content ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const action = item ? updateStory : addStory;
        const response = await dispatch(action(formik.values));
        if (response?.payload?.success) {
          resetForm();
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
    },
  });

  const handleCampaignChange = (e) => {
    formik.setFieldValue("campaignId", e.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const handleImageChange = (index, event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImagePreviews = [...imagePreviews];
        newImagePreviews[index] = reader.result;
        setImagePreviews(newImagePreviews);
        formik.setFieldValue(`images.${index}`, file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);
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
                      {item ? "Edit" : "Add"} Story
                    </div>
                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={onClose} />
                    </button>
                  </div>
                  <form
                    onSubmit={formik.handleSubmit}
                    className="flex items-start gap-3"
                  >
                    <div>
                      <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
                        <div className="flex flex-col form-group">
                          <div
                            for="dropzone-file"
                            className="relative overflow-hidden cursor-pointer rounded-3xl h-[12.5rem]"
                          >
                            <img
                              src="../images/banner/banner.jpg"
                              alt="banner"
                              className="object-cover w-full h-full"
                            />
                            {/* <Button
                              className="absolute btn btn-lite-primary text-button-md md:text-button-lg right-5 bottom-5"
                              label="Change Cover"
                              type="button"
                            /> */}
                            <div className="flex items-center justify-center w-full h-full ">
                <label for="dropzone-file" className="!mb-0 cursor-pointer absolute right-5 bottom-5">
                  <div className="flex flex-col items-center justify-center px-5 py-3 rounded-lg bg-primary-100 text-primary-300 text-button-lg">
                    Add Cover
                  </div>
                  <input id="dropzone-file" type="file" className="hidden"  />
                </label>
              </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                          <div className="form-group">
                            <label htmlFor="campaignId" className="block">
                              Campaign
                            </label>

                            <Dropdown
                              value={formik.values.campaignId}
                              onChange={handleCampaignChange}
                              options={quickdonations?.map((e) => ({
                                label: e.name,
                                value: e.id,
                              }))}
                              name="selected"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                          <div className="form-group">
                            <label htmlFor="title" className="block">
                              Title
                            </label>
                            <input
                              type="text"
                              className="w-full form-control"
                              placeholder="title"
                              name="title"
                              value={formik.values.title}
                              onChange={formik.handleChange}
                            />
                            {formik.touched.title &&
                              Boolean(formik.errors.title) && (
                                <FormikValidationError
                                  formikTouched={formik.touched.title}
                                  formikError={formik.errors.title}
                                />
                              )}
                          </div>
                        </div>
                        {/* /// */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                          <div className="form-group">
                            <label htmlFor="description" className="block">
                              Description{" "}
                            </label>
                            <TextArea
                              handleChange={handleInputChange}
                              name="description"
                              value={formik.values.description}
                            />
                            {formik.touched.description &&
                              Boolean(formik.errors.description) && (
                                <FormikValidationError
                                  formikTouched={formik.touched.description}
                                  formikError={formik.errors.description}
                                />
                              )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                          <div className="w-full form-group">
                            <label htmlFor="content" className="block">
                              Content
                            </label>
                            <TextArea
                              handleChange={handleInputChange}
                              name="content"
                              value={formik.values.content}
                            />

                            {formik.touched.content &&
                              Boolean(formik.errors.content) && (
                                <FormikValidationError
                                  formikTouched={formik.touched.content}
                                  formikError={formik.errors.content}
                                />
                              )}
                          </div>
                        </div>
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            key={index}
                            className="flex flex-col items-center justify-center col-span-1 gap-2 border border-dashed rounded-lg border-neutral-500"
                          >
                            <label
                              htmlFor={`images-${index}`}
                              className="relative cursor-pointer !flex flex-col items-center justify-center gap-2 lg:w-51 lg:h-36 overflow-hidden"
                            >
                              {imagePreviews[index] ? (
                                <img
                                  src={imagePreviews[index]}
                                  alt={`Uploaded ${index}`}
                                  className="object-cover w-full h-full rounded-lg"
                                />
                              ) : (
                                <>
                                  <PlusIcon strokeWidth={1.5} />
                                  <span className="text-neutral-600 text-button-md">
                                    Add Photo
                                  </span>
                                </>
                              )}

                              <input
                                className="absolute invisible w-full h-full"
                                id={`images-${index}`}
                                type="file"
                                name={`images.${index}`}
                                onChange={(event) =>
                                  handleImageChange(index, event)
                                }
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                      {formik.touched.images &&
                        Boolean(formik.errors.images) && (
                          <FormikValidationError
                            formikTouched={formik.touched.images}
                            formikError={formik.errors.images}
                          />
                        )}
                      <div className="flex justify-between gap-4 sm:gap-5">
                        <Button
                          variant={"secondaryOutline"}
                          className="flex-grow"
                          label={"Cancel"}
                          onClick={onClose}
                        />
                        <Button
                          variant={"primary"}
                          className="flex-grow"
                          label={`${item ? "Edit" : "Add"} Story`}
                          type="submit"
                        />
                      </div>
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
export default StoriesModal;
