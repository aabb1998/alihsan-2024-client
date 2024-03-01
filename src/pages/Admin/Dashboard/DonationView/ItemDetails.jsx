import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMediaVideo } from "../../../../features/adminMedia/adminMediaSlice";
import { countriesList } from "../../../../utils/countries";

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

  const createDonationData = (type, data) => {
    if (type === "COMMON") {
      const { total } = data;
      return { "Donation Amount": total };
    } else if (type === "FEDYAH") {
      const { quantity, total } = data;
      return { Quantity: quantity, "Donation Amount": total };
    } else if (type === "AQEEQAH_ADAHI") {
      const { quantity, videoRequest, phoneNumber, childName } = data;
      return {
        Quantity: quantity,
        "Video Request": videoRequest,
        Phone: phoneNumber,
        "Child Name": childName,
      };
    } else if (type === "ADEEQAH_GENERAL_SACRIFICE") {
      const { behalfOf, specialRequest, donationItem, riceQuantity, notes } =
        data;
      return {
        "Behalf Of": behalfOf,
        "Special Request": specialRequest,
        "Donation Item": donationItem,
        "Rice Quantity": riceQuantity,
        Notes: notes ?? "-",
      };
    } else if (type === "ZAQAT") {
      const { total } = data;
      return { "Donation Amount": total };
    } else if (type === "WATER_CAMPAIGN") {
      const { total, countryDonation, namePlaque, notes, waterCampaignType } =
        data;
      return {
        "Donation Amount": total,
        "Country Donation": countryDonation,
        "Name Plaque": namePlaque,
        Notes: notes,
        "Water Campaign Type": waterCampaignType,
      };
    } else if (type === "KURBAN") {
      const { total, countryDonation, donationItem } = data;
      return {
        "Donation Amount": total,
        Country: countriesList.filter((i) => i.code === countryDonation)[0]
          ?.name,
        Item: donationItem,
      };
    } else if (type === "RAMADAN_HOT_MEALS") {
      const { quantity, total } = data;
      return {
        "Donation Amount": total,
        Quantity: quantity,
      };
    } else if (type === "RAMADAN_FOOD_PACK") {
      const { isRecurring, periodDays, amount, quantity, total } = data;
      return {
        "Donation Amount": total,
        Quantity: quantity,
      };
    } else {
      const { quantity, total } = data;

      return {
        "Donation Amount": total,
        Quantity: quantity,
      };
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
  const constantPrices = ["FEED1", "FEED10", "CLOTHE10", "FEED60"];
  const isFieldEditable = constantPrices.includes(data?.type);

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
              {isFieldEditable ? (
                <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                  <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                    <label htmlFor="title" className="">
                      Type
                    </label>
                  </td>
                  <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                    {isFieldEditable ? data?.typeText : data?.type}
                  </td>
                </tr>
              ) : (
                ""
              )}
              {donationRow(data?.Campaign?.checkoutType)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
