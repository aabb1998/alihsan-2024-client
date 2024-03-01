import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
} from "../../../theme/svg-icons";
import { Pagination } from "../../../components/Pagination";
import { Button } from "../../../components";
import FormModal from "./FormModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUserDetails,
  getUsers,
  resetUserPassword,
} from "../../../features/adminUsers";
import DeleteModal from "./DeleteModal";
import { SnackMessages } from "../../../components/Toast";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { Disclosure } from "@headlessui/react";
import Loader from "../../../components/Loader";
import TableSortTitle from "../../../components/TableSort";

const UserStatuses = [
  { label: "Active", value: "Active" },
  { label: "Blocked", value: "Deleted" },
];

export default function Users() {
	const userId = useSelector(state => state.profile.auth?.id)
  const { showSuccessMessage, showErrorMessage } = SnackMessages();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [resetting, setResetting] = useState({});

  const { users, userDetails, userDetailsLoading, usersLoader } = useSelector(
    (state) => state.adminUsers
  );

  const edit = (id) => {
    dispatch(getUserDetails(id));
  };
  const resetPass = (id) => {
    setResetting((r) => ({ ...r, [id]: true }));
    dispatch(resetUserPassword(id)).then((res) => {
      if (res.error) showErrorMessage(res.error.message);
      else showSuccessMessage(res.payload.message);
      setResetting((r) => ({ ...r, [id]: false }));
    });
  };
  const onDelete = () => {
    dispatch(deleteUser({ id: deleting[0], unblock: deleting[1] })).then(
      (res) => {
        if (res.error) showErrorMessage(res.error.message);
        else showSuccessMessage(res.payload.message);
        setDeleting(false);
      }
    );
  };

  useEffect(() => {
    load({});
  }, []);

  const load = (filters) => {
		if(filters)
    	dispatch(getUsers({...users.filters, ...filters}));
		else
			dispatch(getUsers({search: '', sort: '', order: '', status: '', page: 1}));
  };

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Admins</h5>
          <Button
            onClick={() => setAdding(true)}
            className=" text-button-md md:text-button-lg"
            variant="primary"
            type="submit"
            label={
              <>
                <span className="sm:hidden">
                  <PlusIcon />
                </span>{" "}
                <span className="hidden sm:flex">Add Admin</span>
              </>
            }
          />
        </div>
        <Filter filters={users.filters} setFilters={load} />
        <div className="grid mt-5 md:mt-7.5">
          <div className="mt-5 overflow-x-auto h-100">
            <table className="w-full table-auto text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600">
										<TableSortTitle
											sort={users.filters.sort}
											order={users.filters.order}
											label="Name"
											value="name"
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600">
										<TableSortTitle
											sort={users.filters.sort}
											order={users.filters.order}
											label="Email Address"
											value="email"
											setOrder={load}
										/>
                  </th>
                  {/* <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Role</th> */}
                  {/* <th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Last Day Active</th> */}
                  <th className="p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600">
										<TableSortTitle
											sort={users.filters.sort}
											order={users.filters.order}
											label="Status"
											value="status"
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.rows.map((i, j) => (
                  <tr
                    className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100"
                    key={i.id}
                  >
                    <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
                      <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                        {/* <Img src={'/images/avatar/Courtney-Henry.png'} alt='Courtney Henry' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' /> */}
                        {i.firstName} {i.lastName}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {i.email}
                    </td>
                    {/* <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
											{i.role}
										</td> */}
                    {/* <td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>-</td> */}
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {i.status === "Active"
                        ? "Active"
                        : i.status === "Blocked"
                        ? "Blocked"
                        : "Unknown"}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {i.role !== "SUPERADMIN" && (
                        <ActionButtonBgWithIcon
                          handleEdit={
                            i.status !== "Blocked" && (() => edit(i.id))
                          }
                          handleBlock={
														i.id !== userId &&
                            i.status === "Active" &&
                            (() => setDeleting([i.id, false]))
                          }
                          handleUnblock={
														i.id !== userId &&
                            i.status === "Blocked" &&
                            (() => setDeleting([i.id, true]))
                          }
                          handleResetPassword={
														i.id !== userId &&
                            i.status !== "Blocked" &&
                            (() =>
                              !usersLoader &&
                              !resetting[i.id] &&
                              resetPass(i.id))
                          }
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {usersLoader ? <Loader /> : null}

        {users.count === 0 ? (
          <p className="p-4 text-sm text-neutral-600">No Data Found.</p>
        ) : (
          !usersLoader && (
            <div className="mt-7.5">
              <Pagination
                onPageChange={(page) => load({ page })}
                totalPages={Math.ceil(users.count / 20)}
                currentPage={users.filters.page}
              />
            </div>
          )
        )}
      </div>
      <FormModal visible={adding} onClose={() => setAdding(false)} />
      <DeleteModal
        id={deleting ? deleting[0] : false}
        isUnblocking={deleting ? deleting[1] : false}
        onClose={() => setDeleting(false)}
        onDelete={onDelete}
      />
    </>
  );
}

function Filter({ filters, setFilters }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleSidebar = (visible) => {
    setSearch(filters.search);
    setSidebarOpen(visible);
  };
  useEffect(() => {
    setSidebarOpen(false);
  }, [filters]);
  return (
    <>
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between my-5 md:my-7.5">
        <form className="flex items-center gap-4">
          <label
            onClick={() => toggleSidebar(true)}
            className="flex items-center gap-1 cursor-pointer text-button-md text-neutral-1000"
          >
            <span className=" md:hidden">
              <FilterIcon />{" "}
            </span>
            Filter:
          </label>
          <div className="hidden md:block">
            <select
              className="border rounded border-neutral-300 py-1.5 px-3 w-40 pr-6"
              value={filters.status}
              onChange={(e) => setFilters({ status: e.target.value })}
            >
              <option
                className="text-sm font-medium font-Montserrat text-neutral-800"
                value=""
              >
                All
              </option>
              {UserStatuses.map(({ value, label }) => (
                <option
                  className="text-sm font-medium font-Montserrat text-neutral-800"
                  value={value}
                  key={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <Button
            className="hidden text-button-md text-neutral-1000 md:block"
            variant=""
            label={"Clear"}
            onClick={(e) => {
              e.preventDefault();
              setFilters();
            }}
          />
        </form>
        <div className="hidden w-full md:block md:w-auto form-group md:min-w-72">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
              <SearchIcon />
            </span>
            <input
              className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9"
              placeholder="Search"
              type="text"
              name="search"
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
            />
          </label>
        </div>
      </div>

      <div
        className={
          "fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 md:hidden z-1 " +
          (sidebarOpen ? "" : "hidden")
        }
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-neutral-1000/40">
          <div className="flex items-end justify-center min-h-full text-center sm:items-center md:p-0">
            <aside
              id="default-sidebar"
              className={`fixed top-0 left-0 z-40 min-w-[16.875rem] h-screen transition-transform md:-translate-x-full md:hidden`}
              aria-label="Sidebar"
            >
              <div className="h-full flex flex-col gap-4 px-5 py-7.5 overflow-y-auto bg-neutral-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-button-lg text-neutral-800">Filter</h3>
                  <div className="cursor-pointer text-neutral-500">
                    <CloseIcon
                      iconSize={24}
                      onClick={() => toggleSidebar(false)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="relative block !mb-0">
                    <span className="sr-only">Search</span>
                    <Button
                      name="search"
                      value={search}
                      className="absolute inset-y-0 right-0 flex items-center !p-2 !rounded-lg !rounded-tl-none !rounded-bl-none text-primary-300 bg-accent-300"
                      onClick={() => setFilters({ search: search })}
                      rightIcon={<SearchIcon />}
                    />

                    {/* </span> */}
                    <input
                      className="block w-full !py-2 !pr-12 bg-white border rounded-md form-control"
                      placeholder="Search"
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                  {/* <Button
										name="search"
										value={search}

										label="search"
									/> */}
                </div>
                <div className="flex flex-col gap-7.5">
                  <div className="flex flex-col gap-7.5">
                    <Disclosure as="div">
                      {({ open }) => (
                        <>
                          <Disclosure.Button className={"w-full"}>
                            <Button
                              className={
                                "flex items-center justify-between w-full"
                              }
                              variant={"none"}
                              label={
                                <>
                                  <span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">
                                    Status
                                  </span>
                                  <span
                                    className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${
                                      open && "rotate-180 transform "
                                    }`}
                                  >
                                    <ChevronDownIcon iconSize={20} />
                                  </span>
                                </>
                              }
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                            {[{ value: "", label: "All" }, ...UserStatuses].map(
                              (status) => (
                                <Button
                                  className={
                                    "w-full flex text-sm grow-1 " +
                                    (status.value === filters.status
                                      ? "font-bold text-neutral-700"
                                      : "font-medium text-neutral-900")
                                  }
                                  variant="none"
                                  value={status.value}
                                  key={status.value}
                                  name={"projectStatus"}
                                  onClick={() =>
                                    setFilters({ status: status.value })
                                  }
                                  label={status.label}
                                />
                              )
                            )}
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </div>
                </div>
                <div
                  className="flex items-center justify-between mt-2 cursor-pointer"
                  onClick={() => setFilters()}
                >
                  <h3 className="text-button-lg text-neutral-800">Clear</h3>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
