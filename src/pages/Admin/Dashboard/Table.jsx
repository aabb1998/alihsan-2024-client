import Filter from "../../../components/Filter";
import Img from "../../../components/Image";
import Loader from "../../../components/Loader";
import { Pagination } from "../../../components/Pagination";
import { ChevronsUpIcon } from "../../../theme/svg-icons";
export const itemPerPage = 10;
const initialState = {
  limit: itemPerPage,
  page: "1",
  sort: "",
  order: "",
  search: "",
};

export const Table = ({
  setFilter,
  filter,
  isOrderLoading,
  orders,
  handleFilterChange,
  quickdonations,
}) => {
  // const handleFilterChange = (name, value) => {
  //   setFilter({ ...filter, [name]: value });
  // };
  const handleFilterReset = () => {
    setFilter(initialState);
  };
  return (
    <div className="mt-6 md:mt-10">
      <h5 className="mb-5 text-button-lg md:text-heading-7">Recent Orders</h5>
      <Filter
        handleFilterChange={handleFilterChange}
        handleFilterReset={handleFilterReset}
        filters={filter}
        filtersList={[
          {
            label: "Select Campaign",
            name: "campaignId",
            value: "campaignId",
            options: quickdonations?.map((e) => ({
              label: e.name,
              value: e.id,
            })),
          },
          {
            label: "Select Recurrence",
            name: "isRecurring",
            value: "isRecurring",
            defaultSelect: "All",
            options: [
              { value: true, label: "Recurring" },
              { value: false, label: "One-time" },
            ],
          },
        ]}
        isSearch
      />
      <div className="relative overflow-x-auto">
        <table className="w-full table-auto text-start">
          <thead className="rounded bg-neutral-200">
            <tr className="">
              <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                Donation ID
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
              <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                Donor Name
              </th>
              <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                Campaign
              </th>
              <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                Type
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
  );
};

function TableRow({ item }) {
  return (
    <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        #{item?.id}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        ${item?.total}
      </td>
      <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
        <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
          {item?.User?.firstName || item?.firstName}{' '}
          {item?.User?.lastName || item?.lastName}
        </div>
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.Campaign?.name}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.isRecurring ? "Recurring" : "One-time"}
      </td>
      <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
        {item?.donatedAt}
      </td>
    </tr>
  );
}
