import React, { useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  CloseIcon,
  PlusIcon,
  TrashIcon,
} from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { SnackMessages } from "../../../components/Toast";
import { getNews } from "../../../features/news/news";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import TextArea from "../../../components/TextArea";
import {
  addBlog,
  getTags,
  updateBlog,
} from "../../../features/adminBlog/adminBlogSlice";
import { resetNews } from "../../../features/news/news";
import TagSelection from "../../../components/TagSelection";
import AddTags from "./AddTags";
import ImageUpload from "../../../components/ImageUpload";

const { showSuccessMessage, showErrorMessage } = SnackMessages();

const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  slug: yup.string().required("Slug is required"),
  tags: yup.string().required("Tag is required"),
  // coverImage: yup.string().required("Cover Image is required"),
});

export const UpdateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { news, loading } = useSelector((state) => state.news);
  const { tags } = useSelector((state) => state.adminBlog);
  const [selectionTags, setSelectionTags] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  console.log(news?.status);
  const [coverPreviews, setCoverPreviews] = useState("");
  const [imagePreviews, setImagePreviews] = useState(Array(4).fill(null));

  const formik = useFormik({
    initialValues: {
      id: news?.id ?? "",
      title: news?.title ?? "",
      slug: news?.slug ?? "",
      tags: news?.Tags?.map((item) => item.id)?.join(",") ?? "",
      content: news?.content ?? "",
      coverImage: news?.coverImage ?? "",
      status: "",
      images: Array.from({ length: 4 }).fill(undefined),
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      formData.append("slug", values.slug);
      formData.append("tags", values.tags);
      formData.append("coverImage", values.coverImage);
      formData.append("status", values.submitType);
      values.images?.forEach((file, index) => {
        if (file) {
          formData.append(`images`, file, `image_${index + 1}.png`);
        }
      });
      values.images?.forEach((file, index) => {
        if (file) {
          formData.append(`images`, file, `image_${index + 1}.png`);
        }
      });
      try {
        let response;
        if (id) {
          response = await dispatch(updateBlog({ id, data: formData }));
          if (response?.payload?.success) {
            navigate("/admin/blog");
            showSuccessMessage(response?.payload?.message);
          } else {
            showErrorMessage(response?.error?.message);
          }
        } else {
          response = await dispatch(addBlog(formData));
          if (response?.payload?.success) {
            showSuccessMessage(response?.payload?.message);
            setCoverPreviews("");
            setImagePreviews(Array(4).fill(null));
            setSelectionTags([]);
            resetForm();
            navigate("/admin/blog");
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

  const handleCoverImage = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCoverPreviews(reader.result);
          formik.setFieldValue(`coverImage`, file);
        };
        reader.readAsDataURL(file);
      }
    } else {
      showErrorMessage("Invalid file format");
    }
  };
  const handleImageChange = (event, index) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(imagePreviews);
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
  const getNewsDetails = async () => {
    const news = await dispatch(getNews(id));
    let getAllValues = news?.payload;
    if (getAllValues?.success) {
      if (!Object.isExtensible(getAllValues)) {
        getAllValues = { ...getAllValues };
      }

      getAllValues.tags = getAllValues?.Tags?.map((item) => item.id).join(",");

      formik.setValues(getAllValues);
      setCoverPreviews(news?.payload?.coverImage);
      setImagePreviews(news?.payload?.BlogMedia?.map((e) => e.url));
      setSelectionTags(news?.payload?.Tags);
    } else {
      showErrorMessage(getAllValues?.message);
    }
  };

  const onTagSelection = (items) => {
    const idsArray = items?.map((item) => item.id).join(",");
    setSelectionTags(items);
    formik.setFieldValue("tags", idsArray);
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
    if (id) {
      getNewsDetails();
      // formik.setValues("id"  , id);
    }
    dispatch(getTags());
    return () => {
      dispatch(resetNews());
    };
  }, [id]);

  useEffect(() => {
    if (news) {
      const newsDetails = news;
      formik.setValues(newsDetails);
      formik.setValues({
        ...newsDetails,
        tags: news?.Tags?.map((item) => item.id).join(","),
        coverImage: "",
      });
      setCoverPreviews(news?.coverImage);
      setSelectionTags(news?.Tags);
      setImagePreviews(news?.BlogMedia?.map((item) => item?.url));
      //////
    }
  }, [news]);

  useEffect(() => {
    dispatch(getTags());
  }, [isOpen]);

  const isDraft = news?.status === "DRAFT";

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      {isOpen && <AddTags onClose={() => setIsOpen(false)} title={"Blog"} />}
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <Button
            className="flex items-center text-button-lg gap-x-2"
            variant={"none"}
            label={"Back to Blog"}
            onClick={() => navigate("/admin/blog")}
            leftIcon={
              <span>
                <ArrowLeftIcon />{" "}
              </span>
            }
          />

          {!loading && (
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <Button
                className="flex-grow btn btn-outline-secondary text-button-md md:text-button-lg"
                variant=""
                type="button"
                label={"Cancel"}
                onClick={() => navigate("/admin/blog")}
              />
              {news !== null ? (
                <Button
                  className="flex-grow btn btn-secondary text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  onClick={() =>
                    formik.setFieldValue(
                      "submitType",
                      isDraft ? "DRAFT" : "PUBLISHED"
                    )
                  }
                  label={"Update"}
                />
              ) : (
                ""
              )}
              {(news === null || !isDraft) && (
                <Button
                  className="flex-grow btn btn-dark text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  onClick={() => formik.setFieldValue("submitType", "DRAFT")}
                  label={"Save as Draft"}
                />
              )}

              {(news === null || isDraft) && (
                <Button
                  className="flex-grow btn btn-primary text-button-md md:text-button-lg"
                  variant=""
                  type="submit"
                  onClick={() =>
                    formik.setFieldValue("submitType", "PUBLISHED")
                  }
                  label={"Publish"}
                />
              )}
            </div>
          )}
        </div>
        <div className="w-full mt-7.5">
          <div className="flex flex-col mb-6 form-group">
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

              <div className="flex items-center justify-center w-full h-full">
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
                    accept="image/*"
                    onChange={(event) => handleCoverImage(event)}
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
          <div className="grid grid-cols-1 md:gap-6 md:grid-cols-2">
            <div className="flex flex-col mb-6 form-group">
              <label htmlFor="slug" className="">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                className="w-full bg-white form-control"
                id="slug"
                placeholder="Write your slug here"
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
            <div className="flex flex-col mb-6">
              <div className="flex flex-wrap items-end gap-2 md:flex-nowrap">
                <div className="flex flex-col form-group grow">
                  <label htmlFor="slug" className="">
                    Tag
                  </label>

                  <TagSelection
                    tags={tags}
                    onTagSelection={onTagSelection}
                    selectionTags={selectionTags}
                  />
                </div>

                <Button
                  label={"Add Tag"}
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className={"h-fit w-full md:w-fit !p-3"}
                  variant={"primary"}
                />
              </div>
              {formik.touched.tags && Boolean(formik.errors.tags) && (
                <FormikValidationError
                  formikTouched={formik.touched.tags}
                  formikError={formik.errors.tags}
                />
              )}
            </div>
          </div>

          <div className="relative flex flex-col mb-6 text-area">
            <label htmlFor="content" className="">
              Content
            </label>

            <TextArea
              handleChange={handleInputChange}
              name="content"
              value={formik.values.content}
            />
            {formik.touched.content && Boolean(formik.errors.content) && (
              <FormikValidationError
                formikTouched={formik.touched.content}
                formikError={formik.errors.content}
              />
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between w-full gap-4 mt-6 mb-3">
          <h5 className="flex items-center text-button-lg gap-x-2">
            Project Images
          </h5>
          {/* <button
            className="btn btn-primary text-button-md md:text-button-lg"
            variant="primaryFull"
            type="submit"
          >
            Add Image
          </button> */}
        </div>

        <div className="flex flex-wrap gap-2 p-5 sm:gap-3 lg:gap-5 bg-neutral-200 rounded-2xl">
          {Array.from({ length: 4 })?.map((_, index) => (
            <ImageUpload
              key={index}
              imagePreviews={imagePreviews[index]}
              name={"images-" + index}
              handleImageDelete={(event) => handleImageDelete(event, index)}
              handleImageChange={(event) => handleImageChange(event, index)}
            />
          ))}
        </div>
      </form>
    </div>
  );
};
