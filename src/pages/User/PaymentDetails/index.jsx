import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { useSelector, useDispatch } from "react-redux";

import {
  ChevronDownIcon,
  CloseIcon,
  EyeIcon,
  GlobeIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  UserIcon,
} from "../../../theme/svg-icons";
import { PaymentMethodItem } from "./PaymentMethodItem";
import { getPaymentMethods } from "../../../features/paymentDetails/paymentDetailsSlice";
import { SnackMessages } from "../../../components/Toast";
import { deletePaymentMethod } from "../../../features/paymentDetails/paymentDetailsSlice";
import { UserSidebar } from "../Common/UserSidebar";
import PaymentMethodsList from "../../../features/paymentDetails/PaymentMethodsList";
import PaymentList from "../../../features/paymentDetails/PaymentList";
import PageHead from "../../../components/PageHead";
import { AddPaymentMethodModal } from "./AddPaymentMethodModal";
const { showSuccessMessage, showErrorMessage } = SnackMessages();

export const PaymentDetailsComponent = () => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const { list } = useSelector((state) => state.paymentDetails.paymentMethods);
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

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
    dispatch(getPaymentMethods());
  }, [deleteId]);
  return (
    <div>
      <PageHead title={"Payment details"} />
      <section className="py-7.5 md:py-15">
        <div className="container">
          <div className="flex gap-[60px]">
            <div className="w-[238px] shrink-0 hidden md:block">
              <UserSidebar />
            </div>
            <div className="w-full">
              <div className="md:border border-neutral-300 md:px-10 md:py-7.5 rounded-1.5xl">
                {/* <div className="border-b mb-5 md:mb-7.5 border-b-neutral-300">
                                    <h1 className="text-heading-6 md:text-heading-5 pb-3.5">My Donations</h1>
                                </div> */}
                <div className="border-b mb-5 md:mb-7.5 border-b-neutral-300 flex justify-between items-center pb-3.5">
                  <h1 className="text-heading-6 md:text-heading-5">
                    Payment Details
                  </h1>
                  <div className="hidden sm:block">
                    <Button
                      label={"Add Payment Method"}
                      onClick={() => setModalVisible(true)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mb-6">
                  {list.length ? (
                    list.map((card) => (
                      <PaymentMethodItem
                        card={card}
                        handleDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <div className="text-neutral-600 text-md font-medium my-7.5 text-start">
                      There are currently no payment details available
                    </div>
                  )}
                </div>
                {/* <PaymentMethodsList /> */}
                <div className="flex justify-center mt-5 sm:hidden">
                  {/* <Button value={"Add payment method"} /> */}
                  {/*<button className="w-full btn btn-primary sm:w-auto">Add Payment Method</button>*/}
                </div>
                <PaymentList />
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalVisible && <AddPaymentMethodModal onClose={()=>setModalVisible(false)}/>}
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
  );
};
