import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePaymentMethod, getPaymentMethods } from "./paymentDetailsSlice";
import { Disclosure } from "@headlessui/react";
import {
  ChevronDownIcon,
  CirclePlusIcon,
  CloseIcon,
  Edit3Icon,
  MastercardIcon,
  PlusIcon,
  TrashIcon,
  VisacardIcon,
} from "../../theme/svg-icons";
import Loader from "../../components/Loader";
import { Button } from "../../components";
import { SnackMessages } from "../../components/Toast";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

export default function PaymentMethodsList() {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const { list, loading, error } = useSelector(
    (state) => state.paymentDetails.paymentMethods,
  );

  const handleDelete = (id) => {
    setConfirmModal(true);
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    const response = await dispatch(deletePaymentMethod(deleteId));
    if (response?.payload?.success) {
      showSuccessMessage(response?.payload?.message);
    } else {
      showErrorMessage(response?.message);
    }
    setConfirmModal(false);
    setDeleteId("");
  };
  useEffect(() => {
    if (!deleteId) dispatch(getPaymentMethods());
  }, [deleteId]);

  return loading ? (
    <Loader />
  ) : list.length ? (
    <div className="flex flex-col w-full mb-6 sm:mb-10">
      <div className="flex flex-col mb-6">
        <label htmlFor="Name" className="mb-4 sm:mb-6 !text-button-md">
          Select Payment Method
        </label>
        <div className="flex items-center gap-6 mb-5 sm:mb-6">
          <div className="flex gap-2">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name=""
              className="rounded-full"
            />
            <label
              for="default-radio-1"
              className="text-button-md text-neutral-800"
            >
              Card
            </label>
          </div>
          <div className="flex gap-2">
            <input
              id="default-radio-1"
              type="radio"
              value=""
              name=""
              className="rounded-full"
            />
            <label
              for="default-radio-2"
              className="text-button-md text-neutral-800"
            >
              Paypal
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 mb-6">
        <div
          for="dropzone-file"
          className="flex flex-col items-center justify-center flex-grow p-4 border-2 border-dashed cursor-pointer rounded-2xl border-neutral-300"
        >
          <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 text-neutral-700">
            <CirclePlusIcon iconSize={20} />
            <p className="text-center text-button-md sm:text-button-lg text-neutral-700 lg:whitespace-nowrap">
              Add payment method
            </p>
          </div>
          <input id="dropzone-file" type="file" className="hidden" />
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
                          <input type="checkbox" name="" id="" />
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
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-7.5">
            <input type="checkbox" id="rememberMe" value="" />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium text-neutral-600"
            >
              Save payments for future payments
            </label>
          </div>
        </div>
      </div>
      <Button
        className={"btn btn-primary w-full"}
        label={"Complete Donation"}
      />

      {/* PAYPAL DETAILS */}
      <div>
        <div className="grid grid-cols-1 mb-6 sm:grid-cols-2">
          <div className="form-group">
            <label htmlFor="email" className="block">
              Email Address
            </label>
            <input
              type="text"
              className="w-full form-control"
              placeholder="Email Address"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-7.5">
            <input type="checkbox" id="rememberMe" value="" />
            <label
              htmlFor="rememberMe"
              className="text-sm font-medium text-neutral-600"
            >
              Save payments for future payments
            </label>
          </div>
        </div>
      </div>
      <Button
        className={"btn btn-primary w-full"}
        label={"Complete Donation"}
      />
      {/* ============== */}

      {confirmModal && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
              <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
                <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-t rounded-bl-none rounded-br-none rounded-tl-3xl rounded-tr-3xl sm:rounded-3xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-7.5 py-10">
                    <div className="flex-col sm:flex">
                      <div className="flex justify-between">
                        <div className="mb-2 font-bold heading-7">Confirm?</div>
                        <div className="cursor-pointer">
                          <CloseIcon onClick={() => setConfirmModal(false)} />
                        </div>
                      </div>
                      <div className="mb-7.5 text-neutral-600 sm:mb-10">
                        Are you sure you want to remove this Payment Details?
                      </div>
                      <div className="flex gap-5">
                        <Button
                          onClick={() => setConfirmModal(false)}
                          variant={"neutralFull"}
                          label="No, Keep it"
                        ></Button>
                        <Button
                          onClick={confirmDelete}
                          variant={"primaryFull"}
                          label="Yes, Delete"
                        ></Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    ""
  );
}
