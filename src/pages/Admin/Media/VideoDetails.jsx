import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import TextArea from "../../../components/TextArea";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import {
  addVideoDetails,
  getMediaVideo,
  updateVideoDetails,
  resetMedia,
} from "../../../features/adminMedia/adminMediaSlice";
import { PrimaryLoadingButton } from "../../../components/LoadingButtons";
const { showSuccessMessage, showErrorMessage } = SnackMessages();
const youtubeUrlRegex =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(.*\/)?|youtu\.be\/)([^\?&"'>]+)/;

const validationSchema = yup.object({
  url: yup
    .string()
    .matches(youtubeUrlRegex, "Invalid YouTube URL")
    .required("Url is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export const VideoDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { media, isLoading } = useSelector((state) => state.adminMedia);
  const [coverPreviews, setCoverPreviews] = useState("");
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));
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
            updateVideoDetails({ id: id, data: values })
          );
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            navigate('/admin/videos');
          } else {
            showErrorMessage(response?.payload?.message);
          }
        } else {
          response = await dispatch(addVideoDetails(values));

          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            setImagePreviews(Array(4).fill(null));
            setCoverPreviews("");
            resetForm();
            navigate('/admin/videos');
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

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getMediaVideo(id));
    }
  }, [id]);

  useEffect(() => {
    if (media) {
      formik.setValues(media);
      let imagList = [];

      setImagePreviews(imagList);
    }
    return () => {
      dispatch(resetMedia());
    };
  }, [media]);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {/* dashboard title rea */}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full"
        autoComplete="off"
      >
        <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <Button
            className="flex items-center text-button-lg gap-x-2"
            label="Back to On Ground Videos"
            variant={"none"}
            leftIcon={
              <span>
                <ArrowLeftIcon />{" "}
              </span>
            }
            onClick={() => navigate("/admin/videos")}
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
              URL
            </label>
            <input
              type="text"
              name="url"
              className="w-full bg-white form-control"
              id="blog-title"
              placeholder="url"
              value={formik.values.url}
              onChange={formik.handleChange}
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
