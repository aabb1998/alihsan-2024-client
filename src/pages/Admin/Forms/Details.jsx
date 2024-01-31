import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getFormDetails } from "../../../features/adminForms/adminFormSlice";
import { formDetailsValues } from "../../../utils/constants";
import { Im } from "react-flags-select";
import Img from "../../../components/Image";

const pathDispatchMap = {
  "/admin/fundraisers/": "form/fund-raiser/",
  "/admin/sponsors/": "form/sponsor/",
  "/admin/volunteers/": "form/volunteer/",
  "/admin/contacts/": "form/contact-us/",
  "/admin/technical-support/": "form/technical-support/",
  "/admin/complaints/": "complaints/details/",
};

const titleMap = {
  "/admin/fundraisers/": "Fundraise With Us",
  "/admin/sponsors/": "Become a Sponsor",
  "/admin/volunteers/": "Volunteer With Us",
  "/admin/contacts/": "Contact Us",
  "/admin/technical-support/": "Technical Support",
  "/admin/complaints/": "Complaints",
};

export const Details = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [title, setTitle] = useState("");

  const { id } = useParams();
  const { formDetails } = useSelector((state) => state.adminForm);

  useEffect(() => {
    let url = pathname.replace(id, "");
    if (id) {
      dispatch(getFormDetails(pathDispatchMap[url] + id));
    }
    setTitle(titleMap[url]);
  }, [id]);
  console.log(formDetails);
  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <Button
          className="flex items-center text-button-lg gap-x-2"
          variant={"none"}
          label={`Back to ${title}`}
          onClick={() => navigate(pathname.replace("/" + id, ""))}
          leftIcon={
            <span>
              <ArrowLeftIcon />{" "}
            </span>
          }
        />
      </div>
      <div className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {formDetailsValues[pathname.replace(id, "")]?.map(
                (detailsValue, i) => (
                  <tr
                    key={i}
                    className="flex border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                  >
                    <td className="p-4 min-w-[12rem] grow basis-0 break-words text-sm font-medium font-Montserrat text-neutral-700">
                      <label htmlFor="title" className="">
                        {detailsValue?.label}
                      </label>
                    </td>
                    <td className="p-4 text-sm font-medium break-words grow basis-0 font-Montserrat text-neutral-700">
                      {formDetails ? (
                        detailsValue?.isImage ? (
                          <div className="h-auto max-w-xs overflow-hidden rounded-lg">
                            <ImageListing className="object-cover w-full h-full"
                              images={formDetails[detailsValue?.key]}
                            />
                          </div>

                        ) : Array.isArray(formDetails[detailsValue?.key]) ? (
                          formDetails[detailsValue?.key].map((e) => <p>{e}</p>)
                        ) : detailsValue?.isBoolean ? (
                          formDetails[detailsValue?.key] ? (
                            "Yes"
                          ) : (
                            "No"
                          )
                        ) : (
                          formDetails[detailsValue?.key]
                        )
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function ImageListing({ images }) {
  return images?.map((image) => <Img src={image.url} />);
}
