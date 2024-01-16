import { Link } from "react-router-dom";
import {
  CalendarIcon,
  CloseIcon,
  CreditCardIcon,
} from "../../../theme/svg-icons";
import { useFormik } from "formik";

export const AddPaymentMethodModal = ({onClose}) => {
    const formik = useFormik({
        initialValues: {
         id:''
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
                        <CloseIcon iconSize={24} onClick={onClose}/>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="flex flex-col mb-5 form-group">
                        <label htmlFor="OtherAmount">Full Name</label>
                        <input
                          type="text"
                          className="w-full form-control"
                          id="OtherAmount"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="flex flex-col mb-5 form-group">
                        <label htmlFor="OtherAmount">Card Number</label>
                        <div className="relative w-full form-group">
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                            <Link to="#" aria-label="View Password">
                              <CreditCardIcon />
                            </Link>
                          </div>
                          <input
                            type="text"
                            className="w-full form-control"
                            id="password"
                            placeholder="Card Number"
                          />
                        </div>
                      </div>
                      <div className="grid justify-between grid-cols-2 gap-5">
                        <div className="flex flex-col grid-cols-1 form-group">
                          <label htmlFor="OtherAmount">Expire Date</label>
                          <div className="relative w-full mb-5 form-group">
                            <label htmlFor="password" className="sr-only">
                              Password
                            </label>
                            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                              <Link to="#" aria-label="View Password">
                                <CalendarIcon />
                              </Link>
                            </div>
                            <input
                              type="text"
                              className="w-full form-control"
                              id="password"
                              placeholder="MM/YYYY"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col grid-cols-1 form-group">
                          <label htmlFor="OtherAmount">CVV</label>
                          <input
                            type="text"
                            className="w-full form-control"
                            id="OtherAmount"
                            placeholder="CVV"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-5">
                        <div className="flex flex-col col-span-1 form-group shrink-0">
                          <label htmlFor="OtherAmount">Select City</label>
                          <select
                            className="w-full text-sm !text-neutral-800 form-control"
                            id="SelectProject"
                          >
                            <option value="">Select City</option>
                          </select>
                        </div>
                        <div className="flex flex-col col-span-1 form-group shrink-0">
                          <label htmlFor="OtherAmount">State</label>
                          <select
                            className="w-full text-sm !text-neutral-800 form-control"
                            id="SelectProject"
                          >
                            <option value="">Select State</option>
                          </select>
                        </div>
                        <div className="flex flex-col col-span-1 form-group shrink-0">
                          <label htmlFor="OtherAmount">Zip Code</label>
                          <input
                            type="text"
                            className="w-full form-control"
                            id="OtherAmount"
                            placeholder="Zip Code"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary filled">
                        Add Card
                      </button>
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
