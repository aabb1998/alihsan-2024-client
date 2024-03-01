import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { SnackMessages } from "../../../components/Toast";
import { submitSupport } from "../../../features/technicalSupport/technicalSupport";
import { getCountryLengths } from "../../../utils/helper";
import { captchaValidation } from "../../../features/authentication/authenticationSlice";
import { Form } from "./Form";

export const SupportForm = () => {
  const dispatch = useDispatch();
  const captchaRef = useRef(null);
  const [countryCode, setCountryCode] = useState("");
  const [isDisable, setDisable] = useState(false);
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
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
    phone: yup.string().trim().required("Phone Number is required"),
    requirement: yup.string().trim().required("Requirement is required"),
    description: yup
      .string()
      .trim()
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
      images: Array.from({ length: 4 }).fill(undefined),
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
      const token = captchaRef.current.getValue();
      captchaRef.current.reset();
      const response = await dispatch(captchaValidation({ token: token }));
      if (!response?.payload?.success) {
        showErrorMessage(response?.payload?.message);
        return;
      }

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
            showErrorMessage(response?.payload?.message);
            setDisable(false);
          }
        } catch (error) {}
        setDisable(false);
      }
    },
  });

  const getCroppedImage = async (url, index) => {
    const response = await fetch(url);
    const file = await response.blob();

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
        <Form
          formik={formik}
          handlePhoneChange={handlePhoneChange}
          handleRequirementChange={handleRequirementChange}
          imagePreviews={imagePreviews}
          handleImageDelete={handleImageDelete}
          handleImageChange={handleImageChange}
          getCroppedImage={(e, index) => getCroppedImage(e, index)}
          captchaRef={captchaRef}
        />
      </div>
    </div>
  );
};

