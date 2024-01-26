import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { deleteCategory, getCategories } from "../../../features/adminCampaignCategories";
import CategoryFormModal from "./FormModal";
// import DeleteCategoryModal from "./DeleteModal";
import { SnackMessages } from "../../../components/Toast";
import { Pagination } from '../../../components/Pagination';
import ActionButtonBgWithIcon from '../Common/ActionButtonBgWithIcon';
import { PlusIcon } from '../../../theme/svg-icons';
import { Button } from '../../../components';


export default function CampaignCategories() {
	const { showSuccessMessage, showErrorMessage } = SnackMessages();
	const { rows, count, loader, filters } = useSelector((state) => state.adminCampaignCategories);
	const [categoryAdder, setCategoryAdder] = useState(null);
	const [categoryDeleter, setCategoryDeleter] = useState(null);
	const dispatch = useDispatch()
	const load = (newFilters) => {
		if (newFilters)
			dispatch(getCategories({ ...filters, ...newFilters }));
		else
			dispatch(getCategories(filters));
	}

	const remove = (id) => {
		dispatch(deleteCategory(id)).then(res => {
			if (res.error)
				showErrorMessage(res.error.message);
			else
				showSuccessMessage(res.payload.message);
		});
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
			<div className='grid mt-5 md:mt-7.5'>
				<div className='relative overflow-x-auto h-100'>
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