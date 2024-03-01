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
import { Dropdown } from "../../../components/Dropdown";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import {
  getImpactStory,
  resetImpactStory,
} from "../../../features/impactStories/impactStories";
import ImageUpload from "../../../components/ImageUpload";
import { makeSlug, validateSlug } from "../../../utils/helper";
import QuillEditor from "../../../components/QuillEditor";
import Modal from "../../../components/ImageUpload/Modal";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  campaignId: yup.string().required("Campaign is required"),
  title: yup.string().trim().required("Title is required"),
  slug: yup
    .string()
    .required("Slug is required")
    .test(
      "test-slug",
      "Only lower case alphabets, numbers, hyphens (-) and underscores (_) are allowed",
      (v) => !validateSlug(v)
    ),
  description: yup.string().trim().required("Description is required"),
  coverImage: yup.string().required("Cover Image is required"),
});
const adminListingUrl = "/admin/impact-stories";

const UpdateStory = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCropOpen, setCropOpen] = useState(false);

  const { quickdonations } = useSelector((state) => state.quickDonations);
  const { impactStory } = useSelector((state) => state.impactStories);
  const [coverPreviews, setCoverPreviews] = useState("");
  const [impactStoryMedia, setImpactStoryMedia] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  const formik = useFormik({
    initialValues: {
      id: impactStory?.id ?? "",
      slug: impactStory?.slug ?? "",
      campaignId: impactStory?.campaignId ?? "",
      title: impactStory?.title ?? "",
      description: impactStory?.description ?? "",
      descriptionText:
        impactStory?.descriptionText ?? impactStory?.description ?? "",
      images: Array.from({ length: 4 }).fill(undefined),
      coverImage: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append(`coverImage`, values.coverImage, `coverImage.png`);
      formData.append("campaignId", values.campaignId);
      formData.append("title", values.title);
      formData.append("slug", values.slug);
      formData.append("description", values.description);
      formData.append("descriptionText", values.descriptionText);
      formData.append("deletedImages", deletedImages);

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
            showErrorMessage(response?.payload?.message);
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
            showErrorMessage(response?.payload?.message);
          }
        }
      } catch (error) {}
    },
  });
  const handleDescriptionChange = (e) => {
    formik.setFieldValue("description", e.target.value.html);
    formik.setFieldValue("descriptionText", e.target.value.text);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    if (name === "title" && !formik.values.id && !formik.touched.slug)
      formik.setFieldValue("slug", makeSlug(value));
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
        formik.setFieldValue(`coverImage`, file, `coverImage.png`);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageDelete = (event, index) => {
    const findImage = impactStoryMedia[index];
    if (findImage) {
      setDeletedImages([...deletedImages, findImage?.id]);
    }
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

  const getCroppedImage = async (url, index) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = blob;
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

  const getCroppedCoverImage = async (url) => {
    const response = await fetch(url);
    const file = await response.blob();
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreviews(reader.result);
        formik.setFieldValue(`coverImage`, file, `coverImage.png`);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);

  const getAllImpactStories = async () => {
    if (id) {
      await dispatch(getImpactStory({ id }));
    }
  };
  useEffect(() => {
    getAllImpactStories();
  }, [id]);

  useEffect(() => {
    if (impactStory) {
      formik.setValues(impactStory);
      setCoverPreviews(impactStory.coverImage);
      let imagList = [];
      impactStory.ImpactStoryMedia.map((e) => {
        imagList.push(e?.url);
      });
      setImpactStoryMedia(impactStory.ImpactStoryMedia);
      setImagePreviews(imagList);
    }
    return () => {
      dispatch(resetImpactStory());
    };
  }, [impactStory]);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
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
              disabled={formik.isSubmitting}
            />
          </div>
        </div>

        <div className="flex flex-col mb-6 form-group mt-5 md:mt-7.5">
          <div
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-full overflow-hidden bg-center bg-no-repeat bg-cover rounded-3xl h-76 bg-choose-cover"
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
                  {id ? "Change " : "Add "}Cover
                </div>
                <input
                  id="dropzone-file"
                  // type="file"
                  className="hidden"
                  name={`coverImage`}
                  onChange={(event) => handleCoverImage(event)}
                  accept="image/*"
                  onClick={() => setCropOpen(true)}
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
            Campaign<span className="text-red-300">*</span>
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
            Title<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="title"
            className="w-full bg-white form-control"
            id="blog-title"
            placeholder="Title goes here"
            value={formik.values.title}
            onChange={handleInputChange}
          />
          {formik.touched.title && Boolean(formik.errors.title) && (
            <FormikValidationError
              formikTouched={formik.touched.title}
              formikError={formik.errors.title}
            />
          )}
        </div>
        <div className="flex flex-col mb-6 form-group">
          <label htmlFor="blog-slug" className="">
            Slug<span className="text-red-300">*</span>
          </label>
          <input
            type="text"
            name="slug"
            className="w-full bg-white form-control"
            id="blog-slug"
            placeholder="Slug goes here"
            value={formik.values.slug}
            onChange={formik.handleChange}
          />
          {formik.touched.slug && Boolean(formik.errors.slug) && (
            <FormikValidationError
              formikTouched={formik.touched.slug}
              formikError={formik.errors.slug}
            />
          )}
        </div>

        <div className="relative flex flex-col mb-6 text-area">
          <label htmlFor="description" className="">
            Description<span className="text-red-300">*</span>
          </label>
          <QuillEditor
            value={formik.values.description}
            onChange={handleDescriptionChange}
            name="description"
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
              getCroppedImage={(e) => getCroppedImage(e, index)}
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

export default UpdateStory;
