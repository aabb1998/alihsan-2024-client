import React from "react";
import Button from "../../../../components/Button";
import {
  CalendarIcon,
  ChevronDownIcon,
  CloseIcon,
  CreditCardIcon,
  DownloadIcon,
  Edit3Icon,
  MastercardIcon,
  MoreVerticalIcon,
  TrashIcon,
  VisacardIcon,
} from "../../../../theme/svg-icons";
import { UserSidebar } from "../../Common/UserSidebar";

import { Disclosure } from "@headlessui/react";
import { Pagination } from "../../../Include/pagination";
import { AddPaymentMethodModal } from "../AddPaymentMethodModal";

export const PaymentDetailsListingComponent = () => {
  // Generate an array of 10 elements to represent 10 rows
  const rows = Array.from({ length: 6 }, (_, index) => (
    <tr key={index}>
      <td className="p-4 text-center border-b border-neutral-300">
        <input type="checkbox" name="" id="" />
      </td>
      <td className="p-4 border-b border-neutral-300 ">
        <div className="max-w-[340px] line-clamp-1">
          Project name goes here Project name goes here Project name goes here
        </div>
      </td>
      <td className="hidden p-4 border-b border-neutral-300 sm:table-cell">
        22/03/2023
      </td>
      <td className="p-4 border-b border-neutral-300">$100</td>
      <td className="hidden p-4 text-center border-b border-neutral-300 sm:table-cell">
        <a href="#" className="text-button-md text-primary-300">
          Download
        </a>
      </td>
      <td className="p-4 text-center border-b border-neutral-300 sm:hidden">
        <button className="flex mx-auto">
          <MoreVerticalIcon />
        </button>
      </td>
    </tr>
  ));

  return (
    <div>
      <section className="py-7.5 md:py-15">
        <div className="container">
          <div className="flex md:gap-10 lg:gap-15">
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
                    Payment Details -
                  </h1>
                  <div className="hidden sm:block">
                    <Button label={"Add Payment Method"} />
                  </div>
                </div>
                <div className="flex flex-col gap-10">
                  <CardList />
                </div>
                {/* <div className="flex flex-col gap-5 mb-10">
                                    <div className="grid items-center justify-start grid-cols-12 gap-5 p-6 border bg-neutral-200 rounded-2xl border-neutral-300">
                                        <div className="col-span-3 shrink-0">
                                            <div className="flex items-center gap-4">
                                                <div className="shrink-0">
                                                    <MastercardIcon iconSize={46} />
                                                </div>
                                                <span className="text-lg">Mastercard</span>
                                            </div>
                                        </div>
                                        <div className="hidden col-span-4 sm:block">
                                            <div className="text-lg">Name: <span className="text-neutral-600">Abdullah Habib</span></div>
                                        </div>
                                        <div className="col-span-5">
                                            <div className="flex justify-end gap-12">
                                                <div className="hidden text-lg sm:block">Card Number: <span className="text-neutral-600">1234  ****  ****  4567</span></div>
                                                <button>
                                                    <ChevronDownIcon />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col p-6 border bg-neutral-200 rounded-2xl border-neutral-300">
                                        <div className="grid items-center justify-start grid-cols-12 gap-5">
                                            <div className="col-span-3 shrink-0">
                                                <div className="flex items-center gap-4">
                                                    <div className="shrink-0">
                                                        <VisacardIcon iconSize={46} />
                                                    </div>
                                                    <span className="text-lg">Mastercard</span>
                                                </div>
                                            </div>
                                            <div className="col-span-4">
                                                <div className="text-lg">Name: <span className="text-neutral-600">Abdullah Habib</span></div>
                                            </div>
                                            <div className="col-span-5">
                                                <div className="flex justify-end gap-12">
                                                    <div className="text-lg">Card Number: <span className="text-neutral-600">1234  ****  ****  4567</span></div>
                                                    <button className="rotate-180">
                                                        <ChevronDownIcon />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <div className="h-px my-5 bg-neutral-300"></div>
                                            <div className="grid justify-between grid-cols-2">
                                                <ul className="flex flex-col gap-4">
                                                    <li className="grid justify-between grid-cols-12">
                                                        <div className="col-span-5 whitespace-nowrap">Account Name</div>
                                                        <div className="col-span-1">:</div>
                                                        <div className="col-span-6 text-right text-md text-neutral-600">Abdullah Habib</div>
                                                    </li>
                                                    <li className="grid justify-between grid-cols-12">
                                                        <div className="col-span-5">Card Number</div>
                                                        <div className="col-span-1">:</div>
                                                        <div className="col-span-6 text-right text-md text-neutral-600">1234  5545  2456  4567</div>
                                                    </li>
                                                    <li className="grid justify-between grid-cols-12">
                                                        <div className="col-span-5 ">Expiry Date</div>
                                                        <div className="col-span-1">:</div>
                                                        <div className="col-span-6 text-right text-md text-neutral-600">12/2023</div>
                                                    </li>
                                                </ul>
                                                <div className="col-span-1">
                                                    <div className="flex items-center justify-end gap-4">
                                                        <button className="flex gap-2 text-button-lg"><Edit3Icon /> Edit</button>
                                                        <button className="flex gap-2 text-button-lg"><TrashIcon /> Remove</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                <div className="block mb-10 sm:hidden">
                  <div className="w-full btn btn-primary">
                    Add Payment Method
                  </div>
                </div>
                <div className="border-b mb-5 md:mb-7.5 border-b-neutral-300 flex flex-wrap sm:flex-nowrap  justify-between items-center pb-3.5">
                  <h1 className="mb-3 text-heading-6 md:text-heading-5 sm:mb-0">
                    Payment History
                  </h1>
                  <div className="flex items-center justify-between w-full sm:justify-end sm:w-auto">
                    <div className="flex sm:hidden">
                      <select
                        className="text-sm min-w-[107px] !text-neutral-800 form-control"
                        id="TableList"
                      >
                        <option value="">Monthly</option>
                        <option value="">Weekly</option>
                        <option value="">Today</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-accent-100 rounded-lg  gap-3.5 hidden sm:flex">
                        <button className="px-4 !py-2 btn-tab btn-primary filled text-button-md whitespace-nowrap">
                          Monthly
                        </button>
                        <button className="px-4 !py-2 btn-tab btn-secondary-text filled text-button-md">
                          Weekly
                        </button>
                        <button className="px-4 !py-2 btn-tab btn-secondary-text filled text-button-md">
                          Today
                        </button>
                      </div>
                      <button className="!px-4 !py-1.5 sm:!px-5 btn btn-dark text-button-lg h-10">
                        Export <DownloadIcon />
                      </button>
                    </div>
                  </div>
                </div>
                <table className="w-full mb-5 table-auto">
                  <thead className="text-sm text-left bg-neutral-200">
                    <tr>
                      <th className="text-center rounded-l-md">
                        <input type="checkbox" name="" id="" />
                      </th>
                      <th className="p-4 font-medium">Project Name</th>
                      <th className="hidden p-4 font-medium sm:table-cell">
                        Date
                      </th>
                      <th className="p-4 font-medium">Amount</th>
                      <th className="hidden p-4 font-medium text-center sm:table-cell">
                        Invoice
                      </th>
                      <th className="p-4 font-medium text-center sm:hidden rounded-r-md">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Modal */}
      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-t-3xl sm:rounded-3xl sm:max-w-modal">
                <div className="bg-white py-7.5 px-4 sm:px-7.5 sm:py-10">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-md sm:text-heading-7">
                        Edit Payment Method
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} />
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
                          value={"Rizwan Ahmed"}
                        />
                      </div>
                      <div className="flex flex-col mb-5 form-group">
                        <label htmlFor="OtherAmount">Card Number</label>
                        <div className="relative w-full form-group">
                          <label htmlFor="password" className="sr-only">
                            Password
                          </label>
                          <div className="absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                            <a href="#" aria-label="View Password">
                              <CreditCardIcon />
                            </a>
                          </div>
                          <input
                            type="text"
                            className="w-full form-control"
                            id="password"
                            placeholder="Card Number"
                            value={"9548 2145 2036 7594"}
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
                              <a href="#" aria-label="View Password">
                                <CalendarIcon />
                              </a>
                            </div>
                            <input
                              type="text"
                              className="w-full form-control"
                              id="password"
                              placeholder="MM/YYYY"
                              value={"28/30"}
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
                            value={"957"}
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
                            <option value="">Brisbane</option>
                          </select>
                        </div>
                        <div className="flex flex-col col-span-1 form-group shrink-0">
                          <label htmlFor="OtherAmount">State</label>
                          <select
                            className="w-full text-sm !text-neutral-800 form-control"
                            id="SelectProject"
                          >
                            <option value="">Brisbane</option>
                          </select>
                        </div>
                        <div className="flex flex-col col-span-1 form-group shrink-0">
                          <label htmlFor="OtherAmount">Zip Code</label>
                          <input
                            type="text"
                            className="w-full form-control"
                            id="OtherAmount"
                            placeholder="Zip Code"
                            value={"4000"}
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary filled">Update</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative z-10 hidden"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full overflow-hidden text-left transition-all transform bg-white rounded-t-3xl sm:rounded-3xl sm:max-w-modal">
                <div className="bg-white py-7.5 px-4 sm:px-7.5 sm:py-10">
                  <div className="flex flex-col gap-8">
                    <div className="modal-body">
                      <a href="#" className="flex gap-3 text-neutral-1000">
                        <DownloadIcon /> Download Invoice
                      </a>
                      <div className="h-px my-3 bg-neutral-300 text-neutral-1000"></div>
                      <a href="#" className="flex gap-3">
                        <TrashIcon /> Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function CardList() {
  return (
    <div className="flex flex-col w-full gap-5 mb-5 sm:mb-10">
      <Disclosure>
        {({ open }) => (
          <div className="p-4 transition-all transform border sm:p-6 bg-neutral-200 rounded-2xl border-neutral-300 hover:border-primary-300">
            <Disclosure.Button className="grid items-center justify-start w-full grid-cols-12 gap-1">
              <div className="flex items-center justify-between col-span-3 gap-2 md:gap-7 lg:col-span-6 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="shrink-0">
                    <MastercardIcon iconSize={46} />
                  </div>
                  <span className="text-lg">Mastercard</span>
                </div>
                <div className="hidden lg:block">
                  <div className="text-lg">
                    Name:{" "}
                    <span className="text-neutral-600">Abdullah Habib</span>
                  </div>
                </div>
              </div>
              <div className="col-span-9 lg:col-span-6">
                <div className="flex justify-end md:gap-6 lg:gap-12">
                  <div className="hidden text-lg md:block line-clamp-1">
                    Card Number:{" "}
                    <span className="text-neutral-600">
                      1234 **** **** 4567
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 transition-all duration-50 ease-in ${
                      open ? "rotate-180 transform " : ""
                    }`}
                  >
                    <ChevronDownIcon iconSize={24} />
                  </span>
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="flex flex-col justify-between transition-[height]">
                <div className="h-px my-5 bg-neutral-300"></div>
                <div className="grid justify-between grid-cols-1 md:grid-cols-2">
                  <ul className="flex flex-col col-span-1 gap-4 mb-5 md:mb-0">
                    <li className="flex justify-start grid-cols-3 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5 whitespace-nowrap">
                        Account Name
                      </div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        Abdullah Habib
                      </div>
                    </li>
                    <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5">Card Number</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        1234 5545 2456 4567
                      </div>
                    </li>
                    <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5 ">Expiry Date</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        12/2023
                      </div>
                    </li>
                  </ul>
                  <div className="col-span-1">
                    <div className="flex items-center gap-4 justify-evenly md:justify-end">
                      <button className="flex justify-center  px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 border-2 border-black md:border-transparent rounded text-button-lg">
                        <Edit3Icon /> Edit
                      </button>
                      <button className="flex justify-center px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 text-white  border-2 md:border-0 border-black bg-black rounded md:text-black md:bg-transparent text-button-lg">
                        <TrashIcon /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>

      <Disclosure>
        {({ open }) => (
          <div className="p-4 transition-all transform border sm:p-6 bg-neutral-200 rounded-2xl border-neutral-300 hover:border-primary-300">
            <Disclosure.Button className="grid items-center justify-start w-full grid-cols-12 gap-1">
              <div className="flex items-center justify-between col-span-3 gap-2 md:gap-7 lg:col-span-6 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="shrink-0">
                    <VisacardIcon iconSize={46} />
                  </div>
                  <span className="text-lg">Mastercard</span>
                </div>
                <div className="hidden lg:block">
                  <div className="text-lg">
                    Name:{" "}
                    <span className="text-neutral-600">Abdullah Habib</span>
                  </div>
                </div>
              </div>
              <div className="col-span-9 lg:col-span-6">
                <div className="flex justify-end md:gap-6 lg:gap-12">
                  <div className="hidden text-lg md:block line-clamp-1">
                    Card Number:{" "}
                    <span className="text-neutral-600">
                      1234 **** **** 4567
                    </span>
                  </div>
                  <span
                    className={`w-6 h-6 transition-all duration-50 ease-in ${
                      open ? "rotate-180 transform " : ""
                    }`}
                  >
                    <ChevronDownIcon iconSize={24} />
                  </span>
                </div>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel>
              <div className="flex flex-col justify-between transition-[height]">
                <div className="h-px my-5 bg-neutral-300"></div>
                <div className="grid justify-between grid-cols-1 md:grid-cols-2">
                  <ul className="flex flex-col col-span-1 gap-4 mb-5 md:mb-0">
                    <li className="flex justify-start grid-cols-3 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5 whitespace-nowrap">
                        Account Name
                      </div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        Abdullah Habib
                      </div>
                    </li>
                    <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5">Card Number</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        1234 5545 2456 4567
                      </div>
                    </li>
                    <li className="flex justify-start grid-cols-12 gap-1 md:gap-0 md:grid md:grid-cols-12 md:justify-between">
                      <div className="col-auto md:col-span-5 ">Expiry Date</div>
                      <div className="justify-end col-auto text-right md:col-span-1">
                        :
                      </div>
                      <div className="col-auto text-right md:col-span-6 text-md text-neutral-600">
                        12/2023
                      </div>
                    </li>
                  </ul>
                  <div className="col-span-1">
                    <div className="flex items-center gap-4 justify-evenly md:justify-end">
                      <button className="flex justify-center  px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 border-2 border-black md:border-transparent rounded text-button-lg">
                        <Edit3Icon /> Edit
                      </button>
                      <button className="flex justify-center px-3 py-2.5 md:p-0 w-full md:w-auto gap-2 text-white md:border-0 border-2 border-black bg-black rounded md:text-black md:bg-transparent text-button-lg">
                        <TrashIcon /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Disclosure.Panel>
          </div>
        )}
      </Disclosure>
    </div>
  );
}
