import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit3Icon } from "../../../theme/svg-icons";
import Button from "../../../components/Button";
import { DonationTotal } from "../Common/DonationTotal";
import { StepperConfirm } from "../Common/Stepper/StepperConfirm";
import { useSelector, useDispatch } from "react-redux";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AlertCircle } from "../../../theme/svg-icons";
import CardList from "./CardList";
import { PaypalPayment } from "./PaypalPayment";
import {
  handleBasketCheckout,
  handlePaypalCheckout,
} from "../../../features/basket/basketSlice";
import { SnackMessages } from "../../../components/Toast";
import { getProfile } from "../../../features/authentication/authenticationSlice";
import { updateCheckoutProfile } from "../../../features/paymentDetails/paymentDetailsSlice";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
const appearence = {
  theme: "flat",
};
const CheckoutPaymentComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
	const userData = useSelector(state => state.profile.auth)
  const role = userData?.role;
  const { showErrorMessage } = SnackMessages();
  const [paymentType, setPaymentType] = useState(false);
  const [bankDetails, setBankDetails] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = useSelector((state) => state.profile.user);
  const { basketItems } = useSelector((state) => state.basketItem);
  const recurringItems = basketItems.filter((item) => item.isRecurring);

  const [state, setState] = useState({
    loading: false,
    error: null,
    clientSecret: null,
  });
  const [isShowNewPayment, setShowNewPayment] = useState(true);
  const navigate = useNavigate();
  const isAnonymous = useSelector((state) => state.basketItem.isAnonymous);

  const handleAddCard = async () => {
    if (!userProfile?.email || userProfile.role === "ADMIN") {
      if (location?.state?.clientSecret) {
        setState((s) => ({
          ...s,
          loading: false,
          clientSecret: location?.state?.clientSecret,
        }));
        setShowNewPayment(false);
      }
    } else {
      const response = await dispatch(handleBasketCheckout({ isAnonymous }));
      if (response?.payload?.success) {
        setState((s) => ({
          ...s,
          loading: false,
          status: response.payload?.payload?.status,
          clientSecret: response.payload?.payload?.clientSecret,
        }));
        setShowNewPayment(false);
      } else {
        showErrorMessage(response?.payload?.message || "Something went wrong!");
      }
    }
  };
  const handleDonationProcess = async (cardSelected) => {
    setState((s) => ({ ...s, loading: true }));
    const response = await dispatch(
      handleBasketCheckout({
        isAnonymous: isAnonymous,
        paymentMethodId: cardSelected,
      })
    );
    if (response?.payload?.success) {
      if (response?.payload?.payload.status === "succeeded") {
        window.location.href = "/thank-you";
      } else {
        setState((s) => ({
          ...s,
          clientSecret: response.payload.payload.clientSecret,
          status: response.payload.payload.status,
        }));
      }
    } else {
      showErrorMessage(response?.error?.message);
    }

   
  };

  const handlePaypalSubmit = async () => {
    setIsLoading(true);
    if (role === "USER") {
      const response = await dispatch(
        handlePaypalCheckout({
          isAnonymous: isAnonymous,
        })
      );
      if (response?.payload?.success && !response.payload.payload?.error) {
        setIsLoading(false);
        window.location.href = response?.payload?.payload?.approvalUrl;
      } else {
        setIsLoading(false);
        if (response.payload.payload?.error)
          showErrorMessage("Something went wrong");
        else
          showErrorMessage(
            response?.payload?.message || "Something went wrong"
          );
      }
    } else {
      const checkoutData = location?.state;
      const resp = await dispatch(
        updateCheckoutProfile({
          ...checkoutData,
          paymentGateway: "paypal",
          isAnonymous: true,
        })
      );
      if (resp?.payload?.success && !resp.payload.payload?.error) {
        setIsLoading(false);
        window.location.href = resp?.payload?.payload?.approvalUrl;
      } else {
        setIsLoading(false);
        if (resp.payload.payload?.error)
          showErrorMessage("Something went wrong");
        else showErrorMessage(resp?.payload?.message || "Something went wrong");
      }
    }
  };
  useEffect(() => {
    if (role === "USER") {
      dispatch(getProfile());
    }
  }, []);

 

  return (
    <>
      <div>
        {/* Updates */}
        <div className="py-7.5 md:py-15">
          <section>
            <div className="container">
              <div className="mb-5 md:mb-15">
                <StepperConfirm />
              </div>
              <div className="grid-cols-1 gap-10 md:grid md:grid-cols-12">
                <div className="mb-5 sm:mb-10 md:col-span-8 md:mb-0">
                  <div className="px-4 py-5 sm:p-10 form-group bg-neutral-200 rounded-2.5xl mb-5 sm:mb-10">
                    <div className="flex items-center justify-between">
                      <h1 className="text-heading-6 sm:text-heading-5">
                        Personal Information
                      </h1>
                      <Button
                        className="block sm:hidden text-primary-300"
                        onClick={() => navigate("/checkout")}
                        leftIcon={<Edit3Icon iconSize={24} />}
                        variant={"none"}
                      />
                      <Button
                        className="hidden sm:block text-primary-300"
                        onClick={() => navigate("/checkout")}
                        leftIcon={<Edit3Icon iconSize={34} />}
                        variant={"none"}
                      />
                    </div>
                  </div>
                  <div className="px-4 py-5 sm:p-10 bg-neutral-200 rounded-2xl">
                    <h2 className="mb-5 text-heading-6 sm:text-heading-5">
                      Payment Details
                    </h2>

                    <p className="mb-6 text-button-md">Select Payment Method</p>

                    <div className="flex items-center gap-6 mb-5 sm:mb-6 flex-row-reverse justify-end">
                      <div className="flex gap-2">
                        <input
                          id="default-radio-1"
                          type="radio"
                          value=""
                          name="paymentType"
                          className="rounded-full"
                          onClick={() => {
                            setPaymentType(true);
                            setBankDetails(false);
                          }}
                          checked={paymentType}
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="text-button-md text-neutral-800"
                        >
                          Card
                        </label>
                      </div>
                      {!recurringItems?.length ||
                      (basketItems?.length === 1 &&
                        basketItems[0]?.Campaign?.isRamadanCampaign ==
                          false) ? (
                        <div className="flex gap-2">
                          <input
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="paymentType"
                            className="rounded-full"
                            onClick={() => {
                              setBankDetails(false);
                              setPaymentType(false);
                            }}
                            checked={!paymentType && !bankDetails}
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="text-button-md text-neutral-800"
                          >
                            Paypal
                          </label>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="flex gap-2">
                        <input
                          id="default-radio-3"
                          type="radio"
                          value=""
                          name="bankDetails"
                          className="rounded-full"
                          onClick={() => {
                            setPaymentType(false);
                            setBankDetails(true);
                          }}
                          checked={bankDetails}
                        />
                        <label
                          htmlFor="default-radio-3"
                          className="text-button-md text-neutral-800"
                        >
                          Bank Transfer
                        </label>
                      </div>
                    </div>
                    {paymentType && !bankDetails ? (
                      <>
                        {state.clientSecret ? (
                          <Elements
                            options={{
                              clientSecret: state.clientSecret,
                              appearence,
                            }}
                            stripe={stripePromise}
                          >
                            <CheckoutForm setState={setState} state={state} />
                          </Elements>
                        ) : isShowNewPayment ? (
                          <CardList
                            handleAddCard={handleAddCard}
                            loading={state.loading}
                            handleDonationProcess={handleDonationProcess}
                          />
                        ) : state.loading ? (
                          "Loading..."
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      <>
                        {!paymentType && !bankDetails ? (
                          <PaypalPayment
                            state={state}
                            isLoading={isLoading}
                            handlePaypalSubmit={handlePaypalSubmit}
                          />
                        ) : (
                          <>
                            <label htmlFor="LastName" className="">
                              For direct bank transfers to avoid transaction
                              fees, please send your donation to the following
                              account:
                            </label>
                            <div className="mt-5">
                              <table className="border-collapse border border-neutral-300">
                                <tbody>
                                  <tr>
                                    <td className="text-heading-7 border border-neutral-300 p-2">
                                      Bank Name:
                                    </td>
                                    <td className="border border-neutral-300 p-2">
                                      St George Bank
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-heading-7 border border-neutral-300 p-2">
                                      Account Name:
                                    </td>
                                    <td className="border border-neutral-300 p-2">
                                      Al-Ihsan Foundation
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-heading-7 border border-neutral-300 p-2">
                                      BSB:
                                    </td>
                                    <td className="border border-neutral-300 p-2">
                                      112 879
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-heading-7 border border-neutral-300 p-2">
                                      Account Number:
                                    </td>
                                    <td className="border border-neutral-300 p-2">
                                      425 989 660
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="text-heading-7 border border-neutral-300 p-2">
                                      Reference:
                                    </td>
                                    <td className="border border-neutral-300 p-2">
                                      Site Donation
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4">
                              <Button
                                variant={"primaryFull"}
                                label={"Return Home"}
                              />
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="md:col-span-4">
                  <DonationTotal />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

function CheckoutForm({ setState, state }) {
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions = { layout: "tabs", autocomplete: "off" };

  useEffect(() => {
    if (!stripe) return;

    if (!state.status && !state.error) {
      stripe.retrievePaymentIntent(state.clientSecret).then((res) => {
        if (res.error) {
          console.error(res.error);
          setState((s) => ({ ...s, loading: false, error: res.error }));
        } else {
          setState((s) => ({ ...s, status: res.paymentIntent.status }));
        }
      });
    } else if (!state.showElements) {
      switch (state.status) {
        case "requires_payment_method":
          setState((s) => ({ ...s, loading: false, showElements: true }));
          break;
        case "requires_action":
          setState((s) => (s.loading ? s : { ...s, loading: true }));
          stripe.handleNextAction({ clientSecret: state.clientSecret });
          break;
        default:
          const e = new Error("Unknown payment intent status: " + state.status);
          e.status = state.status;
          throw e;
      }
    }
  }, [state, stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setState((s) => ({ ...s, loading: true }));

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: import.meta.env.VITE_APP_URL + "/thank-you",
      },
    });

    setState((s) => ({
      ...s,
      error: { message: error.message, type: error.type },
      loading: false,
    }));
    // remove basket items
  };
  return (
    <form id="PaymentDetails" aria-label="Signup Form" onSubmit={handleSubmit}>
      {state.showElements && (
        <>
          <PaymentElement
            id="payment-element"
            options={paymentElementOptions}
            onChange={() =>
              setState((s) => ({
                ...s,
                loading: false,
                error: null,
              }))
            }
          />
        </>
      )}
      <Button
        variant="primaryFull"
        type="submit"
        label="Complete Donation"
        disabled={
          state.error || state.loading || !stripe || !state.showElements
        }
      />
      {state.error && state.error?.type !== "validation_error" && (
        <div className="flex items-start w-full gap-2 mt-2 text-sm text-red-300">
          <AlertCircle />
          <span className="break-words">
            {state.error.message || "Something went wrong"}
          </span>
        </div>
      )}
    </form>
  );
}

export default React.memo(CheckoutPaymentComponent);
