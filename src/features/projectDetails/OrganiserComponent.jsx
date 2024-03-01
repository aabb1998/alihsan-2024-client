import React from "react";
import { Link } from "react-router-dom";
import Img from "../../components/Image";
import { nl2br } from "../../utils/helper";

export const OrganiserComponent = ({
  organizerName,
  organizerEmail,
  organizerDescription,
}) => {
  return (
    <div className="flex flex-col gap-10 mb-10">
      <div className="flex flex-col gap-5 px-4 py-5 bg-white border md:p-5 rounded-4xl border-neutral-300">
        <div className="flex flex-col gap-3 md:flex-row">
          {/*<div className="shrink-0">
            <div className="relative overflow-hidden rounded-full bg-neutral-200 w-18 h-18">
              <Img
                className="object-cover w-full h-full"
                src={organizer?.profileImage || "/images/avatar/avatar-1.jpg"}
                alt=""
              />
            </div>
					</div>*/}
          <div className="w-full">
            <div className="w-full mb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="mb-1 text-sm text-neutral-600">Admin</div>
                    <div className="font-bold text-button-lg md:text-heading-7">
                      {organizerName}
                    </div>
                  </div>
                </div>
                <div>
                  <Link
                    to={`mailto:${organizerEmail}`}
                    className="btn btn-outline-secondary"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
            <div className="mb-5">
              <p
                className="text-sm text-neutral-600"
                dangerouslySetInnerHTML={nl2br(organizerDescription)}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
