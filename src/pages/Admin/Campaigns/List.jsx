import React, { useEffect, useReducer, useState } from 'react';
import { ChevronDownIcon, CloseIcon, FilterIcon, SearchIcon } from '../../../theme/svg-icons';
import { Pagination } from '../../../components/Pagination';
import { Button } from '../../../components';
import Img from '../../../components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { loadCampaignsList } from '../../../features/adminCampaigns'
import { ProjectStatuses } from '../../../utils/constants';
import { Disclosure } from "@headlessui/react";
import { Link, useNavigate } from 'react-router-dom';

function ProjectStatus({ status }) {
	const statusData = ProjectStatuses.find(i => i.value === status);
	return (
		<div className={'py-1.5 px-5 rounded-lg w-fit ' + statusData.bgColorClass}>
			<h6 className={'text-button-lg ' + statusData.textColorClass}>{statusData.label}</h6>
		</div>
	)
}

export default function Campaigns() {
	const list = useSelector(({ adminCampaigns }) => adminCampaigns.list)
	const dispatch = useDispatch()
	const navigate = useNavigate();

	// const [filters, setFilters] = useReducer((state, action) => {
	// 	if(!action) return {search: '', page: 1, status: ""};
	// 	return {...state, ...action};
	// }, {search: '', page: 1, status: ""})

	const setFilters = (filters) => {
		if (!filters) dispatch(loadCampaignsList({ search: '', status: '', page: 1 }))
		else dispatch(loadCampaignsList({ ...list.filters, ...filters }))
	}

	useEffect(() => {
    setFilters(list.filters)
	}, [])


	return (
		<div className='py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto'>
			{/* dashboard title rea */}
			<div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
				<h5 className='text-heading-7 md:text-heading-4'>Campaigns</h5>
				<Button className=" btn btn-primary text-button-md md:text-button-lg" variant="" type="submit" label={'Add New'} onClick={() => navigate('/admin/campaigns/add')} />
			</div>
			{list.count !== null && (list.count !== 0 || list.filters.search || list.filters.status || list.loading) ? (
				<>
					<Filter filters={list.filters} setFilters={setFilters} />
					{list.rows.length ? (
						<div className='gap-5 md:gap-7.5 grid sm:grid-cols-2 md:grid-cols-3'>
							{list.rows.map(i => (
								<Link to={"/admin/campaign/" + i.id} key={i.id} className='flex h-full'>
									<div key={i.id} className='flex flex-col w-full gap-5 p-3 pb-5 border border-neutral-300 rounded-2xl hover:border-transparent hover:shadow-card hover:bg-white'>
										<div className='w-full overflow-hidden h-52 rounded-2xl'>
											<Img src={i.coverImage} alt={i.name} className='object-cover w-full h-full transition duration-300 ease-in-out opacity-100 rounded-2xl hover:opacity-90' />
										</div>
										<div>
											<h6 className='mb-3 line-clamp-1 text-heading-6 text-neutral-800'>{i.name}</h6>
											<p className='overflow-hidden text-sm font-medium max-h-16 font-Montserrat text-neutral-600 line-clamp-3 sm:min-h-[3.75rem]'>{i.descriptionText || i.description}</p>
										</div>
										<ProjectStatus status={i.status} />
									</div>
								</Link>
							))}
						</div>
					) : <div className="p-4 text-sm text-neutral-600">No Data Found.</div>}
					<div className='mt-7.5'>
						<Pagination
							totalPages={Math.ceil(list.count / 20)}
							currentPage={list.filters.page}
							onPageChange={(page) => setFilters({ page })} />
					</div>
				</>
			) : list.count !== null && !list.loading ? (
				<div className='flex flex-col items-center justify-center gap-5 py-10 mt-5 text-center bg-neutral-200 rounded-xl'>
					<Img src={'../../images/no-campaign.png'} alt='No campaign' className='w-2/4 sm:w-fit' />
					<div>
						<h6 className='mb-2 font-bold text-button-lg text-neutral-1000 md:text-heading-6'>No Campaigns yet</h6>
						<p className='text-sm font-medium w-60 font-Montserrat text-neutral-600'>No Campaigns has been made. Please add a campaign.</p>
					</div>

				</div>
			) : null}


		</div>
	)
}

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
						<span className=' md:hidden'><FilterIcon /> </span>Filter:
					</label>
					<div className='hidden md:block'>
						<select className='border rounded border-neutral-300 py-1.5 px-3 w-40 pr-6' value={filters.status} onChange={e => setFilters({ status: e.target.value })}>
							<option className='text-sm font-medium font-Montserrat text-neutral-800' value="">
								All
							</option>
							{ProjectStatuses.map(({ value, label }) => (
								<option className='text-sm font-medium font-Montserrat text-neutral-800' value={value} key={value}>
									{label}
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
																		className={`w-6 h-6 transition-all duration-50 ease-in shrink-0 flex items-center justify-center ${open && "rotate-180 transform "
																			}`}
																	>
																		<ChevronDownIcon iconSize={20} />
																	</span>
																</>
															}
														/>
													</Disclosure.Button>
													<Disclosure.Panel className="flex flex-col justify-start gap-3 px-1 my-4">
                            {[{value: '', label: 'All'}, ...ProjectStatuses].map((status) => (
															<Button
																className={
																	"w-full flex text-sm grow-1 "
																	+ (status.value === filters.status ? "font-bold text-neutral-700" : "font-medium text-neutral-900")
																}
																variant="none"
																value={status.value}
																name={"projectStatus"}
																onClick={() => setFilters({ status: status.value })}
																label={status.label}
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
