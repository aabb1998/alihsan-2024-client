import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMediaVideo } from "../../../../features/adminMedia/adminMediaSlice";

const ItemDetails = ({ data }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const donationTypes = [
    "COMMON",
    "FEDYAH",
    "AQEEQAH_ADAHI",
    "ADEEQAH_GENERAL_SACRIFICE",
    "ZAQAT",
    "WATER_CAMPAIGN",
    "KURBAN",
  ];

  // - Items
  // - Quantity with unit
  // - Country
  // - Group , etc

  const createDonationData = (type, data) => {
    if (type === "COMMON") {
      const { total } = data;
      return { Total: total };
    } else if (type === "FEDYAH") {
      const { type, quantity, total } = data;
      return { Type: type, Quantity: quantity, Amount: total };
    } else if (type === "AQEEQAH_ADAHI") {
      const { quantity, videoRequest, phoneNumber, childName } = data;
      return {
        Quantity: quantity,
        "Video Request": videoRequest,
        Phone: phoneNumber,
        "Child Name": childName,
      };
    } else if (type === "ADEEQAH_GENERAL_SACRIFICE") {
      const { behalfOf, specialRequest, donationItem, riceQuantity } = data;
      return {
        "Behalf Of": behalfOf,
        "Special Request": specialRequest,
        "Donation Item": donationItem,
        "Rice Quantity": riceQuantity,
      };
    } else if (type === "ZAQAT") {
      const { total } = data;
      return { amount: total };
    } else if (type === "WATER_CAMPAIGN") {
      const { total, countryDonation, namePlaque, notes, waterCampaignType } =
        data;
      return {
        amount: total,
        "Country Donation": countryDonation,
        "Name Plaque": namePlaque,
        Notes: notes,
        "Water Campaign Type": waterCampaignType,
      };
    } else if (type === "KURBAN") {
      const { total, countryDonation, donationItem } = data;
      return { Amount: total, Country: countryDonation, Item: donationItem };
    }
  };

  const donationRow = (type) => {
    return Object.entries(createDonationData(type, data)).map(
      ([key, value]) => (
        <tr
          className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
          key={key}
        >
          <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
            <label htmlFor="title" className="">
              {key}
            </label>
          </td>
          <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
            {value}
          </td>
        </tr>
      )
    );
  };

  useEffect(() => {
    dispatch(getMediaVideo(id));
  }, []);

  return (
    <div>
      <div className="w-full mt-5 md:mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                  <label htmlFor="title" className="">
                    Campaign ID
                  </label>
                </td>
                <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                  {data?.Campaign?.id}
                </td>
              </tr>
              <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                  <label htmlFor="title" className="">
                    Campaign Name
                  </label>
                </td>
                <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                  {data?.Campaign?.name}
                </td>
              </tr>
              <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                  <label htmlFor="title" className="">
                    Campaign Type
                  </label>
                </td>
                <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                  {data?.Campaign?.checkoutType}
                </td>
              </tr>
              {donationRow(data?.Campaign?.checkoutType)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
