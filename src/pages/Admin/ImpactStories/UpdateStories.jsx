import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  addStory,
  updateStory,
} from "../../../features/adminStories/adminStoriesSlice";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import TextArea from "../../../components/TextArea";
import { Dropdown } from "../../../components/Dropdown";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import {
  getImpactStory,
  resetImpactStory,
} from "../../../features/impactStories/impactStories";
import ImageUpload from "../../../components/ImageUpload";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  campaignId: yup.string().required("Campaign is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  coverImage: yup.string().required("Cover Image is required"),
});
const adminListingUrl = "/admin/impact-stories";

export const UpdateStory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quickdonations } = useSelector((state) => state.quickDonations);
  const { impactStory } = useSelector((state) => state.impactStories);
  const [coverPreviews, setCoverPreviews] = useState("");

  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));
  const formik = useFormik({
    initialValues: {
      id: impactStory?.id ?? "",
      campaignId: impactStory?.campaignId ?? "",
      title: impactStory?.title ?? "",
      description: impactStory?.description ?? "",
      images: Array.from({ length: 4 }).fill(undefined),
      coverImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("coverImage", values.coverImage);
      formData.append("campaignId", values.campaignId);
      formData.append("title", values.title);
      formData.append("description", values.description);
      values.images?.forEach((file, index) => {
        if (file) {
          formData.append(`images`, file, `image_${index + 1}.png`);
        }
      });
      try {
        let response;
        if (id) {
          response = await dispatch(updateStory({ id, data: formData }));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            navigate(adminListingUrl);
          } else {
            showErrorMessage(response?.error?.message);
          }
        } else {
          response = await dispatch(addStory(formData));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            setImagePreviews(Array(4).fill(null));
            setCoverPreviews("");
            resetForm();
            navigate(adminListingUrl);
          } else {
            showErrorMessage(response?.error?.message);
          }
        }
      } catch (error) {}
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  const handleCampaignChange = (e) => {
    formik.setFieldValue("campaignId", e.value);
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

  const handleCoverImage = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreviews(reader.result);
        formik.setFieldValue(`coverImage`, file);
      };
      reader.readAsDataURL(file);
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

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(getImpactStory(id));
    }
  }, [id]);

  useEffect(() => {
    if (impactStory) {
      formik.setValues(impactStory);
      setCoverPreviews(impactStory.coverImage);
      let imagList = [];
      impactStory.ImpactStoryMedia.map((e) => {
        imagList.push(e?.url);
      });
      setImagePreviews(imagList);
    }
    return () => {
      dispatch(resetImpactStory());
    };
  }, [impactStory]);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <Button
            className="flex items-center text-button-lg gap-x-2"
            label="Back to Stories"
            variant={"none"}
            leftIcon={
              <span>
                <ArrowLeftIcon />{" "}
              </span>
            }
            onClick={() => navigate("/admin/impact-stories")}
          />

          <div className="flex flex-wrap items-center gap-2 lg:gap-3">
            <Button
              className="flex-grow btn btn-primary text-button-md md:text-button-lg"
              variant=""
              type="submit"
              label={"Submit"}
            />
          </div>
        </div>

        <div className="flex flex-col mb-6 form-group mt-5 md:mt-7.5">
          <div
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover cursor-pointer rounded-3xl h-76 bg-choose-cover"
          >
            {coverPreviews ? (
              <img
                src={coverPreviews}
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
                  type="file"
                  className="hidden"
                  name={`coverImage`}
                  onChange={(event) => handleCoverImage(event)}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          {formik.touched.coverImage && Boolean(formik.errors.coverImage) && (
            <FormikValidationError
              formikTouched={formik.touched.coverImage}
              formikError={formik.errors.coverImage}
            />
          )}
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="title" className="">
            Campaign
          </label>
          <Dropdown
            className={"!w-full"}
            value={formik.values.campaignId}
            onChange={handleCampaignChange}
            options={quickdonations?.map((e) => ({
              label: e.name,
              value: e.id,
            }))}
            name="selected"
            defaultSelect={"Select"}
          />
          {formik.touched.campaignId && Boolean(formik.errors.campaignId) && (
            <FormikValidationError
              formikTouched={formik.touched.campaignId}
              formikError={formik.errors.campaignId}
            />
          )}
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="title" className="">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="w-full bg-white form-control"
            id="blog-title"
            placeholder="Blog title goes here"
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
          <label htmlFor="description" className="">
            Description
          </label>
          <TextArea
            handleChange={handleInputChange}
            name="description"
            value={formik.values.description}
          />
          {formik.touched.description && Boolean(formik.errors.description) && (
            <FormikValidationError
              formikTouched={formik.touched.description}
              formikError={formik.errors.description}
            />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
          <h5 className="flex items-center text-button-lg gap-x-2">
            Story Images
          </h5>
        </div>
        <div className="flex flex-wrap gap-2 p-5 sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
          {Array.from({ length: 4 }).map((_, index) => (
            <ImageUpload
              key={index}
              imagePreviews={imagePreviews[index]}
              name={"images-" + index}
              handleImageDelete={(event) => handleImageDelete(event, index)}
              handleImageChange={(event) => handleImageChange(event, index)}
            />
          ))}
          {formik.touched.images && Boolean(formik.errors.images) && (
            <FormikValidationError
              formikTouched={formik.touched.images}
              formikError={formik.errors.images}
            />
          )}
        </div>
      </form>
    </div>
  );
};
