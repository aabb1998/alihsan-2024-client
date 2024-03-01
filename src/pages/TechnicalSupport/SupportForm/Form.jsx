import ReCAPTCHA from "react-google-recaptcha";
import { Dropdown } from "../../../components/Dropdown";
import ImageUpload from "../../../components/ImageUpload";
import { PhoneField } from "../../../components/PhoneField";
import TextArea from "../../../components/TextArea";
import { FormikValidationError } from "../../../features/Common/FormikValidationError";
import { Button } from "../../../components";
import { technicalRequirements } from "../../../utils/constants";

export const Form = ({
    formik,
    handlePhoneChange,
    handleRequirementChange,
    imagePreviews,
    handleImageDelete,
    handleImageChange,
    getCroppedImage,
    captchaRef,
  }) => {
    return (
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
            {formik.touched.requirement && Boolean(formik.errors.requirement) && (
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
                    handleImageDelete={(event) => handleImageDelete(event, index)}
                    handleImageChange={(event) => handleImageChange(event, index)}
                    getCroppedImage={(e) => getCroppedImage(e, index)}
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
          <div className="mb-4">
            <ReCAPTCHA
              sitekey={import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY}
              ref={captchaRef}
            />
          </div>
        </div>
  
        <Button
          variant="primaryFull"
          type="submit"
          label="Submit"
          disabled={formik.isSubmitting}
        />
      </form>
    );
  };
  