import { ChevronUpIcon, ChevronsUpIcon } from "../../../theme/svg-icons";
import { currencyConfig } from "../../../utils/constants";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { useNavigate } from "react-router-dom";

const Table = ({ setFilters, filters, rows, handleDownload }) => {
  const navigate = useNavigate();

  return (
    <table className="table-auto w-full text-start">
      <thead className="rounded bg-neutral-200">
        <tr className="">
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
            <div className="flex gap-1.5 items-center">
              Order Id
              <ChevronsUpIcon
                iconSize={14}
                onClick={() => {
                  setFilters({
                    ...filters,
                    sort: "orderId",
                    order: filters.order === "asc" ? "desc" : "asc",
                  });
                }}
              />
            </div>
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
            Name
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
            <div className="flex gap-1.5 items-center">
              Amount
              <ChevronsUpIcon
                iconSize={14}
                onClick={() => {
                  setFilters({
                    ...filters,
                    sort: "total",
                    order: filters.order === "asc" ? "desc" : "asc",
                  });
                }}
              />
            </div>
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
            <div
              className="flex gap-1.5 items-center"
              onClick={() => {
                setFilters({
                  ...filters,
                  sort: "donatedAt",
                  order: filters.order === "asc" ? "desc" : "asc",
                });
              }}
            >
              Date
              <ChevronUpIcon
                iconSize={14}
                onClick={() => {
                  setFilters({
                    ...filters,
                    sort: "donatedAt",
                    order: filters.order === "asc" ? "desc" : "asc",
                  });
                }}
              />
            </div>
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
            Email
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
            Status
          </th>
          <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((donation) => (
          <tr
            key={donation?.id}
            className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
          >
            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              {donation?.orderId}
            </td>
            <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
              <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                {donation.User?.firstName || donation.firstName}{" "}
                {donation.User?.lastName || donation.lastName}
              </div>
            </td>
            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              {currencyConfig.label}
              {donation.total}
            </td>
            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              {donation.donatedAt}
            </td>
            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              {donation.User?.email || donation.email}
            </td>
            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              {donation.User?.status || donation.status || "-"}
            </td>

            <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
              <div className="flex gap-2 sm:gap-4">
                <ActionButtonBgWithIcon
                  handleDownload={() => handleDownload(donation.id)}
                  handleView={() =>
                    navigate("/admin/subscription/" + donation?.id)
                  }
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
