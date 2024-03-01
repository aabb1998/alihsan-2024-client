import React from "react";
import { Button } from "../../../components";

const BankAccount = () => {
  return (
    <>
      <label htmlFor="LastName" className="">
        For direct bank transfers to avoid transaction fees, please send your
        donation to the following account:
      </label>
      <div className="mt-5">
        <table className="border-collapse border border-neutral-300">
          <tbody>
            <tr>
              <td className="text-heading-7 border border-neutral-300 p-2">
                Bank Name:
              </td>
              <td className="border border-neutral-300 p-2">St George Bank</td>
            </tr>
            <tr>
              <td className="text-heading-7 border border-neutral-300 p-2">
                Account Name:
              </td>
              <td className="border border-neutral-300 p-2">
                Al-Ihsan Foundation
              </td>
            </tr>
            <tr>
              <td className="text-heading-7 border border-neutral-300 p-2">
                BSB:
              </td>
              <td className="border border-neutral-300 p-2">112 879</td>
            </tr>
            <tr>
              <td className="text-heading-7 border border-neutral-300 p-2">
                Account Number:
              </td>
              <td className="border border-neutral-300 p-2">425 989 660</td>
            </tr>
            <tr>
              <td className="text-heading-7 border border-neutral-300 p-2">
                Reference:
              </td>
              <td className="border border-neutral-300 p-2">Site Donation</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Button variant={"primaryFull"} label={"Return Home"} />
      </div>
    </>
  );
};

export default React.memo(BankAccount);
