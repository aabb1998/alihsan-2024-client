import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Filter from "../../../components/Filter";
import Loader from "../../../components/Loader";
import { Pagination } from "../../../components/Pagination";
import { ChevronsUpIcon, EyeIcon } from "../../../theme/svg-icons";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { generateInvoice } from "../../../features/myDonation/myDonationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  AmountFilters,
  PeriodFilters,
  StatusFilters,
} from "../../../utils/donationFilters";
import { getCustomers } from "../../../features/adminDonations/adminDonationSlice";
import { currencyConfig } from "../../../utils/constants";
export const itemPerPage = 10;
const initialState = {
  limit: itemPerPage,
  page: "1",
  sort: "",
  order: "",
  search: "",
  status: "",
};

export const Table = ({
  setFilter,
  filter,
  isOrderLoading,
  orders,
  handleFilterChange,
  quickdonations,
}) => {
  const dispatch = useDispatch();
  const { customersList } = useSelector((state) => state?.adminDonations);

  const filtersList = [
    {
      label: "Amount",
      name: "amount",
      value: "amount",
      defaultSelect: "All amount",
      options: AmountFilters,
    },
    {
      label: "Period",
      name: "period",
      value: "period",
      defaultSelect: "All periods",
      options: PeriodFilters,
    },
    {
      label: "Status",
      name: "status",
      value: "status",
      defaultSelect: "All status",
      options: StatusFilters,
    },
    {
      label: "Customer",
      name: "userId",
      value: "userId",
      defaultSelect: "All Customers",

      options:
        customersList?.map((i) => ({
          value: i.id,
          label: i.firstName + " " + i.lastName,
        })) || [],
    },
  ];
  
  const handleFilterReset = () => {
    setFilter(initialState);
  };
  const handleGuestUserChange = (e) => {
    setFilter({
      ...filter,
      guest: e.target.checked,
    });
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div className="mt-6 md:mt-10">
      <h5 className="mb-5 text-button-lg md:text-heading-7">Recent Orders</h5>
      <Filter
        handleFilterChange={handleFilterChange}
        handleFilterReset={handleFilterReset}
        filters={filter}
        filtersList={filtersList}
        isSearch
      >
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="guest"
            id="isGuest"
            checked={filter.guest}
            onChange={handleGuestUserChange}
          />
          <label
            htmlFor="isGuest"
            className="font-bold text-button-md text-neutral-800"
          >
            Is Guest
          </label>
        </div>
      </Filter>
      <div className="grid">
        <div className="relative overflow-x-auto">
          <table className="w-full table-auto text-start">
            <thead className="rounded bg-neutral-200">
              <tr className="">
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  <div className="flex gap-1.5 items-center">
                    Order Id
                    <span className="cursor-pointer">
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilter({
                            ...filter,
                            sort: "orderId",
                            order: filter.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </span>
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                  Name
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                  <div className="flex gap-1.5 items-center">
                    Amount
                    <span className="cursor-pointer">
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilter({
                            ...filter,
                            sort: "total",
                            order: filter.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </span>
                  </div>
                </th>
                <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                  <div className="flex gap-1.5 items-center">
                    Date
                    <span className="cursor-pointer">
                      <ChevronsUpIcon
                        iconSize={14}
                        onClick={() => {
                          setFilter({
                            ...filter,
                            sort: "donatedAt",
                            order: filter.order === "asc" ? "desc" : "asc",
                          });
                        }}
                      />
                    </span>
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
              {isOrderLoading ? (
                <Loader />
              ) : orders?.rows?.length > 0 ? (
                orders?.rows?.map((item, i) => <TableRow key={i} item={item} />)
              ) : (
                <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                  <td
                    colSpan="7"
                    className="p-4 text-sm font-medium font-Montserrat text-neutral-700"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="mt-5">
            <Pagination
              totalPages={Math.ceil(orders?.count / itemPerPage)}
              currentPage={filter.page}
              onPageChange={(page) => setFilter((f) => ({ ...f, page }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function TableRow({ item }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDownload = async (id) => {
    const action = await dispatch(
      generateInvoice({
        donationId: id,
      })
    );
  };

  return (
    <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.orderId}
      </td>
      <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
        <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
          {item?.User?.firstName || item?.firstName}{" "}
          {item?.User?.lastName || item?.lastName}
        </div>
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {currencyConfig.label}{item?.total}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.donatedAt}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.email}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {/* {item?.isRecurring ? "Recurring" : "One-time"} */}
        {item?.status}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        <div className="flex gap-2 sm:gap-4">
          <ActionButtonBgWithIcon
            handleDownload={() => handleDownload(item.id)}
            handleView={() =>
              item?.isRecurring
                ? navigate("/admin/subscription/" + item.id, {
                    state: { search: "dashboard" },
                  })
                : navigate("/admin/donation/" + item.id, {
                    state: { search: "dashboard" },
                  })
            }
          />
        </div>
      </td>
    </tr>
  );
}
