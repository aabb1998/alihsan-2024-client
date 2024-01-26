import React, { useState, useEffect } from "react";
import { Pagination } from "../../../components/Pagination";
import { Button } from '../../../components';
import { Disclosure } from "@headlessui/react";
import {
  EditIcon,
  MoreverticalIcon,
  Trash2Icon,
  ChevronUpIcon,
  ChevronsUpIcon,
  PhoneCallIcon,
  PlusIcon,
  SearchIcon,
  ChevronDownIcon,
  CloseIcon,
  FilterIcon,
} from "../../../theme/svg-icons";
import Img from "../../../components/Image";
import MoreMenuButton from "../../../components/MoreMenuButton";
import { loadCampaignDonations } from '../../../features/adminCampaigns'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

export default function CampaignDonations() {
  const params = useParams();
  const campaignId = params?.id;

	const list = useSelector(({adminCampaigns}) => adminCampaigns.donations)
  const campaignDetails = useSelector(({adminCampaigns}) => adminCampaigns.details.project)
	const dispatch = useDispatch()

  const getData = filters => {
    if(!filters)
      dispatch(loadCampaignDonations({
        id: campaignId,
        filters: {search: '', page: 1, sort: '', order: '', period: '', amount: ''},
      }))
		else
      dispatch(loadCampaignDonations({
        id: campaignId,
        filters: {...list.filters, ...filters}
      }))
  }
	const setFilters = (filters) => getData(filters)
  const order = (field) => {
    setFilters({sort: field, order: list.filters.order==='desc'?'asc':'desc'})
  }

	useEffect(() => {
    getData();
	}, [])

  return (
    <>
      <div className="mt-5 sm:mt-10">
        {/* dashboard title rea */}
        <div className="flex items-center justify-between w-full border-b border-neutral-300 pb-3.5">
          <h5 className="text-button-lg md:text-heading-5">Donations</h5>
          {/*
          <button
            className=" btn btn-primary text-button-md md:text-button-lg"
            variant="primaryFull"
            type="submit"
          >
            {" "}
            <span className="sm:hidden">
              <PlusIcon />
            </span>{" "}
            <span className="hidden sm:flex">Add Donation</span>{" "}
          </button>
          */}
        </div>
        {/* card area */}
        <div className="flex my-2 sm:my-5 md:my-7.5 gap-2 md:gap-7.5 flex-wrap">
          <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donations
            </h6>
            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">{campaignDetails.totals.totalOrders || 0}</h2>
            </div>
          </div>
          <div className="py-5 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 grow basis-0">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donors
            </h6>
            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">{campaignDetails.totals.totalDonors || 0}</h2>
            </div>
          </div>
          <div className="py-5 grow basis-0 px-4 md:py-7.5 md:px-6 border border-neutral-300 rounded-2xl w-full flex-1 bg-neutral-200 cursor-pointer">
            <h6 className="mb-3 md:mb-5 text-base !font-medium md:text-lg font-Montserrat text-neutral-600">
              {" "}
              Total Donation Amount
            </h6>
            <div className="flex items-center justify-between">
              <h2 className="text-heading-5 md:text-heading-2">${campaignDetails.totals.totalOrderAmount || 0}</h2>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-10">
          <Filter filters={list.filters} setFilters={setFilters} />

          <div className="overflow-x-auto">
            <table class="table-auto w-full text-start">
              <thead className="rounded bg-neutral-200">
                <tr className="">
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Name
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 " onClick={() => order('total')}>
                    <div className="flex gap-1.5 items-center" onClick={() => order('total')}>
                      Amount
                      <span className="cursor-pointer">
                        {list.filters.sort==="total"?(
                          <span className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${list.filters.order==='asc' || "rotate-180 transform "}`}>
                            <ChevronUpIcon iconSize={14} />
                          </span>
                        ):(
                          <span className="flex items-center justify-center w-6 h-6 shrink-0">
                            <ChevronsUpIcon iconSize={14} />
                          </span>
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600 ">
                    <div className="flex gap-1.5 items-center" onClick={() => order('date')}>
                      Date
                      <span className="cursor-pointer">
                        {list.filters.sort==="date"?(
                          <span className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${list.filters.order==='asc' || "rotate-180 transform "}`}>
                            <ChevronUpIcon iconSize={14} />
                          </span>
                        ):(
                          <span className="flex items-center justify-center w-6 h-6 shrink-0">
                            <ChevronsUpIcon iconSize={14} />
                          </span>
                        )}
                      </span>
                    </div>
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Email
                  </th>
                  <th className="p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
                    Phone Number
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.rows.map(donation => (
                  <tr className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
                    <td className="p-4 text-sm font-bold font-Montserrat text-neutral-800">
                      <div className="flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3">
                        {/*
                        <Img
                          src={"/images/avatar/Courtney-Henry.png"}
                          alt="Courtney Henry"
                          className="rounded-full min-w-[2.25rem] min-h-[2.25rem]"
                        />
                        */}
                        {donation.User?.firstName || donation.firstName} {donation.User?.lastName || donation.lastName}
                      </div>
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      ${donation.total}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.donatedAt}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.email || donation.User?.email || '-'}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.phone || donation.User?.phone || '-'}
                    </td>
                    {/*
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      {donation.country || '-'}
                    </td>
                    <td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
                      <div className="flex gap-2 sm:gap-4">
                        <div className="p-2 text-green-300 bg-green-100 rounded cursor-pointer">
                          <PhoneCallIcon />
                        </div>
                          <MoreMenuButton items={[
                            {icon: <EditIcon iconSize={16} />, text: "Edit"},
                            {icon: <Trash2Icon iconSize={16}/>, text: "Delete"},
                          ]} />
                      </div>
                    </td>
                    */}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5 mb-5">
              {list.count===0?(
                <div className="">No Data Found.</div>
              ):(
                <Pagination
                  totalPages={Math.ceil(list.count/process.env.REACT_APP_PAGINATION_PER_PAGE)}
                  currentPage={list.filters.page}
                  onPageChange={(page) => setFilters({ page })} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



const AmountFilters = [
  {label: "All", value: ""},
  {label: "$0 - $50", value: "0-50"},
  {label: "$50 - $100", value: "50-100"},
  {label: "$100 - $200", value: "100-200"},
  {label: "> $200", value: "200-"},
]
const PeriodFilters = [
  {label: "All", value: ""},
  {label: "Today", value: "today"},
  {label: "Last Day", value: "lastday"},
  {label: "This Week", value: "thisweek"},
  {label: "Last Week", value: "lastweek"},
]

function Filter({ filters, setFilters }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [search, setSearch] = useState('')
	const toggleSidebar = (visible) => {
		setSearch(filters.search)
		setSidebarOpen(visible)
	}
	useEffect(() => {
		setSidebarOpen(false);
	}, [filters])
	return (
		<>
			<div className='flex flex-wrap sm:flex-nowrap items-center justify-between my-5 md:my-7.5'>
				<form className='flex items-center gap-4'>
					<label onClick={() => toggleSidebar(true)} className='flex items-center gap-1 cursor-pointer text-button-md text-neutral-1000'>
						<span className=' md:hidden'><FilterIcon /> </span>Filter
					</label>
					<div className='hidden md:block'>
						<select className='border rounded border-neutral-300 py-1.5 px-3 w-40 pr-6' value={filters.period} onChange={e => setFilters({ period: e.target.value })}>
                  {PeriodFilters.map((option) => (
                    <option
                      className="text-sm font-medium font-Montserrat text-neutral-800"
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
						</select>
					</div>
					<div className='hidden md:block'>
						<select className='border rounded border-neutral-300 py-1.5 px-3 w-40 pr-6' value={filters.amount} onChange={e => setFilters({ amount: e.target.value })}>
                  {AmountFilters.map((option) => (
                    <option
                      className="text-sm font-medium font-Montserrat text-neutral-800"
                      value={option.value}
                      key={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
						</select>
					</div>

					<Button className='hidden text-button-md text-neutral-1000 md:block' variant='' label={'Clear Filter'} onClick={(e) => { e.preventDefault(); setFilters() }} />
				</form>
				<div className="hidden w-full md:block md:w-auto form-group md:min-w-72">
					<label className="relative block">
						<span className="sr-only">Search</span>
						<span className="absolute inset-y-0 left-0 flex items-center pl-2 text-neutral-500">
							<SearchIcon />
						</span>
						<input
							className="block w-full !py-2 !pr-3 bg-white border rounded-md form-control !pl-9"
							placeholder="Search" type="text" name="search"
							value={filters.search} onChange={e => setFilters({ search: e.target.value })} />
					</label>
				</div>
			</div>

			<div className={"fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 md:hidden " + (sidebarOpen ? "" : "hidden")}>
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
										<CloseIcon iconSize={24} onClick={() => toggleSidebar(false)} />
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
															className="flex items-center justify-between w-full"
															variant="none"
															label={
																<>
																	<span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">Period</span>
																	<span
																		className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${open && "rotate-180 transform "
																			}`}
																	><ChevronDownIcon iconSize={20} /></span>
																</>
															}
														/>
													</Disclosure.Button>
													<Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
														{PeriodFilters?.map((period) => (
															<Button
																className={
																	"w-full flex text-sm grow-1 "
																	+ (period.value === filters.period ? "font-bold text-neutral-700" : "font-medium text-neutral-900")
																}
																variant="none"
																value={period.value}
																name={"projectStatus"}
																onClick={() => setFilters({ period: period.value })}
																label={period.label}
															/>
														))}
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									</div>
								</div>
								<div className="flex flex-col gap-7.5">
									<div className="flex flex-col gap-7.5">
										<Disclosure as="div">
											{({ open }) => (
												<>
													<Disclosure.Button className={"w-full"}>
														<Button
															className="flex items-center justify-between w-full"
															variant="none"
															label={
																<>
																	<span className="flex items-center justify-between font-bold text-neutral-800 text-button-lg group">Amount</span>
																	<span
																		className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${open && "rotate-180 transform "
																			}`}
																	><ChevronDownIcon iconSize={20} /></span>
																</>
															}
														/>
													</Disclosure.Button>
													<Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
														{AmountFilters?.map((amount) => (
															<Button
																className={
																	"w-full flex text-sm grow-1 "
																	+ (amount.value === filters.amount ? "font-bold text-neutral-700" : "font-medium text-neutral-900")
																}
																variant="none"
																value={amount.value}
																name={"projectStatus"}
																onClick={() => setFilters({ amount: amount.value })}
																label={amount.label}
															/>
														))}
													</Disclosure.Panel>
												</>
											)}
										</Disclosure>
									</div>
								</div>
                <div className="flex items-center justify-between mt-2 cursor-pointer" onClick={() => setFilters()}>
									<h3 className="text-button-lg text-neutral-800">Clear</h3>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</>
	)
}
