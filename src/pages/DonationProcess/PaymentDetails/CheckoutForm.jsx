import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { getPaymentMethods } from "../../../features/paymentDetails/paymentDetailsSlice";
import {
  AlertCircle,
  ChevronDownIcon,
  CirclePlusIcon,
  MastercardIcon,
  TrashIcon,
  VisacardIcon,
} from "../../../theme/svg-icons";
import { Disclosure } from "@headlessui/react";
import { Button } from "../../../components";
import { handleBasketCheckout } from "../../../features/basket/basketSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
const appearence = {
  theme: "flat",
};

export const CheckoutForm = ({ setState, state }) => {
  const stripe = useStripe();
  const elements = useElements();
  const paymentElementOptions = { layout: "tabs", autocomplete: "off" };
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [isShowNewPayment, setShowNewPayment] = useState(true);
  const [cardSelected, setCardSelection] = useState("");

  const [paymentType, setPaymentType] = useState(true);
  const dispatch = useDispatch();

  const { list } = useSelector((state) => state.paymentDetails.paymentMethods);
  const isAnonymous = useSelector((state) => state.basketItem.isAnonymous);
  const handleDelete = (id) => {
    setConfirmModal(true);
    setDeleteId(id);
  };
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
        return_url: process.env.REACT_APP_URL + "/thank-you",
      },
    });

    setState((s) => ({
      ...s,
      error: { message: error.message, type: error.type },
      loading: false,
    }));
    // remove basket items
  };

  const handleDonationProcess = async () => {
    const response = await dispatch(handleBasketCheckout(isAnonymous));
    if (response.data.payload?.success) {
      setState((s) => ({
        ...s,
        loading: false,
        clientSecret: response.data.payload.clientSecret,
      }));
    }
    // if (
    //   !state.loading &&
    //   !state.error &&
    //   !state.clientSecret &&
    //   !location?.state?.clientSecret
    // ) {
    //   // if (!state.loading &&!state.clientSecret) {
    //   setState((s) => ({ ...s, loading: true }));
    //   api
    //     .post("/basket/checkout", { isAnonymous })
    //     .then((res) => {
    // setState((s) => ({
    //   ...s,
    //   loading: false,
    //   clientSecret: res.data.payload.clientSecret,
    // }));
    //     })
    //     .catch((error) => {
    //       if (error.response?.status === 401) {
    //         localStorage.removeItem("loggedIn");
    //         sessionStorage.removeItem("loggedIn");
    //         window.location.href = "login";
    //       } else if (error.response?.status === 400) {
    //         window.location.href = "basket";
    //       } else
    //         setState((s) => ({
    //           ...s,
    //           loading: false,
    //           error: { message: error.response?.data.message || error.message },
    //         }));
    //     });
    // } else {
    //   if (location?.state?.clientSecret) {
    //     setState((s) => ({
    //       ...s,
    //       loading: false,
    //       clientSecret: location?.state?.clientSecret,
    //     }));
    //   }
    // }
  };

  useEffect(() => {
    if (!deleteId) dispatch(getPaymentMethods());
    setState((s) => ({
      ...s,
      loading: false,
    }));
  }, [deleteId]);

  return (
    <div className="bg-neutral-200 rounded-2xl">
      <div className="flex flex-col gap-4">
        <div
          for="dropzone-file"
          className="flex flex-col items-center justify-center flex-grow p-4 border-2 border-dashed cursor-pointer rounded-2xl border-neutral-300"
        >
          <div
            className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-neutral-700"
            onClick={() => setShowNewPayment(false)}
          >
            <CirclePlusIcon iconSize={20} />
            <p className="text-center text-button-md sm:text-button-lg text-neutral-700 lg:whitespace-nowrap">
              Add payment method
            </p>
          </div>
        </div>
        {list.map((card) => (
          <Disclosure key={card.id}>
            {({ open }) => (
              <div className="p-4 transition-all transform border hover:bg-white sm:p-6 bg-neutral-200 rounded-2xl border-neutral-300 hover:border-primary-300">
                <Disclosure.Button className="flex items-center justify-between w-full gap-2">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <div className="flex items-center justify-between col-span-3 gap-2 md:gap-7 lg:col-span-6 shrink-0">
                        <div className="flex items-center gap-3 md:gap-4">
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            checked={cardSelected === card.id}
                            onClick={() => setCardSelection(card.id)}
                          />
                          <div className="shrink-0">
                            {card.brand === "mastercard" ? (
                              <MastercardIcon iconSize={46} />
                            ) : card.brand === "visa" ? (
                              <VisacardIcon iconSize={46} />
                            ) : null}
                          </div>
                          <span className="text-lg">
                            {card.brand.substring(0, 1).toUpperCase()}
                            {card.brand.substring(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-9 lg:col-span-6">
                      <div className="flex justify-end md:gap-6 lg:gap-12">
                        <div className="hidden text-lg md:block line-clamp-1">
                          Card Number:{" "}
                          <span className="text-neutral-600">
                            **** **** **** {card.last4}
                          </span>
                        </div>
                        <div
                          className={`w-6 h-6 transition-all duration-50 ease-in ${
                            open ? "rotate-180 transform " : ""
                          }`}
                        >
                          <ChevronDownIcon iconSize={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Disclosure.Button>
                <Disclosure.Panel>
                  <div className="flex flex-col justify-between transition-[height]">
                    <div className="h-px my-5 bg-neutral-300"></div>
                    <div className="grid justify-between grid-cols-1 md:grid-cols-2">
                      <ul className="flex flex-col col-span-1 gap-4 mb-5 md:mb-0">
                        <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                          <div className="col-auto md:col-span-5">
                            Card Number
                          </div>
                          <div className="justify-end col-auto text-right md:col-span-1">
                            :
                          </div>
                          <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                            **** **** **** {card.last4}
                          </div>
                        </li>
                        <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                          <div className="col-auto md:col-span-5 ">
                            Expiry Date
                          </div>
                          <div className="justify-end col-auto text-right md:col-span-1">
                            :
                          </div>
                          <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                            {(card.expMonth + "").padStart(2, "0")}/
                            {card.expYear}
                          </div>
                        </li>
                      </ul>
                      <div className="col-span-1">
                        <div className="flex items-center gap-4 justify-evenly md:justify-end">
                          {/* <Button
                    className="flex justify-center  px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 border-2 border-black md:border-transparent rounded text-button-lg"
                    variant={"none"}
                    label={"Edit"}
                    leftIcon={<Edit3Icon />}
                  /> */}

                          <Button
                            className="flex justify-center px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 text-white  border-2 md:border-0 border-black bg-black rounded md:text-black md:bg-transparent text-button-lg"
                            label={"Remove"}
                            variant={"none"}
                            leftIcon={<TrashIcon />}
                            onClick={() => handleDelete(card.id)}
                            // onClick={setDeleteId(card.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Disclosure.Panel>
              </div>
            )}
          </Disclosure>
        ))}
        <Button
          variant="primaryFull"
          label="Complete Donation"
          disabled={!cardSelected}
          onClick={handleDonationProcess}
        />
      </div>
    </div>
  );
};
