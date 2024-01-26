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
import { resetImpactStory } from "../../../features/impactStories/impactStories";
import {
  addOurWork,
  getOurWork,
  resetOurWork,
  updateOurWork,
} from "../../../features/adminOurWorks/adminOurWorksSlice";
import Img from "../../../components/Image";
import ImageUpload from "../../../components/ImageUpload";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
  image: yup.string().required("Image is required"),
});

export const UpdateOurWork = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ourWork } = useSelector((state) => state.adminOurWorks);
  const [imagePreviews, setImagePreviews] = useState(null);
  const formik = useFormik({
    initialValues: {
      id: ourWork?.id ?? "",
      name: ourWork?.name ?? "",
      title: ourWork?.title ?? "",
      description: ourWork?.description ?? "",
      image: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("image", values.image);
      formData.append("name", values.name);
      formData.append("title", values.title);
      formData.append("description", values.description);

      try {
        let response;
        if (id) {
          response = await dispatch(updateOurWork({ id: id, data: formData }));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            navigate("/admin/our-works");
          } else {
            showErrorMessage(response?.payload?.message);
          }
        } else {
          response = await dispatch(addOurWork(formData));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            setImagePreviews(null);
            resetForm();
            navigate("/admin/our-works");
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
  const handleImageDelete = (event) => {
    event.preventDefault();
    setImagePreviews(null);
    const fileInput = document.getElementById(`images`);
    formik.setFieldValue(`image`, null);
    if (fileInput) {
      fileInput.value = null;
    }
  };

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImagePreviews = reader.result;
          setImagePreviews(newImagePreviews);
          formik.setFieldValue(`image`, file);
        };
        reader.readAsDataURL(file);
      }
    } else {
      showErrorMessage("Invalid file format");
    }
  };

  const getCroppedImage = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = blob;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(reader.result);
        formik.setFieldValue(`image`, file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (id) {
      dispatch(getOurWork(id));
    }
  }, [id]);

  useEffect(() => {
    if (ourWork) {
      formik.setValues(ourWork);
      setImagePreviews(ourWork?.image);
    }
    return () => {
      dispatch(resetOurWork());
    };
  }, [ourWork]);

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
            label="Back to Our work"
            variant={"none"}
            leftIcon={
              <span>
                <ArrowLeftIcon />{" "}
              </span>
            }
            onClick={() => navigate("/admin/our-works")}
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
        <div className="mt-5 md:mt-7.5">
          <div className="flex flex-col mb-6 form-group">
            <label htmlFor="title" className="">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full bg-white form-control"
              id="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && Boolean(formik.errors.name) && (
              <FormikValidationError
                formikTouched={formik.touched.name}
                formikError={formik.errors.name}
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
          <div className="form-group">
            <label htmlFor="content" className="">
              Image
            </label>
            <ImageUpload
              imagePreviews={imagePreviews}
              name={"images"}
              handleImageDelete={(event) => handleImageDelete(event)}
              handleImageChange={(event) => handleImageChange(event)}
              getCroppedImage={(e) => getCroppedImage(e)}

            />
            {formik.touched.image && Boolean(formik.errors.image) && (
              <FormikValidationError
                formikTouched={formik.touched.image}
                formikError={formik.errors.image}
              />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
