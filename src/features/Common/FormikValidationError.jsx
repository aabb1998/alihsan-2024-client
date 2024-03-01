import React from "react";
import propTypes from "prop-types";
import { AlertCircle } from "../../theme/svg-icons";

export const FormikValidationError = (props) => {
  const { formikTouched, formikError } = props;

  return (
    <div className="flex items-start w-full gap-2 mt-2 text-sm text-red-300">
      <AlertCircle />
      <span className="break-words">{formikTouched && formikError}</span>
    </div>
  );
};

{
  /* Validation - invalid */
}
{
  /* <div className="flex items-center gap-2 mt-2 text-sm text-red-300 break-all">
<AlertCircle />
Email address is invalid
</div> */
}
{
  /* Validation - warning */
}
{
  /* <div className="flex items-center gap-2 mt-2 text-sm text-yellow-300 break-all">
<AlertCircle />
Email address is invalid
</div> */
}
{
  /* Validation - success */
}
{
  /* <div className="flex items-center gap-2 mt-2 text-sm text-green-300 break-all">
<AlertCircle />
Email address is invalid
</div> */
}

FormikValidationError.propTypes = {
  formikTouched: propTypes.string,
  formikError: propTypes.string,
};

FormikValidationError.defaultProps = {
  formikTouched: null,
  formikError: null,
};
