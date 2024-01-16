import { Button } from "../../../components";
import { AlertCircle } from "../../../theme/svg-icons";
import PropTypes from "prop-types";

export const PaypalPayment = ({ state, handlePaypalSubmit }) => {
  return (
    <form id="PaymentDetails" aria-label="Signup Form">
      <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
        {/* <div className="form-group">
          <label htmlFor="email" className="block">
            Email Address
          </label>
          <input
            type="text"
            className="w-full form-control"
            placeholder="Email Address"
          />
        </div> */}
      </div>
      <Button
        variant="primaryFull"
        label="Pay now"
        type="button"
        onClick={handlePaypalSubmit}
      />
      {state.error && state.error?.type !== "validation_error" && (
        <div className="flex items-start w-full gap-2 mt-2 text-sm text-red-300">
          <AlertCircle />
          <span className="break-words">{state.error.message}</span>
        </div>
      )}
    </form>
  );
};

PaypalPayment.propTypes = {
  state: PropTypes.object.isRequired,
  handlePaypalSubmit: PropTypes.func.isRequired,
};

export default PaypalPayment;
