import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Button } from "../../../components";
import {
  ChevronDownIcon,
  CloseIcon,
  MastercardIcon,
  TrashIcon,
  VisacardIcon,
} from "../../../theme/svg-icons";
import { SnackMessages } from "../../../components/Toast";
import { deletePaymentMethod } from "../../../features/paymentDetails/paymentDetailsSlice";

import { Disclosure } from "@headlessui/react";

export const PaymentMethodItem = ({ card ,handleDelete}) => {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // const handleDelete = (id) => {
  //   setConfirmModal(true);
  //   setDeleteId(id);
  // };

  

  return (
    <>
      <Disclosure key={card.id}>
        {({ open }) => (
          <div className="p-4 transition-all transform border hover:bg-white sm:p-6 bg-neutral-200 rounded-2xl border-neutral-300 hover:border-primary-300">
            <Disclosure.Button className="flex items-center justify-between w-full gap-2">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <div className="flex items-center justify-between col-span-3 gap-2 md:gap-7 lg:col-span-6 shrink-0">
                    <div className="flex items-center gap-3 md:gap-4">
                      {/* <input type="checkbox" name="" id="" /> */}
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
                      <div className="col-auto md:col-span-5">Card Number</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        **** **** **** {card.last4}
                      </div>
                    </li>
                    <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5 ">Expiry Date</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        {(card.expMonth + "").padStart(2, "0")}/{card.expYear}
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    
    </>
  );
};
