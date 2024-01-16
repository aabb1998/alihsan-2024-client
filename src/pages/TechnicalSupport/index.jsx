import React from "react";
import {
  ChevronUpIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneCallIcon,
} from "../../theme/svg-icons";
import { Disclosure } from "@headlessui/react";
import { SupportForm } from "./SupportForm";
import { Link } from "react-router-dom";
import PageHead from "../../components/PageHead";

export const TechnicalSupport = () => {
  return (
    <div>
      <PageHead title={'Technical support'}/>
      <div className="py-7.5 md:py-15">
        <section className="pb-5 md:pb-7.5" aria-label="Complaints">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-7.5 mb-7.5">
              <div className="flex flex-col col-span-1 gap-10 p-10 border rounded-2.5xl border-neutral-300">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="text-primary-300">
                    <ClockIcon iconSize={60} />
                  </div>
                  <p className="text-sm text-neutral-700">Operating Hours</p>
                </div>
                <div className="flex flex-col justify-center gap-4 text-center">
                  <p className="uppercase text-button-lg text-neutral-800">
                    Mon-Fri 9am - 5pm
                  </p>
                  <p className="text-xs">
                    The office will be closed from 24th Dec 2022 and we'll
                    return on Monday 16th Jan 2023.
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
                    className="break-words text-button-lg text-neutral-800"
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
                  <Link href="#" className="text-primary-300 text-button-md">
                    View On Google Map
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <SupportForm />

          <div className="container">
            <h2 className="mb-4 text-heading-6 md:text-heading-3">Help</h2>
            <HelpAccordion />
          </div>
        </section>
      </div>
    </div>
  );
};

export default function HelpAccordion() {
  return (
    <div className="w-full">
      <div className="">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <div className="px-4 py-4 border-2 rounded-lg border-neutral-200 hover:border-primary-200">
              <Disclosure.Button className="flex justify-between w-full">
                <span className="text-button-lg md:text-heading-7 hover:text-primary-300 text-neutral-600">
                  How to make a complaint?
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
                <h5 className="mb-1 text-button-md">Step 01</h5>
                <p className="mb-2 text-sm text-neutral-600">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                </p>
                <h5 className="mb-1 text-button-md">Step 02</h5>
                <p className="mb-2 text-sm text-neutral-600">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                </p>
                <h5 className="mb-1 text-button-md">Step 03</h5>
                <p className="mb-2 text-sm text-neutral-600">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                  eu turpis molestie, dictum est a, mattis tellus. Sed
                  dignissim, metus nec fringilla accumsan, risus sem
                  sollicitudin lacus, ut interdum tellus elit sed risus.
                  Maecenas eget condimentum velit, sit amet feugiat lectus.
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Praesent auctor purus luctus
                  enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus
                  ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel
                  bibendum lorem. Morbi convallis convallis diam sit amet
                  lacinia. Aliquam in elementum tellus.
                </p>
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
