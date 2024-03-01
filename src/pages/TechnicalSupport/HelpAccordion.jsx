import React from "react";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "../../theme/svg-icons";

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
