import React, { useEffect } from "react";
import { CloseIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { SnackMessages } from "../../../components/Toast";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { Dropdown } from "../../../components/Dropdown";
import { getQucikDonation } from "../../../features/quickDonation/quickDonationSlice";
import { updateFeaturedCampaign } from "../../../features/adminHomeContent/adminHomeContentSlice";

export const UpdateFeatureCampaign = ({ onClose, data }) => {
  const { showSuccessMessage, showErrorMessage } = SnackMessages();

  const validationSchema = yup.object({
    featuredCampaignOne: yup
      .string()
      .required("Featured Campaign One is required"),
    featuredCampaignTwo: yup
      .string()
      .required("Featured Campaign Two is required"),
    featuredCampaignThree: yup
      .string()
      .required("Featured Campaign Three is required"),
    featuredCampaignFour: yup
      .string()
      .required("Featured Campaign Four is required"),
  });
  const dispatch = useDispatch();
  const { quickdonations } = useSelector((state) => state.quickDonations);
  const campaignsOptions = quickdonations?.map((e) => ({
    label: e.name,
    value: e.id,
  }));

  const formik = useFormik({
    initialValues: {
      featuredCampaignOne: "",
      featuredCampaignTwo: "",
      featuredCampaignThree: "",
      featuredCampaignFour: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await dispatch(updateFeaturedCampaign(formik.values));
        if (response?.payload?.success) {
          showSuccessMessage(response?.payload?.message);
        } else {
          showErrorMessage(response?.payload?.message);
        }
      } catch (error) {}
      onClose()
    },
  });
  const handleFilterChange = (name, value) => {
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    dispatch(getQucikDonation());
  }, []);

  useEffect(() => {
    const fieldNames = [
      "featuredCampaignOne",
      "featuredCampaignTwo",
      "featuredCampaignThree",
      "featuredCampaignFour",
    ];
    if (data) {
      fieldNames.forEach((fieldName) => {
        formik.setFieldValue(fieldName, data[fieldName]);
      });
    }
  }, [data]);

  return (
    <>
      <div className="fixed inset-0 z-30 transition-opacity bg-gray-500 bg-opacity-75">
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
            <div className="relative z-30 w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
              <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-7.5 bg-white rounded-t-3xl sm:rounded-3xl">
                <div className="flex flex-col flex-grow gap-4 w-100 sm:gap-8">
                  <div className="flex justify-between">
                    <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                      Feature Campaigns
                    </div>
                    <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                      <CloseIcon iconSize={24} onClick={onClose} />
                    </button>
                  </div>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-col gap-4 sm:gap-5 max-h-[calc(100vh-20rem)] overflow-auto pr-2">
                      <div className="grid grid-cols-1 gap-5">
                        <div className="form-group">
                          <label htmlFor="tag name" className="block">
                            Feature Campaign 01
                          </label>
                          <Dropdown
                            // className="w-full text-sm !text-neutral-800 form-control"
                            value={formik.values.featuredCampaignOne}
                            onChange={(e) =>
                              handleFilterChange(e.name, e.value)
                            }
                            options={campaignsOptions}
                            name={"featuredCampaignOne"}
                            className={'!w-full'}
                          />

                          {formik.touched.featuredCampaignOne &&
                            Boolean(formik.errors.featuredCampaignOne) && (
                              <FormikValidationError
                                formikTouched={
                                  formik.touched.featuredCampaignOne
                                }
                                formikError={formik.errors.featuredCampaignOne}
                              />
                            )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tag name" className="block">
                            Feature Campaign 02
                          </label>
                          <Dropdown
                            // className="w-full text-sm !text-neutral-800 form-control"
                            value={formik.values.featuredCampaignTwo}
                            onChange={(e) =>
                              handleFilterChange(e.name, e.value)
                            }
                            options={campaignsOptions}
                            name={"featuredCampaignTwo"}
                            className={'!w-full'}
                          />
                          {formik.touched.featuredCampaignTwo &&
                            Boolean(formik.errors.featuredCampaignTwo) && (
                              <FormikValidationError
                                formikTouched={
                                  formik.touched.featuredCampaignTwo
                                }
                                formikError={formik.errors.featuredCampaignTwo}
                              />
                            )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tag name" className="block">
                            Feature Campaign 03
                          </label>
                          <Dropdown
                            // className="w-full text-sm !text-neutral-800 form-control"
                            value={formik.values.featuredCampaignThree}
                            onChange={(e) =>
                              handleFilterChange(e.name, e.value)
                            }
                            options={campaignsOptions}
                            name={"featuredCampaignThree"}
                            className={'!w-full'}
                          />
                          {formik.touched.featuredCampaignThree &&
                            Boolean(formik.errors.featuredCampaignThree) && (
                              <FormikValidationError
                                formikTouched={
                                  formik.touched.featuredCampaignThree
                                }
                                formikError={
                                  formik.errors.featuredCampaignThree
                                }
                              />
                            )}
                        </div>
                        <div className="form-group">
                          <label htmlFor="tag name" className="block">
                            Feature Campaign 04
                          </label>
                          <Dropdown
                            // className="w-full text-sm !text-neutral-800 form-control"
                            value={formik.values.featuredCampaignFour}
                            onChange={(e) =>
                              handleFilterChange(e.name, e.value)
                            }
                            options={campaignsOptions}
                            name={"featuredCampaignFour"}
                            className={'!w-full'}
                          />
                          {formik.touched.featuredCampaignFour &&
                            Boolean(formik.errors.featuredCampaignFour) && (
                              <FormikValidationError
                                formikTouched={
                                  formik.touched.featuredCampaignFour
                                }
                                formikError={formik.errors.featuredCampaignFour}
                              />
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between gap-4 sm:gap-5">
                      <Button
                        variant={"secondaryOutline"}
                        className="flex-grow"
                        label={"Cancel"}
                      />
                      <Button
                        variant={"primary"}
                        className="flex-grow"
                        label={"Update"}
                      />
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
export default UpdateFeatureCampaign;
