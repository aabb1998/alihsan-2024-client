import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { Disclosure } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { submitComplaintsForm } from "./ContactUs";
import { PhoneField } from "../../components/PhoneField";
import {
  ChevronUpIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
  PostIcon,
} from "../../theme/svg-icons";
import TextArea from "../../components/TextArea";
import { Form } from "./Form";
import PageHead from "../../components/PageHead";

const ComplaintsComponent = () => {
  return (
    <div>
      <PageHead title={"Complaints"} />
      <div className="pb-10 md:py-15">
        <section className="" aria-label="Complaints">
          <div className="mb-5 banner-container md:mb-10">
            <div className="h-[160px] mb-5 overflow-hidden sm:h-64 md:h-[368px] md:mb-10 rounded-none sm:rounded-2xl md:rounded-4xl">
              <img
                src="../images/banner/complaints.png"
                alt=""
                className="object-cover w-full h-full transition duration-500 hover:scale-110"
              />
            </div>
          </div>
          <div className="container mb-5 md:mb-10">
            <h1 className="mb-3 md:mb-5 text-heading-6 md:text-heading-3">
              Complaints
            </h1>
            <p className="mb-4 text-sm font-medium md:mb-0 text-neutral-800 md:text-lg">
              A complaint expresses dissatisfaction or concern regarding the
              service or conduct of Al-Ihsan Foundation or its representatives.
              We are dedicated to delivering professional service to our
              beneficiaries, supporters, and the community. Here, you will find
              information on how to make a complaint, your options, and our
              approach to resolving them. Open and transparent communication is
              essential to fulfilling our mission and making a positive impact
              on the lives of those in need.
            </p>
          </div>

          <div className="banner-container">
            <div className="p-4 sm:p-10 mb-10 mt-10 bg-neutral-200 rounded-2.5xl">
              <div className="items-center justify-between mb-5 sm:flex">
                <h2 className="mb-2 text-heading-6 md:text-heading-3">
                  Online Complaints Form
                </h2>
                {/* {!!referenceNo && (
                  <div className="inline-block px-3 py-1.5 text-xs font-bold bg-red-300 rounded-md text-neutral-100">
                    Ref no: #{referenceNo}
                  </div>
                )} */}
              </div>
              <Form />
            </div>
          </div>
          <div className="container mt-10">
            <h2 className="mb-3 md:mb-5 text-heading-6 md:text-heading-3 text-neutral-1000">
              How to Complain to Al-Ihsan Foundation
            </h2>
            <p className="mb-6 md:mb-7.5 text-lg">
              We welcome your concerns at Al-Ihsan Foundation.
            </p>
            <h2 className="mb-3 md:mb-4 text-heading-6 md:text-heading-3 text-neutral-800">
              General Complaint
            </h2>
            <p className="mb-5 text-lg md:mb-4">
              To make a general complaint please contact us via the following
              options:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7.5 mb-7.5">
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <PostIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Post</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <p className="text-button-lg text-neutral-800">
                    PO Box 791, Chester Hill NSW 2162
                  </p>
                  <p className="text-xs font-medium text-neutral-800">
                    Please mark “Private and Confidential”.
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <Link to={"tel:1300998444"}>
                <div className="flex flex-col col-span-1 gap-10">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="text-primary-300">
                        <PhoneCallIcon iconSize={60} />
                      </div>
                      <p className="text-sm text-neutral-700">Call Now</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4 text-center">
                      <p className="text-button-lg text-neutral-800">
                        1300 998 444
                      </p>
                      <p className="text-xs">
                        Give us a call, and we'll be pleased to help. One of our
                        executives will contact you.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MailIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Email Us</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <Link
                    to="mailto:complaints@alihsan.org.au"
                    className="text-button-lg text-neutral-800"
                  >
                    complaints@alihsan.org.au
                  </Link>
                  <p className="text-xs">
                    If you would like our assistance, kindly mail us. You will
                    hear from our executive soon.
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MapPinIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Address</p>
                </div>
                <div className="flex flex-col justify-center gap-2 text-center">
                  <p className="text-button-lg text-neutral-800">
                    176 Waldron Rd, Chester Hill, NSW 2162, AUSTRALIA
                  </p>
                  <Link
                    to={"https://maps.app.goo.gl/VeY7iZg4um1CKXAK9"}
                    target="_blank"
                    className="text-primary-300 text-button-md"
                  >
                    View On Google Map
                  </Link>
                </div>
              </div>
            </div>
            <h2 className="mb-3 md:mb-4 text-heading-6 text-neutral-800 md:text-heading-4">
              Safeguarding and Child Protection Incidents
            </h2>
            <p className="mb-5 text-lg text-neutral-800">
              If you have concerns or wish to report a safeguarding or child
              protection incident, please can contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7.5 mb-5">
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <PostIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Post</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <p className="text-button-lg text-neutral-800">
                    PO Box 791, Chester Hill NSW 2162
                  </p>
                  <p className="text-xs">
                    Please mark “Private and Confidential”.
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <Link to={"tel:1300998444"}>
                <div className="flex flex-col col-span-1 gap-10">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="text-primary-300">
                        <PhoneCallIcon iconSize={60} />
                      </div>
                      <p className="text-sm text-neutral-700">Call Now</p>
                    </div>
                    <div className="flex flex-col justify-center gap-4 text-center">
                      <p className="text-button-lg text-neutral-800">
                        1300 998 444
                      </p>
                      <p className="text-xs">
                        Give us a call, and we'll be pleased to help. One of our
                        executives will contact you.
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MailIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Email Us</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <Link
                    to={"mailto:complaints@alihsan.org.au"}
                    className="text-button-lg text-neutral-800"
                  >
                    complaints@alihsan.org.au
                  </Link>
                  <p className="text-xs">
                    If you would like our assistance, kindly mail us. You will
                    hear from our executive soon.
                  </p>
                </div>
              </div>
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <MapPinIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Address</p>
                </div>
                <div className="flex flex-col justify-center gap-2 text-center">
                  <p className="text-button-lg text-neutral-800">
                    176 Waldron Rd, Chester Hill, NSW 2162, AUSTRALIA
                  </p>
                  <Link
                    to={"https://maps.app.goo.gl/VeY7iZg4um1CKXAK9"}
                    target="_blank"
                    className="text-primary-300 text-button-md"
                  >
                    View On Google Map
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-10 text-lg text-neutral-800">
              <p className="mb-2">
                For logging any complaint online, please use our{" "}
                <Link to={"#"} className="text-blue">
                  online form accessible here
                </Link>
                . This form enables you to provide necessary details and
                attachments for addressing your concern. Rest assured that your
                complaints will be handled with the utmost confidentiality and
                professionalism.
              </p>
              <p className="mb-2">
                We value your feedback as it aids us in identifying areas for
                improvement, maintaining transparency, and enhancing our
                services.
              </p>
              <p className="">
                Thank you for entrusting Al-Ihsan Foundation with your concern.
              </p>
            </div>

            <h2 className="mb-4 text-heading-6 md:text-heading-3">Know More</h2>
            <KnowMoreAccordion />
          </div>
        </section>
      </div>
    </div>
  );
};

function KnowMoreAccordion() {
  return (
    <div className="w-full">
      <div className="">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Complaints Categories
                </span>
                {/* <div className='w-4 h-4'>
                  <ChevronDownIcon iconSize={16}
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-purple-500`}
                  />
                </div> */}
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <h5 className="mb-1 text-button-md">General complaints:</h5>
                <p className="mb-2 text-sm text-neutral-600">
                  This type of complaint can cover concerns about our services,
                  conduct, or any other matters related to Al-Ihsan Foundation.
                </p>
                <h5 className="mb-1 text-button-md">Child protection: </h5>
                <p className="mb-2 text-sm text-neutral-600">
                  If you have concerns about the safety or well-being of a child
                  in our programs, please report it under our child protection
                  complaints process below.{" "}
                </p>
                <h5 className="mb-1 text-button-md">Safeguarding Complaint:</h5>
                <p className="text-sm text-neutral-600">
                  If you have concerns regarding the safety or well-being of a
                  vulnerable person, such as vulnerable beneficiaries or staff,
                  please use our safeguarding complaints process below. Further
                  information about this can be found in our{" "}
                  <Link to={"#"} className="text-blue">
                    Safeguarding Policy
                  </Link>
                  .{" "}
                </p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Access to Complaints Handling Policy and Online Privacy Policy
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <p className="mb-2 text-sm text-neutral-600">
                  You can also access our Complaints Handling Policy and Online
                  Privacy Policy here. These policies provide valuable
                  information about how we handle complaints and protect your
                  privacy online. Your access to these policies reflects our
                  commitment to transparency and ensuring that you are
                  well-informed about our practices.
                </p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Who can complain?
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Complaints on Behalf of Someone Else
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Remaining Anonymous
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Zero Tolerance for Abusive or Threating Conduct
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  Fraudulent Statements Reminder
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full gap-x-3">
                <span className="text-button-lg md:text-heading-7 text-start hover:text-primary-300 text-neutral-600">
                  How your complaint is handled
                </span>
                <div
                  className={
                    (open
                      ? ""
                      : "rotate-180 transform ease-in-out delay-75 duration-300") +
                    " h-5 w-5 text-neutral-600 transform ease-in-out delay-75 duration-300"
                  }
                >
                  <ChevronUpIcon />
                </div>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                No.
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default React.memo(ComplaintsComponent);
