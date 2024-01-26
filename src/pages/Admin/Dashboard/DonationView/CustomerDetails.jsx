import React from "react";

const CustomerDetails = ({ data }) => {
  const rowsData = [
    { label: "Full Name", value: data?.firstName + " " + data?.lastName },
    { label: "Mobile Number", value: data?.phone },
    { label: "Email", value: data?.email },
    { label: "Company", value: data?.companyName },
    { label: "Address", value: data?.address },
  ];

  return (
    <div>
      <div className="w-full mt-5 md: mt-7.5">
        <div className="flex flex-col mb-6 form-group">
          <table className="w-full table-auto text-start">
            <tbody>
              {rowsData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                >
                  <td className="p-4 min-w-[12rem] break-words text-sm font-medium font-Montserrat text-neutral-700">
                    <label htmlFor="title" className="">
                      {row.label}
                    </label>
                  </td>
                  <td className="p-4 text-sm font-medium break-words font-Montserrat text-neutral-700">
                    {row.value}
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

export default CustomerDetails;
