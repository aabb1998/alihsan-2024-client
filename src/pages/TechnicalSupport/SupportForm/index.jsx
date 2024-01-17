import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { Button } from "../../../components";
import TextArea from "../../../components/TextArea";
import { PlusIcon, TrashIcon } from "../../../theme/svg-icons";
import { PhoneField } from "../../../components/PhoneField";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { technicalRequirements } from "../../../utils/constants";
import { submitSupport } from "../../../features/technicalSupport/technicalSupport";
import { Dropdown } from "../../../components/Dropdown";
import { getCountryLengths } from "../../../utils/helper";
import ImageUpload from "../../../components/ImageUpload";

export const SupportForm = () => {
  const dispatch = useDispatch();
  const [countryCode, setCountryCode] = useState("");
  const [isDisable, setDisable] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .max(50, ({ max }) => `First Name must be at most ${max} characters`),
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        "Enter a valid email"
      )
      .max(50, ({ max }) => `Last Name must be at most ${max} characters`),
    phone: yup.string().required("Phone Number is required"),
    requirement: yup.string().required("Requirement is required"),
    description: yup
      .string()
      .required("Description is required")
      .max(500, ({ max }) => `Company Name must be at most ${max} characters`),
  });

  const handlePhoneChange = (value, data) => {
    setCountryCode(data.countryCode);

    formik.setFieldValue("phone", value);
  };

  const formik = useFormik({
    initialValues: {
      requirement: "",
      name: "",
      email: "",
      phone: "",
      description: "",
      images: Array.from({ length: 4 }).fill(undefined), // Initialize with undefined values
    },
    validationSchema: validationSchema,
    validate: (values) => {
      const errors = {};
      const isAnyItemNotUndefined = values.images.every(
        (item) => item === undefined
      );
      if (isAnyItemNotUndefined) {
        errors.images = ["At least one photo is required"];
      }
      return errors;
    },
    onSubmit: async (values, { resetForm, setErrors }) => {
      setDisable(true);
      const isValid = getCountryLengths(values.phone, countryCode);
      if (!isValid) {
        setErrors({ phone: "Invalid phone number" });
        setDisable(false);
      } else {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("description", values.description);
        formData.append("requirement", values.requirement);
        values.images?.forEach((file, index) => {
          if (file) {
            formData.append(`images`, file, `image_${index + 1}.png`);
          }
        });
        try {
          const response = await dispatch(submitSupport(formData));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            setImagePreviews(Array(4).fill(null));
            resetForm();
            setDisable(false);
          } else {
            showErrorMessage(response?.error?.message);
            setDisable(false);
          }
        } catch (error) {}
        setDisable(false);

      }
    },
  });

  const handleImageChange = (event, index) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
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
    } else {
      showErrorMessage("Invalid file format");
    }
  };
  const handleImageDelete = (event, index) => {
    event.preventDefault();
    const newImagePreviews = [...imagePreviews];
    newImagePreviews[index] = null;
    setImagePreviews(newImagePreviews);
    const fileInput = document.getElementById(`images-${index}`);
    formik.setFieldValue(`images.${index}`, null);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleRequirementChange = ({ name, value }) => {
    formik.setFieldValue(name, value);
  };
  return (
    <div className="banner-container">
      <div className="px-4 py-7.5 md:p-10 mb-10 md:mb-7.5 mt-10 bg-neutral-200 rounded-2.5xl">
        <h2 className="mb-5 text-heading-6 md:text-heading-3">
          Technical Support
        </h2>
        <form onSubmit={formik.handleSubmit} id="support" autoComplete="off">
          <div className="md:grid-cols-2 md:grid gap-x-6">
            <div className="flex flex-col mb-6 form-group grow">
              <label htmlFor="Name" className="required">
                Full Name<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="w-full form-control"
                placeholder="Full Name"
              />
              {formik.touched.name && Boolean(formik.errors.name) && (
                <FormikValidationError
                  formikTouched={formik.touched.name}
                  formikError={formik.errors.name}
                />
              )}
            </div>
            <div className="flex flex-col mb-6 form-group grow">
              <label htmlFor="Name" className="required">
                Email Address<span className="text-red-300">*</span>
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="w-full form-control"
                placeholder="Email Address"
              />
              {formik.touched.email && Boolean(formik.errors.email) && (
                <FormikValidationError
                  formikTouched={formik.touched.email}
                  formikError={formik.errors.email}
                />
              )}
            </div>
            <div className="flex flex-col mb-6 form-group grow">
              <label htmlFor="Name" className="required">
                Phone Number of Contact<span className="text-red-300">*</span>
              </label>
              <PhoneField
                name={"phone"}
                value={formik.values.phone}
                handleChange={handlePhoneChange}
              />
              {formik.touched.phone && Boolean(formik.errors.phone) && (
                <FormikValidationError
                  formikTouched={formik.touched.phone}
                  formikError={formik.errors.phone}
                />
              )}
            </div>
            <div className="flex flex-col mb-6 form-group grow">
              <label htmlFor="Name" className="required">
                Requirement<span className="text-red-300">*</span>
              </label>
              <Dropdown
                value={formik.values.requirement}
                className="!w-full"
                onChange={handleRequirementChange}
                options={technicalRequirements}
                name={"requirement"}
              />
              {formik.touched.requirement &&
                Boolean(formik.errors.requirement) && (
                  <FormikValidationError
                    formikTouched={formik.touched.requirement}
                    formikError={formik.errors.requirement}
                  />
                )}
            </div>
            <div className="flex flex-col col-span-2 mb-6 form-group grow">
              <label htmlFor="Name" className="required">
                Images<span className="text-red-300">*</span>
              </label>
              <div className="grid col-span-2 gap-5 p-5 bg-white md:grid-cols-4 rounded-2xl">
                {Array.from({ length: 4 }).map((_, index) => (
                  <>
                    <ImageUpload
                      key={index}
                      imagePreviews={imagePreviews[index]}
                      name={"images-" + index}
                      handleImageDelete={(event) =>
                        handleImageDelete(event, index)
                      }
                      handleImageChange={(event) =>
                        handleImageChange(event, index)
                      }
                    />
                  </>
                ))}
              </div>
              {formik.touched.images && Boolean(formik.errors.images) && (
                <FormikValidationError
                  formikTouched={formik.touched.images}
                  formikError={formik.errors.images}
                />
              )}
            </div>
            <div className="flex flex-col col-span-2 mb-6 form-group grow">
              <label htmlFor="Description" className="required">
                Describe The Problem<span className="text-red-300">*</span>
              </label>
              <div className="relative">
                <TextArea
                  value={formik.values.description}
                  name="description"
                  handleChange={formik.handleChange}
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
          </div>
          <Button
            variant="primaryFull"
            type="submit"
            label="Submit"
            disabled={isDisable}
          />
        </form>
      </div>
    </div>
  );
};
