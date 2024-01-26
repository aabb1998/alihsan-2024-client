import { CloseIcon } from "../../../theme/svg-icons";

const ViewModal = ({ onClose, item }) => {
  const viewItems = [
    { label: "Campaign Name", value: item?.Campaign?.name },
    { label: "First Name", value: item?.firstName || item?.User?.firstName },
    { label: "Last Name", value: item?.lastName || item?.User?.lastName },
    { label: "Email", value: item?.email || "-" },
    { label: "Phone", value: item?.User?.phone || "-" },
    { label: "Is Recurring", value: item?.isRecurring ? "Yes" : "No" },
    { label: "Status", value: item?.status },
    { label: "Total", value: item?.total },
    { label: "Donated At", value: item?.donatedAt },
  ];

  return (
    <>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75">
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0 max-h-[80vh]">
              <div className="relative w-full gap-4 text-left transition-all transform sm:max-w-modal-sm">
                <div className="flex px-4 pt-4 pb-7.5 sm:pt-10 sm:pb-10 sm:px-10 bg-white rounded-t-3xl sm:rounded-3xl">
                  <div className="flex flex-col flex-grow w-full gap-4 sm:gap-8">
                    <div className="flex justify-between">
                      <div className="font-bold tracking-tighter text-neutral-1000 text-md sm:text-heading-7">
                        View Subscription
                      </div>
                      <button className="transition-colors ease-in-out text-neutral-1000 opacity-90 hover:text-neutral-800">
                        <CloseIcon iconSize={24} onClick={onClose} />
                      </button>
                    </div>

                    <table className="w-full table-auto text-start">
                      <tbody>
                        {viewItems.map((e, i) => (
                          <tr
                            key={i}
                            className="flex border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                          >
                            <td className="p-4 min-w-[12rem] grow basis-0 break-words text-sm font-medium font-Montserrat text-neutral-700">
                              <label htmlFor="title" className="">
                                {e.label}
                              </label>
                            </td>
                            <td className="p-4 text-sm font-medium break-words grow basis-0 font-Montserrat text-neutral-700">
                              {e.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewModal;
