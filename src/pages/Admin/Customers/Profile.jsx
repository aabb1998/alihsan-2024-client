import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getCustomerDetails } from "../../../features/adminCustomers";

export default function Profile () {
	const dispatch = useDispatch();
	const { details, detailsId, detailsLoading, detailsError } = useSelector(state => state.adminCustomers)
	const pageId = useParams().id;

	useEffect(() => {
		if(pageId!==detailsId)
			dispatch(getCustomerDetails(pageId))
	}, [detailsId, pageId])

	if(detailsId!==pageId)
		return "";
	else if(detailsLoading)
		return <div className="">Loading...</div>
	else if(detailsError)
		return <div className="">Something went wrong</div>

	return (
    <div className="mb-10 sm:px-0 w-full h-[calc(100vh-4.5rem)]">
      <div className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {[
								{label: 'First Name', value: details.firstName},
								{label: 'Last Name', value: details.lastName},
								{label: 'Display Name', value: details.displayName},
								{label: 'Status', value: details.status},
								{label: 'Auth Type', value: details.authType},
								{label: 'Email', value: details.email},
								{label: 'Phone', value: details.phone},
								{label: 'City', value: details.city},
								{label: 'Zip', value: details.zip},
								{label: 'State', value: details.state},
								{label: 'Country', value: details.country},
								{label: 'Company', value: details.company},
								{label: 'About', value: details.about},
							].map((item, i) => (
                <tr
                  key={i}
                  className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                >
                  <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                    <label htmlFor="title" className="">
                      {item.label}
                    </label>
                  </td>
                  <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
	)
}

/*

import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon } from "../../../theme/svg-icons";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getMediaVideo } from "../../../features/adminMedia/adminMediaSlice";
import { formDetailsValues } from "../../../utils/constants";
import Img from "../../../components/Image";
import { Tab } from "@headlessui/react";

const CheckoutDetails = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { media } = useSelector((state) => state.adminMedia);

  useEffect(() => {
    dispatch(getMediaVideo(id));
  }, []);

  return (
    <div className="py-10 px-2 sm:px-7.5 w-full h-[calc(100vh-4.5rem)] overflow-auto">
      <div className="w-full mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {data?.map((detailsValue, i) => (
                <tr
                  key={i}
                  className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                >
                  <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                    <label htmlFor="title" className="">
                      {detailsValue?.label}
                    </label>
                  </td>
                  <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                    {media && detailsValue?.image ? (
                      <div className="h-auto max-w-xs overflow-hidden rounded-lg">
                        <Img
                          src={media[detailsValue?.key]}
                          className="object-cover w-full h-full"
                          alt="Media Image"
                        />
                      </div>
                    ) : media && detailsValue?.video ? (
                      <div className="w-full overflow-hidden rounded-lg h-80"></div>
                    ) : (
                      media && media[detailsValue?.key]
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDetails;
*/