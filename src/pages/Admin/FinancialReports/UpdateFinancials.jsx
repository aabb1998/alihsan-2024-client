import React, { useEffect, useState } from "react";
import { ArrowLeftIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getFormDetails } from "../../../features/adminForms/adminFormSlice";
import { formDetailsValues } from "../../../utils/constants";

const pathDispatchMap = {
  "/admin/fundraisers/": "form/fund-raiser/",
  "/admin/sponsors/": "form/sponsor/",
};

export const UpdateFinancials = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { id } = useParams();
  const { formDetails } = useSelector((state) => state.adminForm);

  useEffect(() => {
    let url = pathname.replace(id, "");
    if (id) {
      dispatch(getFormDetails(pathDispatchMap[url] + id));
    }
  }, [id]);



  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="flex flex-wrap gap-4 items-center justify-between w-full border-b border-neutral-300 pb-3.5">
        <Button
          className="flex items-center text-button-lg gap-x-2"
          variant={"none"}
          label={"Back"}
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
          <table className="table-auto w-full text-start">
            <tbody>
              {formDetailsValues[pathname.replace(id, "")]?.map(
                (detailsValue, i) => (
                  <tr
                    key={i}
                    className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                  >
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      <label htmlFor="title" className="">
                        {detailsValue?.label}
                      </label>
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {formDetails && formDetails[detailsValue?.key]}
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
