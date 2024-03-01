import React, { useEffect, useState } from "react";
import { CloseIcon, PlusIcon } from "../../../theme/svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "../../../components/Button";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { Dropdown } from "../../../components/Dropdown";
import TextArea from "../../../components/TextArea";
import { countriesList } from "../../../utils/countries";
import { addOrUpdate } from "../../../features/adminCountry/adminCountrySlice";
import ImageUpload from "../../../components/ImageUpload";

const { showSuccessMessage, showErrorMessage } = SnackMessages();
const validationSchema = yup.object({
  countryName: yup.string().trim().required("Country Name is required"),
  description: yup.string().trim().required("Description is required"),
  image: yup.string().required("Image is required"),
});

const AddOrCreateModal = ({ onClose, item }) => {
  const dispatch = useDispatch();
  const [imagePreviews, setImagePreviews] = useState("");

  const formik = useFormik({
    initialValues: {
      id: item?.id ?? "",
      countryCode: item?.countryCode ?? "",
      countryName: item?.countryName ?? "",
      description: item?.description ?? "",
      image: item?.image || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("countryCode", values.countryCode);
        formData.append("countryName", values.countryName);
        formData.append("description", values.description);
        formData.append("image", values.image, `images.png`);
        const response = await dispatch(
          addOrUpdate({ data: formData, id: item?.id })
        );
        if (response?.payload?.success) {
          resetForm();
          onClose();
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.error?.message);
        }
      } catch (error) {}
    },
  });

  const handleImageDelete = (event) => {
    event.preventDefault();
    setImagePreviews(null);
    const fileInput = document.getElementById(`image`);
    formik.setFieldValue(`image`, null);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleChange = (e) => {
    const country = countriesList.find((item) => item.code === e.value);
    formik.setFieldValue("countryName", country?.name);
    formik.setFieldValue("countryCode", e.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const getCroppedImage = async (url) => {
    const response = await fetch(url);
    const file = await response.blob();

    setImagePreviews(url);
    formik.setFieldValue(`image`, file);
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     console.log(imagePreviews);
    //     const newImagePreviews = [...imagePreviews];
    //     newImagePreviews[index] = reader.result;
    //     setImagePreviews(newImagePreviews);
    //     formik.setFieldValue(`images.${index}`, file);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  const handleImageChange = (event, index) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews(reader.result);
          formik.setFieldValue(`image`, file);
        };
        reader.readAsDataURL(file);
      }
    } else {
      showErrorMessage("Invalid file format");
    }
  };

  useEffect(() => {
    if (item) setImagePreviews(item?.image);
  }, [item]);

  return (
    <>
      <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
            <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
              <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8 ">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                      {item ? "Edit" : "Add"} Country
                    </div>
                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={onClose} />
                    </button>
                  </div>
                  <form onSubmit={formik.handleSubmit} className="">
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-6 pr-2 overflow-auto max-h-96">
                        <div className="form-group">
                          <label htmlFor="campaignId" className="block">
                            Country<span className="text-red-300">*</span>
                          </label>

                          <Dropdown
                            value={formik.values.countryCode}
                            onChange={handleChange}
                            options={countriesList?.map((e) => ({
                              label: e.name,
                              value: e.code,
                            }))}
                            name="countryName"
                            defaultSelect={"Select"}
                            className={"!w-full"}
                          />
                          {formik.touched.countryName &&
                            Boolean(formik.errors.countryName) && (
                              <FormikValidationError
                                formikTouched={formik.touched.countryName}
                                formikError={formik.errors.countryName}
                              />
                            )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="description" className="block">
                            Description{""}
                            <span className="text-red-300">*</span>
                          </label>
                          <TextArea
                            handleChange={handleInputChange}
                            maxLength={100}
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

                        <div className="form-group">
                          <label htmlFor="description" className="block">
                            Image{""}
                            <span className="text-red-300">*</span>
                          </label>
                          <ImageUpload
                            imagePreviews={imagePreviews}
                            name={"images"}
                            handleImageDelete={(event) =>
                              handleImageDelete(event)
                            }
                            handleImageChange={(event) =>
                              handleImageChange(event)
                            }
                            getCroppedImage={(e) => getCroppedImage(e)}
                          />
                          {formik.touched.image &&
                            Boolean(formik.errors.image) && (
                              <FormikValidationError
                                formikTouched={formik.touched.image}
                                formikError={formik.errors.image}
                              />
                            )}
                        </div>
                      </div>

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
                          // label={`${item ? "Submit" : "Add Country"}`}
                          label={"Submit"}
                          type="submit"
                          disabled={formik.isSubmitting}
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
export default AddOrCreateModal;
