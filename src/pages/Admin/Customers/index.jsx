import React from "react";
import { useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/adminCustomers";
import Img from "../../../components/Image";
import { countriesList } from "../../../utils/countries";
import { UserIcon } from "../../../theme/svg-icons";

export default function Customers () {
  const { filters, rows, count, loading } = useSelector(state => state.adminCustomers);
	const dispatch = useDispatch()

	const load = (newFilters) => {
		if(newFilters)
			dispatch(getUsers({...filters, ...newFilters}))
		else
			dispatch(getUsers({country: '', page: '', search: ''}))
	}

	useEffect(() => {
		load({})
	}, [])

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Users</h5>
        </div>
        {/* card area */}

        <div className="grid">
          <Filter
						setFilters={load}
						filters={filters}
          />{" "}
          <div className="relative overflow-x-auto">
            <table class="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Name
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Email
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Company
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Country
                  </th>
                  <th className="p-4 text-sm max-w-[10rem] min-w-[10rem]  font-medium whitespace-nowrap text-start font-Montserrat text-neutral-600">
                    Total Donation
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] whitespace-nowrap text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Last Day Active
                  </th>
                  {/* <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th> */}
                </tr>
              </thead>
              <tbody>
								{rows.map(i => (
									<tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100" key={i.id}>
										<td className="p-4 text-sm font-bold font-Montserrat text-neutral-800 max-w-[10rem] break-all">
											<div className="flex items-center justify-start flex-nowrap gap-x-2">
												{i.profileImage ? <Img
													src={i.profileImage}
													alt="Courtney Henry"
													className="rounded-full w-9 h-9 min-w-[2.25rem] min-h-[2.25rem]"
												/> : <span className="rounded-full bg-primary-100 w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] flex justify-center items-center"><UserIcon /></span>  }
												{i.firstName} {i.lastName}
											</div>
										</td>
										<td className="p-4 text-sm font-medium break-all font-Montserrat text-neutral-700 max-w-[10rem]">
											{i.email}
										</td>
										<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											{i.company}
										</td>
										<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											{i.country && countriesList.find(c => c.code===i.country)?.name}
										</td>
										<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											${i.totalDonations}
										</td>
										<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											{i.lastDayActive}
										</td>
									</tr>
								))}
              </tbody>
            </table>
						{loading && <div className="mt-4">Loading...</div>}
            <div className="mt-7.5 mb-5">
              {count===0?(
                <div className="">No Data Found.</div>
              ):(
                <Pagination
                  totalPages={Math.ceil(count/20)}
                  currentPage={filters.page}
                  onPageChange={(page) => load({ page })} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
