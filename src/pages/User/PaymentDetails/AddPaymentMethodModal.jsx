import { Link } from "react-router-dom";
import {
  CalendarIcon,
  CloseIcon,
  CreditCardIcon,
} from "../../../theme/svg-icons";
import { useFormik } from "formik";

export const AddPaymentMethodModal = ({ onClose }) => {
  const formik = useFormik({
    initialValues: {
      id: "",
    },
    enableReinitialize: true,
  });
  return (
    <div
      className="relative z-10 "
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-t-3xl sm:rounded-3xl sm:max-w-modal">
                <div className="bg-white py-7.5 px-4 sm:px-7.5 sm:py-10">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                        Add Payment Method
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onClose} />
                      </button>
                    </div>
                    <div className="">
                      <div className="flex flex-col form-group mb-10">
                        <label htmlFor="OtherAmount">
                          To add a new payment method, please add a new card
                          when making a donation. Once your donation has been
                          accepted, your payment method used will be saved.
                        </label>
                      </div>
                      <div onClick={onClose}>
                        <button className="btn btn-primary filled">
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
