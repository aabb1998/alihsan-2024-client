import React, { useEffect, useState } from "react";
import { Edit3Icon, EditIcon, PlusIcon, TrashIcon } from "../../../theme/svg-icons";
// import Addadmins from "./Common/AddAdmins";
import { Pagination } from "../../../components/Pagination";
import Img from "../../../components/Image";
import { Button } from "../../../components";
import FormModal from "./FormModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserDetails, getUsers, resetUserPassword } from "../../../features/adminUsers";
import DeleteModal from "./DeleteModal";
import { SnackMessages } from "../../../components/Toast";
import ActionButtonBgWithIcon from "../Common/ActionButtonBgWithIcon";

export default function Users() {
	const { showSuccessMessage, showErrorMessage } = SnackMessages();
	const dispatch = useDispatch();
	const [deleting, setDeleting] = useState(false);
	const [adding, setAdding] = useState(false);
	const [resetting, setResetting] = useState({});

	const { users, usersPage, userDetails, userDetailsLoading, usersLoading } = useSelector(state => state.adminUsers)

	const edit = id => {
		dispatch(getUserDetails(id));
	}
	const t = () => new Promise(res => setTimeout(res, 2000));
	const resetPass = id => {
		setResetting(r => ({ ...r, [id]: true }))
		dispatch(resetUserPassword(id)).then(res => {
			if (res.error)
				showErrorMessage(res.error.message)
			else
				showSuccessMessage(res.payload.message)
			setResetting(r => ({ ...r, [id]: false }))
		});
	}
	const onDelete = () => {
		dispatch(deleteUser(deleting)).then(res => {
			if (res.error)
				showErrorMessage(res.error.message)
			else
				showSuccessMessage(res.payload.message)
			setDeleting(false);
		})
	}

	useEffect(() => {
		load(1);
	}, [])

	const load = (p) => dispatch(getUsers(p));

	return (
		<>
			<div className="py-6 px-3 sm:!px-5 md:!px-7.5 sm:py-7.5 md:py-10 w-full h-[calc(100vh-4.5rem)] overflow-auto">
				<div className='flex items-center justify-between w-full border-b border-neutral-300 pb-3.5'>
					<h5 className='text-heading-7 md:text-heading-5'>Admins</h5>
					<Button
						onClick={() => setAdding(true)}
						className=" text-button-md md:text-button-lg"
						variant="primary"
						type="submit"
						label={(
							<>
								<span className='sm:hidden'><PlusIcon /></span> <span className='hidden sm:flex'>Add Admin</span>
							</>
						)}
					/>
				</div>
				<div className='grid mt-5 md:mt-7.5'>
					<div className='relative mt-5 overflow-x-auto h-100'>
						<table class="table-auto w-full text-start">
							<thead className='rounded bg-neutral-200'>
								<tr className=''>
									<th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Name</th>
									<th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Email Address</th>
									<th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Role</th>
									<th className='p-4 min-w-[10rem]  text-sm font-medium text-start font-Montserrat text-neutral-600'>Last Day Active</th>
									<th className='p-4 text-sm font-medium text-start font-Montserrat text-neutral-600'>Action</th>
								</tr>
							</thead>
							<tbody>
								{users.rows.map((i, j) => (
									<tr className='border-b bg-neutral-100 border-neutral-300 hover:bg-primary-100'>
										<td className='p-4 text-sm font-bold font-Montserrat text-neutral-800'>
											<div className='flex flex-wrap items-center justify-start md:flex-nowrap gap-x-3'>
												{/* <Img src={'/images/avatar/Courtney-Henry.png'} alt='Courtney Henry' className='rounded-full min-w-[2.25rem] min-h-[2.25rem]' /> */}
												{i.firstName} {i.lastName}
											</div>
										</td>
										<td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>{i.email}</td>
										<td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
											{i.role}
										</td>
										<td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>-</td>
										<td className='p-4 text-sm font-medium font-Montserrat text-neutral-700'>
											{/* <div className='flex gap-2 sm:gap-4'> */}
												{/* <div className='p-2 rounded cursor-pointer text-primary-300 bg-primary-100' onClick={() => edit(i.id)}>
													<Edit3Icon />
												</div>
												<div className={'p-2 rounded '+(!usersLoading && !resetting[i.id]?'text-primary-300 bg-yellow-100 cursor-pointer':'text-neutral-400 bg-neutral-100')} onClick={() => !usersLoading && !resetting[i.id] && resetPass(i.id)}>
													<Edit3Icon />
												</div>
												<div className='p-2 text-red-300 bg-red-100 rounded cursor-pointer' onClick={() => setDeleting(i.id)}>
													<TrashIcon />
												</div> */}
												{i.role!=='SUPERADMIN' && (
													<ActionButtonBgWithIcon
														handleEdit={() => edit(i.id)}
														handleRemove={() => setDeleting(i.id)}
														// handleResetPassword={() => !usersLoading && !resetting[i.id] && resetPass(i.id)}
													/>
												)}

											{/* </div> */}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{usersLoading ? <div className="mt-4">Loading...</div> : null}
				<div className="mt-7.5">
					<Pagination onPageChange={p => load(p)} totalPages={Math.ceil(users.count / 20)} currentPage={usersPage} />
				</div>
			</div>
			<FormModal
				visible={adding}
				onClose={() => setAdding(false)}
			/>
			<DeleteModal
				id={deleting}
				onClose={() => setDeleting(false)}
				onDelete={onDelete}
			/>
		</>
	);

}
