import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import TextArea from "../../../components/TextArea";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import {
  addPostDetails,
  getMediaPost,
  updatePostDetails,
  resetMedia,
} from "../../../features/adminMedia/adminMediaSlice";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
import ImageUpload from "../../../components/ImageUpload";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  url: yup.string().required("Image is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { media, isLoading } = useSelector((state) => state.adminMedia);
  const [coverPreviews, setCoverPreviews] = useState("");
  const [imagePreviews, setImagePreviews] = useState(null);
  const formik = useFormik({
    initialValues: {
      id: media?.id ?? "",
      url: media?.url ?? "",
      title: media?.title ?? "",
      description: media?.description ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("url", values.url);
      formData.append("title", values.title);
      formData.append("description", values.description);

      try {
        let response;
        if (id) {
          response = await dispatch(
            updatePostDetails({ data: formData, id: id })
          );
          if (response?.payload?.payload) {
            showSuccessMessage(response?.payload?.message);
            navigate("/admin/posts");
          } else {
            showErrorMessage(response?.payload?.message);
          }
        } else {
          response = await dispatch(addPostDetails(formData));
          if (response?.payload?.payload) {
            showSuccessMessage(response?.payload?.message);
            setImagePreviews(Array(4).fill(null));
            setCoverPreviews("");
            resetForm();
            navigate("/admin/posts");
          } else {
            showErrorMessage(response?.payload?.message);
          }
        }
      } catch (error) {}
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImagePreviews = reader.result;
          setImagePreviews(newImagePreviews);
          formik.setFieldValue(`url`, file);
        };
        reader.readAsDataURL(file);
      }
    } else {
      showErrorMessage("Invalid file format");
    }
  };

  const handleImageDelete = (event) => {
    event.preventDefault();
    setImagePreviews(null);
    const fileInput = document.getElementById(`images`);
    formik.setFieldValue(`url`, null);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getMediaPost(id));
    }
  }, [id]);

  useEffect(() => {
    if (media) {
      formik.setValues(media);
      setImagePreviews(media?.url);
    }
    return () => {
      dispatch(resetMedia());
    };
  }, [media]);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full"
        autoComplete="off"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <Button
            className="flex items-center text-button-lg gap-x-2"
            label="Back to Post Campaign Updates"
            variant={"none"}
            leftIcon={
              <span>
                <ArrowLeftIcon />{" "}
              </span>
            }
            onClick={() => navigate("/admin/posts")}
          />

          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            {isLoading ? (
              <PrimaryLoadingButton additionalButtonClasses="" />
            ) : (
              <Button
                className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                variant=""
                type="submit"
                label={"Submit"}
              />
            )}
          </div>
        </div>
        <div className="mt-5 md:mt-7.5">
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="title" className="">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="w-full bg-white form-control"
              id="blog-title"
              placeholder="Title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && Boolean(formik.errors.title) && (
              <FormikValidationError
                formikTouched={formik.touched.title}
                formikError={formik.errors.title}
              />
            )}
          </div>

          <div className="relative flex flex-col mb-6 text-area">
            <label htmlFor="content" className="">
              Description
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
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="title" className="">
              Image
            </label>
            
            <ImageUpload
              imagePreviews={imagePreviews}
              name={"images"}
              handleImageDelete={(event) => handleImageDelete(event)}
              handleImageChange={(event) => handleImageChange(event)}
            />
            {formik.touched.url && Boolean(formik.errors.url) && (
              <FormikValidationError
                formikTouched={formik.touched.url}
                formikError={formik.errors.url}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
