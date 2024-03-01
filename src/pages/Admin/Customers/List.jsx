import React from "react";
import { useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../features/adminCustomers";
import Img from "../../../components/Image";
import { countriesList } from "../../../utils/countries";
import { UserIcon } from "../../../theme/svg-icons";
import TableSortTitle from "../../../components/TableSort";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";
import { useNavigate } from "react-router-dom";

export default function Customers () {
  const { filters, rows, count, loading } = useSelector(state => state.adminCustomers);
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const load = (newFilters) => {
		if(newFilters)
			dispatch(getUsers({...filters, ...newFilters}))
		else
			dispatch(getUsers({country: '', page: 1, search: '', sort: '', order: ''}))
	}

	useEffect(() => {
		load()
	}, [])
  const order = (field) => {
    load({sort: field, order: filters.order==='desc'?'asc':'desc'})
  }

  return (
    <>
      <div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-heading-7 md:text-heading-5">Customers</h5>
        </div>
        {/* card area */}

        <div className="grid">
          <Filter
						setFilters={load}
						filters={filters}
          />{" "}
          <div className="overflow-x-auto md:relative">
            <table class="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <TableSortTitle
											value="name" label="Name"
											sort={filters.sort} order={filters.order}
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <TableSortTitle
											value="email" label="Email"
											sort={filters.sort} order={filters.order}
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <TableSortTitle
											value="company" label="Company"
											sort={filters.sort} order={filters.order}
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 max-w-[10rem] min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
                    <TableSortTitle
											value="country" label="Country"
											sort={filters.sort} order={filters.order}
											setOrder={load}
										/>
                  </th>
                  <th className="p-4 text-sm max-w-[10rem] min-w-[10rem]  font-medium whitespace-nowrap text-start font-Montserrat text-neutral-600">
                    <TableSortTitle
											value="totalDonations" label="No. of Donations"
											sort={filters.sort} order={filters.order}
											setOrder={load}
										/>
                  </th>
                  {/* <th className="p-4 max-w-[10rem] min-w-[10rem] whitespace-nowrap text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Last Day Active
                  </th> */}
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Action
                  </th>
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
											{i.totalDonations}
										</td>
										{/* <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											{i.lastDayActive}
										</td> */}
										<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700 max-w-[10rem] break-all">
											<ActionButtonBgWithIcon
												handleView={() => navigate('/admin/customer/'+i.id)}
											/>
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
