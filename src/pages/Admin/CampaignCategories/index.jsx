import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, getCategories } from "../../../features/adminCampaignCategories";
import CategoryFormModal from "./FormModal";
// import DeleteCategoryModal from "./DeleteModal";
import { SnackMessages } from "../../../components/Toast";
import { Pagination } from '../../../components/Pagination';
import ActionButtonBgWithIcon from '../Common/ActionButtonBgWithIcon';
import { CloseIcon, FilterIcon, PlusIcon, SearchIcon } from '../../../theme/svg-icons';
import { Button } from '../../../components';
import { useConfirmationModal } from '../../../components/ConfirmationModal';

export default function CampaignCategories() {
	const { showSuccessMessage, showErrorMessage } = SnackMessages();
	const { rows, count, loader, filters } = useSelector((state) => state.adminCampaignCategories);
	const [categoryAdder, setCategoryAdder] = useState(null);
	const askConfirmation = useConfirmationModal()
	const dispatch = useDispatch()
	const load = (newFilters) => {
		if (newFilters)
			dispatch(getCategories({ ...filters, ...newFilters }));
		else
			dispatch(getCategories({ ...filters, search: '' }));
	}

	const remove = (id) => {
		askConfirmation({
			title: "Delete Category?",
			text: "Are you sure you want to delete this category?",
			accept: {label: "Yes, Delete", onClick: () => {
				dispatch(deleteCategory(id)).then(res => {
					if (res.error)
						showErrorMessage(res.error.message);
					else
						showSuccessMessage(res.payload.message);
				});
			}}, reject: { label: "No, Keep it" }
		})
	}

	useEffect(() => {
		load()
	}, [])

	return (
		<div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
			<div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
				<h5 className='text-heading-7 md:text-heading-5'>Campaign Categories</h5>
				<Button
					onClick={() => setCategoryAdder(true)}
					className=" text-button-md md:text-button-lg"
					variant="primary"
					type="submit"
					label={(
						<>
							<span className='sm:hidden'><PlusIcon /></span> <span className='hidden sm:flex'>Add New</span>
						</>
					)}
				/>
			</div>
			<Filter filters={filters} setFilters={load} />
			<div className='grid mt-5 md:mt-7.5'>
				<div className='overflow-x-auto h-100'>
					<table class="table-auto w-full text-start">
						<thead className="rounded bg-neutral-200">
							<tr className="">
								<th className="w-full p-4 text-sm font-medium text-start font-Montserrat text-neutral-600">
									Name
								</th>
								<th className="p-4 min-w-[5rem] sm:min-w-[10rem] text-sm font-medium text-start font-Montserrat text-neutral-600">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{rows.map(i => (
								<tr key={i.id} className="border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100">
									<td className="p-4 text-button-md font-Montserrat text-neutral-700">
										{i.name}
									</td>
									<td className="p-4 text-sm font-medium font-Montserrat text-neutral-700">
										<ActionButtonBgWithIcon
											handleEdit={() => setCategoryAdder(i.id)}
											handleRemove={() => remove(i.id)}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{loader && <div className="mt-4">Loading...</div>}
					<div className="mt-5">
						{count === 0 ? (
							<div className="">No Data Found.</div>
						) : (
							<Pagination
								totalPages={Math.ceil(count / 20)}
								currentPage={filters.page}
								onPageChange={(page) => load({ page })}
							/>
						)}
					</div>
					<CategoryFormModal
						state={categoryAdder}
						onClose={() => setCategoryAdder(null)}
					/>
					{/* <DeleteCategoryModal
					state={categoryDeleter}
					onClose={() => setCategoryDeleter(null)}
				/> */}
				</div>
			</div>

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
					<label onClick={() => toggleSidebar(true)} className='md:hidden flex items-center gap-1 cursor-pointer text-button-md text-neutral-1000'>
						<span className=' md:hidden'><FilterIcon /> </span>Filter:
					</label>

					{/* <Button className='hidden text-button-md text-neutral-1000 md:block' variant='' label={'Clear Filter'} onClick={(e) => { e.preventDefault(); setFilters() }} /> */}
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

			<div className={"fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 md:hidden z-1 " + (sidebarOpen ? "" : "hidden")}>
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
